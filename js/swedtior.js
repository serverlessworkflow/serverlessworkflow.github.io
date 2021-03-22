var helloWorldExample = {
    "id": "helloworld",
    "version": "1.0",
    "name": "Hello World Workflow",
    "description": "Inject Hello World",
    "start": "HelloState",
    "states":[
        {
            "name":"HelloState",
            "type":"inject",
            "data": {
                "result": "Hello World!"
            },
            "end": true
        }
    ]
};

var parallelStateExample = {
    "id": "parallelexec",
    "version": "1.0",
    "name": "Parallel Execution Workflow",
    "description": "Executes two branches in parallel",
    "start": "ParallelExec",
    "states":[
        {
            "name": "ParallelExec",
            "type": "parallel",
            "completionType": "and",
            "branches": [
                {
                    "name": "ShortDelayBranch",
                    "workflowId": "shortdelayworkflowid"
                },
                {
                    "name": "LongDelayBranch",
                    "workflowId": "longdelayworkflowid"
                }
            ],
            "end": true
        }
    ]
};

var eventBasedSwitchState = {
    "id": "eventbasedswitch",
    "version": "1.0",
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
            "default": {
                "transition": "HandleNoVisaDecision"
            }
        },
        {
            "name": "HandleApprovedVisa",
            "type": "subflow",
            "workflowId": "handleApprovedVisaWorkflowID",
            "end": true
        },
        {
            "name": "HandleRejectedVisa",
            "type": "subflow",
            "workflowId": "handleRejectedVisaWorkflowID",
            "end": true
        },
        {
            "name": "HandleNoVisaDecision",
            "type": "subflow",
            "workflowId": "handleNoVisaDecisionWorkfowId",
            "end": true
        }
    ]
};

var provisionOrdersExample = {
    "id": "provisionorders",
    "version": "1.0",
    "name": "Provision Orders",
    "description": "Provision Orders and handle errors thrown",
    "start": "ProvisionOrder",
    "functions": [
        {
            "name": "provisionOrderFunction",
            "operation": "http://myapis.org/provisioningapi.json#doProvision"
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
                    "error": "Missing order id",
                    "transition": "MissingId"
                },
                {
                    "error": "Missing order item",
                    "transition": "MissingItem"
                },
                {
                    "error": "Missing order quantity",
                    "transition": "MissingQuantity"
                }
            ]
        },
        {
            "name": "MissingId",
            "type": "subflow",
            "workflowId": "handleMissingIdExceptionWorkflow",
            "end": true
        },
        {
            "name": "MissingItem",
            "type": "subflow",
            "workflowId": "handleMissingItemExceptionWorkflow",
            "end": true
        },
        {
            "name": "MissingQuantity",
            "type": "subflow",
            "workflowId": "handleMissingQuantityExceptionWorkflow",
            "end": true
        },
        {
            "name": "ApplyOrder",
            "type": "subflow",
            "workflowId": "applyOrderWorkflowId",
            "end": true
        }
    ]
};

var monitorJobsExample = {
    "id": "jobmonitoring",
    "version": "1.0",
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
            "onErrors": [
                {
                    "error": "*",
                    "transition": "SubmitError"
                }
            ],
            "stateDataFilter": {
                "output": "${ .jobuid }"
            },
            "transition": "WaitForCompletion"
        },
        {
            "name": "SubmitError",
            "type": "subflow",
            "workflowId": "handleJobSubmissionErrorWorkflow",
            "end": true
        },
        {
            "name": "WaitForCompletion",
            "type": "delay",
            "timeDelay": "PT5S",
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
            "default": {
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
                    },
                    "timeout": "PT15M"
                }
            ],
            "end": true
        }
    ]
};

var examplesMap = {};
examplesMap['helloworld'] = helloWorldExample;
examplesMap['parallelexecution'] = parallelStateExample;
examplesMap['eventbaseddecisions'] = eventBasedSwitchState;
examplesMap['provisionorders'] = provisionOrdersExample;
examplesMap['monitorjobs'] = monitorJobsExample;
examplesMap['vetappointment'] = vetAppointmentExample;

function selectExample(value) {
    if(value.length > 0) {
        var example = examplesMap[value];
        var model = monaco.editor.getModels()[0];
        model.setValue(JSON.stringify(example, null, 2));

        generateDiagram();
    }
}

function generateDiagram() {
    var model = monaco.editor.getModels()[0];
    var modelVal = model.getValue();


    callUrl('POST', '/services/diagrams', modelVal, function showDiagram(res){
        if (res !== null) {
            var container = document.querySelector(".workflowdiagram");
            container.innerHTML = res;
        } else {
            alert("unable to generate workflow diagram");
        }
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