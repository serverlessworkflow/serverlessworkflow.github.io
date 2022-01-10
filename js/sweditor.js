var helloWorldExample = {
    "id": "helloworld",
    "version": "1.0",
    "specVersion": "0.8",
    "name": "Hello World Workflow",
    "description": "Inject Hello World",
    "start": "Hello State",
    "states":[
      {
         "name":"Hello State",
         "type":"inject",
         "data": {
            "result": "Hello World!"
         },
         "end": true
      }
    ]
}

var parallelStateExample = {
    "id": "parallelexec",
    "version": "1.0",
    "specVersion": "0.8",
    "name": "Parallel Execution Workflow",
    "description": "Executes two branches in parallel",
    "start": "ParallelExec",
    "states":[
      {
         "name": "ParallelExec",
         "type": "parallel",
         "completionType": "allOf",
         "branches": [
            {
              "name": "ShortDelayBranch",
              "actions": [{
                "subFlowRef": "shortdelayworkflowid"
              }]
            },
            {
              "name": "LongDelayBranch",
              "actions": [{
                "subFlowRef": "longdelayworkflowid"
              }]
            }
         ],
         "end": true
      }
    ]
};

var eventBasedSwitchState = {
    "id": "eventbasedswitch",
    "version": "1.0",
    "specVersion": "0.8",
    "name": "Event Based Switch Transitions",
    "description": "Event Based Switch Transitions",
    "start": "CheckVisaStatus",
    "events": [
    {
        "name": "visaApprovedEvent",
        "type": "VisaApproved",
        "source": "visaCheckSource"
    },
    {
        "name": "visaRejectedEvent",
        "type": "VisaRejected",
        "source": "visaCheckSource"
    }
    ],
    "states":[
      {
         "name":"CheckVisaStatus",
         "type":"switch",
         "eventConditions": [
            {
              "eventRef": "visaApprovedEvent",
              "transition": "HandleApprovedVisa"
            },
            {
              "eventRef": "visaRejectedEvent",
              "transition": "HandleRejectedVisa"
            }
         ],
         "eventTimeout": "PT1H",
         "defaultCondition": {
            "transition": "HandleNoVisaDecision"
         }
      },
      {
        "name": "HandleApprovedVisa",
        "type": "operation",
        "actions": [
          {
            "subFlowRef": "handleApprovedVisaWorkflowID"
          }
        ],
        "end": true
      },
      {
          "name": "HandleRejectedVisa",
          "type": "operation",
          "actions": [
            {
              "subFlowRef": "handleRejectedVisaWorkflowID"
            }
          ],
          "end": true
      },
      {
          "name": "HandleNoVisaDecision",
          "type": "operation",
          "actions": [
            {
              "subFlowRef": "handleNoVisaDecisionWorkflowId"
            }
          ],
          "end": true
      }
    ]
};

var provisionOrdersExample = {
    "id": "provisionorders",
    "version": "1.0",
    "specVersion": "0.8",
    "name": "Provision Orders",
    "description": "Provision Orders and handle errors thrown",
    "start": "ProvisionOrder",
    "functions": [
      {
         "name": "provisionOrderFunction",
         "operation": "http://myapis.org/provisioningapi.json#doProvision"
      }
    ],
    "errors": [
     {
      "name": "Missing order id"
     },
     {
      "name": "Missing order item"
     },
     {
      "name": "Missing order quantity"
     }
    ],
    "states":[
      {
        "name":"ProvisionOrder",
        "type":"operation",
        "actionMode":"sequential",
        "actions":[
           {
              "functionRef": {
                 "refName": "provisionOrderFunction",
                 "arguments": {
                   "order": "${ .order }"
                 }
              }
           }
        ],
        "stateDataFilter": {
           "output": "${ .exceptions }"
        },
        "transition": "ApplyOrder",
        "onErrors": [
           {
             "errorRef": "Missing order id",
             "transition": "MissingId"
           },
           {
             "errorRef": "Missing order item",
             "transition": "MissingItem"
           },
           {
            "errorRef": "Missing order quantity",
            "transition": "MissingQuantity"
           }
        ]
    },
    {
       "name": "MissingId",
       "type": "operation",
       "actions": [
         {
           "subFlowRef": "handleMissingIdExceptionWorkflow"
         }
       ],
       "end": true
    },
    {
       "name": "MissingItem",
       "type": "operation",
       "actions": [
         {
           "subFlowRef": "handleMissingItemExceptionWorkflow"
         }
       ],
       "end": true
    },
    {
       "name": "MissingQuantity",
       "type": "operation",
       "actions": [
         {
           "subFlowRef": "handleMissingQuantityExceptionWorkflow"
         }
       ],
       "end": true
    },
    {
       "name": "ApplyOrder",
       "type": "operation",
       "actions": [
         {
           "subFlowRef": "applyOrderWorkflowId"
         }
       ],
       "end": true
    }
    ]
};

