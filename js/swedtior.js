var helloWorldExample = {
    "id": "helloworld",
    "version": "1.0",
    "name": "Hello World Workflow",
    "description": "Inject Hello World",
    "states":[
        {
            "name":"HelloState",
            "type":"inject",
            "start": {
                "kind": "default"
            },
            "data": {
                "result": "Hello World!"
            },
            "end": {
                "kind": "default"
            }
        }
    ]
};

var parallelStateExample = {
    "id": "parallelexec",
    "version": "1.0",
    "name": "Parallel Execution Workflow",
    "description": "Executes two branches in parallel",
    "states":[
        {
            "name": "ParallelExec",
            "type": "parallel",
            "start": {
                "kind": "default"
            },
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
            "end": {
                "kind": "default"
            }
        }
    ]
};

var eventBasedSwitchState = {
    "id": "eventbasedswitch",
    "version": "1.0",
    "name": "Event Based Switch Transitions",
    "description": "Event Based Switch Transitions",
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
            "start": {
                "kind": "default"
            },
            "eventConditions": [
                {
                    "eventRef": "visaApprovedEvent",
                    "transition": {
                        "nextState": "HandleApprovedVisa"
                    }
                },
                {
                    "eventRef": "visaRejectedEvent",
                    "transition": {
                        "nextState": "HandleRejectedVisa"
                    }
                }
            ],
            "eventTimeout": "PT1H",
            "default": {
                "transition": {
                    "nextState": "HandleNoVisaDecision"
                }
            }
        },
        {
            "name": "HandleApprovedVisa",
            "type": "subflow",
            "workflowId": "handleApprovedVisaWorkflowID",
            "end": {
                "kind": "default"
            }
        },
        {
            "name": "HandleRejectedVisa",
            "type": "subflow",
            "workflowId": "handleRejectedVisaWorkflowID",
            "end": {
                "kind": "default"
            }
        },
        {
            "name": "HandleNoVisaDecision",
            "type": "subflow",
            "workflowId": "handleNoVisaDecisionWorkfowId",
            "end": {
                "kind": "default"
            }
        }
    ]
};

var provisionOrdersExample = {
    "id": "provisionorders",
    "version": "1.0",
    "name": "Provision Orders",
    "description": "Provision Orders and handle errors thrown",
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
            "start": {
                "kind": "default"
            },
            "actionMode":"sequential",
            "actions":[
                {
                    "functionRef": {
                        "refName": "provisionOrderFunction",
                        "parameters": {
                            "order": "{{ $.order }}"
                        }
                    }
                }
            ],
            "stateDataFilter": {
                "dataOutputPath": "{{ $.exceptions }}"
            },
            "transition": {
                "nextState":"ApplyOrder"
            },
            "onErrors": [
                {
                    "error": "Missing order id",
                    "transition": {
                        "nextState": "MissingId"
                    }
                },
                {
                    "error": "Missing order item",
                    "transition": {
                        "nextState": "MissingItem"
                    }
                },
                {
                    "error": "Missing order quantity",
                    "transition": {
                        "nextState": "MissingQuantity"
                    }
                }
            ]
        },
        {
            "name": "MissingId",
            "type": "subflow",
            "workflowId": "handleMissingIdExceptionWorkflow",
            "end": {
                "kind": "default"
            }
        },
        {
            "name": "MissingItem",
            "type": "subflow",
            "workflowId": "handleMissingItemExceptionWorkflow",
            "end": {
                "kind": "default"
            }
        },
        {
            "name": "MissingQuantity",
            "type": "subflow",
            "workflowId": "handleMissingQuantityExceptionWorkflow",
            "end": {
                "kind": "default"
            }
        },
        {
            "name": "ApplyOrder",
            "type": "subflow",
            "workflowId": "applyOrderWorkflowId",
            "end": {
                "kind": "default"
            }
        }
    ]
};

var monitorJobsExample = {
    "id": "jobmonitoring",
    "version": "1.0",
    "name": "Job Monitoring",
    "description": "Monitor finished execution of a submitted job",
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
            "start": {
                "kind": "default"
            },
            "actionMode":"sequential",
            "actions":[
                {
                    "functionRef": {
                        "refName": "submitJob",
                        "parameters": {
                            "name": "{{ $.job.name }}"
                        }
                    },
                    "actionDataFilter": {
                        "dataResultsPath": "{{ $.jobuid }}"
                    }
                }
            ],
            "onErrors": [
                {
                    "error": "*",
                    "transition": {
                        "nextState": "SubmitError"
                    }
                }
            ],
            "stateDataFilter": {
                "dataOutputPath": "{{ $.jobuid }}"
            },
            "transition": {
                "nextState":"WaitForCompletion"
            }
        },
        {
            "name": "SubmitError",
            "type": "subflow",
            "workflowId": "handleJobSubmissionErrorWorkflow",
            "end": {
                "kind": "default"
            }
        },
        {
            "name": "WaitForCompletion",
            "type": "delay",
            "timeDelay": "PT5S",
            "transition": {
                "nextState":"GetJobStatus"
            }
        },
        {
            "name":"GetJobStatus",
            "type":"operation",
            "actionMode":"sequential",
            "actions":[
                {
                    "functionRef": {
                        "refName": "checkJobStatus",
                        "parameters": {
                            "name": "{{ $.jobuid }}"
                        }
                    },
                    "actionDataFilter": {
                        "dataResultsPath": "{{ $.jobstatus }}"
                    }
                }
            ],
            "stateDataFilter": {
                "dataOutputPath": "{{ $.jobstatus }}"
            },
            "transition": {
                "nextState":"DetermineCompletion"
            }
        },
        {
            "name":"DetermineCompletion",
            "type":"switch",
            "dataConditions": [
                {
                    "condition": "{{ $[?(@.jobstatus == 'SUCCEEDED')] }}",
                    "transition": {
                        "nextState": "JobSucceeded"
                    }
                },
                {
                    "condition": "{{ $[?(@.jobstatus == 'FAILED')] }}",
                    "transition": {
                        "nextState": "JobFailed"
                    }
                }
            ],
            "default": {
                "transition": {
                    "nextState": "WaitForCompletion"
                }
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
                        "parameters": {
                            "name": "{{ $.jobuid }}"
                        }
                    }
                }
            ],
            "end": {
                "kind": "default"
            }
        },
        {
            "name":"JobFailed",
            "type":"operation",
            "actionMode":"sequential",
            "actions":[
                {
                    "functionRef": {
                        "refName": "reportJobFailed",
                        "parameters": {
                            "name": "{{ $.jobuid }}"
                        }
                    }
                }
            ],
            "end": {
                "kind": "default"
            }
        }
    ]
};

var vetAppointmentExample = {
    "id": "VetAppointmentWorkflow",
    "name": "Vet Appointment Workflow",
    "description": "Vet service call via events",
    "version": "1.0",
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
            "start": {
                "kind": "default"
            },
            "actions": [
                {
                    "name": "MakeAppointmentAction",
                    "eventRef": {
                        "triggerEventRef": "MakeVetAppointment",
                        "data": "{{ $.patientInfo }}",
                        "resultEventRef":  "VetAppointmentInfo"
                    },
                    "actionDataFilter": {
                        "dataResultsPath": "{{ $.appointmentInfo }}"
                    },
                    "timeout": "PT15M"
                }
            ],
            "end": {
                "kind": "default"
            }
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


    callUrl('POST', 'https://diagram-service-secure-mmagnani.apps.kogito-cloud.automation.rhmw.io/swdiagram', modelVal, function showDiagram(res){
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