var monitorJobsExample = {
    "id": "jobmonitoring",
    "version": "1.0",
    "specVersion": "0.8",
    "name": "Job Monitoring",
    "description": "Monitor finished execution of a submitted job",
    "start": "SubmitJob",
    "functions": [
      {
        "name": "submitJob",
        "operation": "http://myapis.org/monitorapi.json#doSubmit"
      },
      {
        "name": "checkJobStatus",
        "operation": "http://myapis.org/monitorapi.json#checkStatus"
      },
      {
        "name": "reportJobSuceeded",
        "operation": "http://myapis.org/monitorapi.json#reportSucceeded"
      },
      {
        "name": "reportJobFailed",
        "operation": "http://myapis.org/monitorapi.json#reportFailure"
      }
    ],
    "states":[
      {
        "name":"SubmitJob",
        "type":"operation",
        "actionMode":"sequential",
        "actions":[
        {
            "functionRef": {
              "refName": "submitJob",
              "arguments": {
                "name": "${ .job.name }"
              }
            },
            "actionDataFilter": {
              "results": "${ .jobuid }"
            }
        }
        ],
        "stateDataFilter": {
            "output": "${ .jobuid }"
        },
        "transition": "WaitForCompletion"
    },
    {
        "name": "WaitForCompletion",
        "type": "sleep",
        "duration": "PT5S",
        "transition": "GetJobStatus"
    },
    {
        "name":"GetJobStatus",
        "type":"operation",
        "actionMode":"sequential",
        "actions":[
        {
          "functionRef": {
              "refName": "checkJobStatus",
              "arguments": {
                "name": "${ .jobuid }"
              }
            },
            "actionDataFilter": {
              "results": "${ .jobstatus }"
            }
        }
        ],
        "stateDataFilter": {
            "output": "${ .jobstatus }"
        },
        "transition": "DetermineCompletion"
    },
    {
      "name":"DetermineCompletion",
      "type":"switch",
      "dataConditions": [
        {
          "condition": "${ .jobStatus == \"SUCCEEDED\" }",
          "transition": "JobSucceeded"
        },
        {
          "condition": "${ .jobStatus == \"FAILED\" }",
          "transition": "JobFailed"
        }
      ],
      "defaultCondition": {
        "transition": "WaitForCompletion"
      }
    },
    {
        "name":"JobSucceeded",
        "type":"operation",
        "actionMode":"sequential",
        "actions":[
        {
          "functionRef": {
              "refName": "reportJobSuceeded",
              "arguments": {
                "name": "${ .jobuid }"
              }
          }
        }
        ],
        "end": true
    },
    {
      "name":"JobFailed",
      "type":"operation",
      "actionMode":"sequential",
      "actions":[
      {
          "functionRef": {
            "refName": "reportJobFailed",
            "arguments": {
              "name": "${ .jobuid }"
            }
          }
      }
      ],
      "end": true
    }
    ]
};

var vetAppointmentExample = {
    "id": "VetAppointmentWorkflow",
    "name": "Vet Appointment Workflow",
    "description": "Vet service call via events",
    "version": "1.0",
    "specVersion": "0.8",
    "start": "MakeVetAppointmentState",
    "events": [
        {
            "name": "MakeVetAppointment",
            "source": "VetServiceSoure",
            "kind": "produced"
        },
        {
            "name": "VetAppointmentInfo",
            "source": "VetServiceSource",
            "kind": "consumed"
        }
    ],
    "states": [
        {
            "name": "MakeVetAppointmentState",
            "type": "operation",
            "actions": [
                {
                    "name": "MakeAppointmentAction",
                    "eventRef": {
                       "triggerEventRef": "MakeVetAppointment",
                       "data": "${ .patientInfo }",
                       "resultEventRef":  "VetAppointmentInfo"
                    },
                    "actionDataFilter": {
                        "results": "${ .appointmentInfo }"
                    }
                }
            ],
            "timeouts": {
              "actionExecTimeout": "PT15M"
            },
            "end": true
        }
    ]
};

var monitorVitalsExample = {
    "id": "monitorPatientVitalsWorkflow",
    "version": "1.0",
    "name": "Monitor Patient Vitals Workflow",
    "states": [
        {
            "name": "Monitor Vitals",
            "type": "event",
            "onEvents": [
                {
                    "eventRefs": [
                        "High Body Temp Event",
                        "High Blood Pressure Event"
                    ],
                    "actions": [
                        {
                            "functionRef": "Invoke Dispatch Nurse Function"
                        }
                    ]
                },
                {
                    "eventRefs": [
                        "High Respiration Rate Event"
                    ],
                    "actions": [
                        {
                            "functionRef": "Invoke Dispatch Pulmonologist Function"
                        }
                    ]
                }
            ],
            "end": true
        }
    ],
    "functions": "file://my/services/asyncapipatientservicedefs.json",
    "events": "file://my/events/patientcloudeventsdefs.yml"
};

var customerEmailExample = {
    "id": "customerEmailWorkflow",
    "version": "1.0",
    "specVersion": "0.8",
    "name": "Send Customer Email Workflow",
    "states": [
        {
            "name": "Send Email",
            "type": "operation",
            "actions": [
                {
                    "functionRef": {
                        "invoke": "async",
                        "refName": "Invoke Send Email Function",
                        "arguments": {
                            "customer": "${ .customer }"
                        }
                    }
                }
            ],
            "end": true
        }
    ],
    "functions": [
        {
            "name": "Invoke Send Email Function",
            "operation": "openapiservicedef.json#sendEmail",
            "type": "rest"
        }
    ]
};

var newItemPurchaseExample = {
    "id": "newItemPurchaseWorkflow",
    "version": "1.0",
    "specVersion": "0.8",
    "name": "New Item Purchase Workflow",
    "states": [
        {
            "name": "Item Purchase",
            "type": "event",
            "onEvents": [
                {
                    "eventRefs": [
                        "New Purchase Event"
                    ],
                    "actions": [
                        {
                            "functionRef": {
                                "refName": "Invoke Debit Customer Function",
                                "arguments": {
                                    "customerid": "${ .purchase.customerid }",
                                    "amount": "${ .purchase.amount }"
                                }
                            }
                        }
                    ]
                }
            ],
            "compensatedBy": "Cancel Purchase",
            "end": true,
            "onErrors": [
                {
                    "errorRef": "Debit Error",
                    "end": {
                        "compensate": true
                    }
                }
            ]
        },
        {
            "name": "Cancel Purchase",
            "type": "operation",
            "usedForCompensation": true,
            "actions": [
                {
                    "functionRef": {
                        "refName": "Invoke Credit Customer Function",
                        "arguments": {
                            "customerid": "${ .purchase.customerid }",
                            "amount": "${ .purchase.amount }"
                        }
                    }
                }
            ]
        }
    ],
    "functions": "http://myservicedefs.io/graphqldef.json",
    "events": "http://myeventdefs.io/eventdefs.json",
    "errors": "file://mydefs/errordefs.json"
};

var checkInboxExample = {
    "id": "checkInbox",
    "name": "Check Inbox Workflow",
    "version": "1.0",
    "specVersion": "0.8",
    "description": "Periodically Check Inbox",
    "start": {
        "stateName": "CheckInbox",
        "schedule": {
            "cron": "0 0/15 * * * ?"
        }
    },
    "states": [
        {
            "name": "CheckInbox",
            "type": "operation",
            "actionMode": "sequential",
            "actions": [
                {
                    "functionRef": "checkInboxFunction"
                }
            ],
            "transition": "SendTextForHighPriority"
        },
        {
            "name": "SendTextForHighPriority",
            "type": "foreach",
            "inputCollection": "${ .messages }",
            "iterationParam": "singlemessage",
            "actions": [
                {
                    "functionRef": {
                        "refName": "sendTextFunction",
                        "arguments": {
                            "message": "${ .singlemessage }"
                        }
                    }
                }
            ],
            "end": true
        }
    ],
    "functions": [
      {
        "name": "checkInboxFunction",
        "operation": "http://myapis.org/inboxapi.json#checkNewMessages"
      },
      {
        "name": "sendTextFunction",
        "operation": "http://myapis.org/inboxapi.json#sendText"
      }
    ],
};

var examplesMap = {};
examplesMap['helloworld'] = helloWorldExample;
examplesMap['parallelexecution'] = parallelStateExample;
examplesMap['eventbaseddecisions'] = eventBasedSwitchState;
examplesMap['provisionorders'] = provisionOrdersExample;
examplesMap['monitorjobs'] = monitorJobsExample;
examplesMap['vetappointment'] = vetAppointmentExample;
examplesMap['monitorvitals'] = monitorVitalsExample;
examplesMap['customeremail'] = customerEmailExample;
examplesMap['newitempurchase'] = newItemPurchaseExample;
examplesMap['checkinbox'] = checkInboxExample;

function selectExample(value) {
    if(value.length > 0) {
        var example = examplesMap[value];
        var model = monaco.editor.getModels()[0];
        model.setValue(JSON.stringify(example, null, 2));

        generateDiagram();
    }
}

function generateDiagram() {
    const { Specification, MermaidDiagram } = serverWorkflowSdk;

    const model = monaco.editor.getModels()[0];
    const modelVal = model.getValue();

    const mermaidSource = new MermaidDiagram(Specification.Workflow.fromSource(modelVal)).sourceCode();
    const mermaidDiv = document.querySelector(".workflowdiagram");

    mermaid.mermaidAPI.render('mermaid', mermaidSource, svgCode => {
        mermaidDiv.innerHTML = svgCode;
    });

}

function callUrl(type, url, data, callback){

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) { callback(xhr.responseText); }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/svg+xml');
    xhr.send(data);
    return xhr;
}

function changeTheme(theme) {
    if(theme.length > 0) {
        monaco.editor.setTheme(theme);
    }
}
