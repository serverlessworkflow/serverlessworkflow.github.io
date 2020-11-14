var workflowschema = {
    "$id": "https://serverlessworkflow.org/core/workflow.json",
    "$schema": "http://json-schema.org/draft-07/schema#",
    "description": "Serverless Workflow specification - workflow schema",
    "type": "object",
    "oneOf": [
        {
            "properties": {
                "id": {
                    "type": "string",
                    "description": "Workflow unique identifier",
                    "minLength": 1
                },
                "name": {
                    "type": "string",
                    "description": "Workflow name",
                    "minLength": 1
                },
                "description": {
                    "type": "string",
                    "description": "Workflow description"
                },
                "version": {
                    "type": "string",
                    "description": "Workflow version",
                    "minLength": 1
                },
                "schemaVersion": {
                    "type": "string",
                    "description": "Serverless Workflow schema version",
                    "minLength": 1
                },
                "dataInputSchema": {
                    "type": "string",
                    "format": "uri",
                    "description": "URI to JSON Schema that workflow data input adheres to"
                },
                "dataOutputSchema": {
                    "type": "string",
                    "format": "uri",
                    "description": "URI to JSON Schema that workflow data output adheres to"
                },
                "metadata": {
                    "type": "object",
                    "description": "Metadata information",
                    "additionalProperties": {
                        "type": "string"
                    }
                },
                "events": {
                    "type": "array",
                    "description": "Workflow CloudEvent definitions. Defines CloudEvents that can be consumed or produced",
                    "items": {
                        "type": "object",
                        "$ref": "#/definitions/eventdef"
                    },
                    "minItems": 1
                },
                "functions": {
                    "type": "array",
                    "description": "Workflow function definitions",
                    "items": {
                        "type": "object",
                        "$ref": "#/definitions/function"
                    },
                    "minItems": 1
                },
                "retries": {
                    "type": "array",
                    "description": "Workflow Retry definitions. Define retry strategies that can be referenced in states onError definitions",
                    "items": {
                        "type": "object",
                        "$ref": "#/definitions/retrydef"
                    },
                    "minItems": 1
                },
                "states": {
                    "type": "array",
                    "description": "State definitions",
                    "items": {
                        "anyOf": [
                            {
                                "title": "Delay State",
                                "$ref": "#/definitions/delaystate"
                            },
                            {
                                "title": "Event State",
                                "$ref": "#/definitions/eventstate"
                            },
                            {
                                "title": "Operation State",
                                "$ref": "#/definitions/operationstate"
                            },
                            {
                                "title": "Parallel State",
                                "$ref": "#/definitions/parallelstate"
                            },
                            {
                                "title": "Switch State",
                                "$ref": "#/definitions/switchstate"
                            },
                            {
                                "title": "SubFlow State",
                                "$ref": "#/definitions/subflowstate"
                            },
                            {
                                "title": "Inject State",
                                "$ref": "#/definitions/injectstate"
                            },
                            {
                                "title": "ForEach State",
                                "$ref": "#/definitions/foreachstate"
                            },
                            {
                                "title": "Callback State",
                                "$ref": "#/definitions/callbackstate"
                            }
                        ]
                    },
                    "minItems": 1
                }
            }
        },
        {
            "properties": {
                "id": {
                    "type": "string",
                    "description": "Workflow unique identifier",
                    "minLength": 1
                },
                "name": {
                    "type": "string",
                    "description": "Workflow name",
                    "minLength": 1
                },
                "description": {
                    "type": "string",
                    "description": "Workflow description"
                },
                "version": {
                    "type": "string",
                    "description": "Workflow version",
                    "minLength": 1
                },
                "schemaVersion": {
                    "type": "string",
                    "description": "Serverless Workflow schema version",
                    "minLength": 1
                },
                "dataInputSchema": {
                    "type": "string",
                    "format": "uri",
                    "description": "URI to JSON Schema that workflow data input adheres to"
                },
                "dataOutputSchema": {
                    "type": "string",
                    "format": "uri",
                    "description": "URI to JSON Schema that workflow data output adheres to"
                },
                "metadata": {
                    "type": "object",
                    "description": "Metadata information",
                    "additionalProperties": {
                        "type": "string"
                    }
                },
                "events": {
                    "type": "string",
                    "format": "uri",
                    "description": "URI to a resource containing event definitions (json or yaml)"
                },
                "functions": {
                    "type": "string",
                    "format": "uri",
                    "description": "URI to a resource containing function definitions (json or yaml)"
                },
                "states": {
                    "type": "array",
                    "description": "State definitions",
                    "items": {
                        "anyOf": [
                            {
                                "title": "Delay State",
                                "$ref": "#/definitions/delaystate"
                            },
                            {
                                "title": "Event State",
                                "$ref": "#/definitions/eventstate"
                            },
                            {
                                "title": "Operation State",
                                "$ref": "#/definitions/operationstate"
                            },
                            {
                                "title": "Parallel State",
                                "$ref": "#/definitions/parallelstate"
                            },
                            {
                                "title": "Switch State",
                                "$ref": "#/definitions/switchstate"
                            },
                            {
                                "title": "SubFlow State",
                                "$ref": "#/definitions/subflowstate"
                            },
                            {
                                "title": "Inject State",
                                "$ref": "#/definitions/injectstate"
                            },
                            {
                                "title": "ForEach State",
                                "$ref": "#/definitions/foreachstate"
                            },
                            {
                                "title": "Callback State",
                                "$ref": "#/definitions/callbackstate"
                            }
                        ]
                    },
                    "minItems": 1
                }
            }
        }
    ],
    "required": [
        "id",
        "name",
        "version",
        "states"
    ],
    "definitions": {
        "retrydef": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "description": "Unique retry strategy name",
                    "minLength": 1
                },
                "delay": {
                    "type": "string",
                    "description": "Time delay between retry attempts (ISO 8601 duration format)"
                },
                "multiplier": {
                    "type": "string",
                    "description": "Multiplier value by which interval increases during each attempt (ISO 8601 time format)"
                },
                "maxAttempts": {
                    "type": ["integer","string"],
                    "minimum": 1,
                    "minLength": 0,
                    "description": "Maximum number of retry attempts."
                },
                "jitter": {
                    "type": ["number","string"],
                    "minimum": 0.0,
                    "maximum": 1.0,
                    "description": "If float type, maximum amount of random time added or subtracted from the delay between each retry relative to total delay (between 0.0 and 1.0). If string type, absolute maximum amount of random time added or subtracted from the delay between each retry (ISO 8601 duration format)"
                }
            },
            "required": [
                "name",
                "maxAttempts"
            ]
        },
        "function": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "description": "Unique function name",
                    "minLength": 1
                },
                "operation": {
                    "type": "string",
                    "description": "Combination of the function/service OpenAPI definition URI and the operationID of the operation that needs to be invoked, separated by a '#'. For example 'https://petstore.swagger.io/v2/swagger.json#getPetById'",
                    "minLength": 1
                },
                "metadata": {
                    "type": "object",
                    "description": "Metadata information",
                    "additionalProperties": {
                        "type": "string"
                    }
                }
            },
            "required": [
                "name"
            ]
        },
        "eventdef": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "description": "Unique event name",
                    "minLength": 1
                },
                "names": {
                    "type": "array",
                    "description": "List of unique event names that share the rest of the properties (source, type, kind, default)",
                    "items": {
                        "type": "string"
                    },
                    "minItems": 2,
                    "uniqueItems": true
                },
                "source": {
                    "type": "string",
                    "description": "CloudEvent source"
                },
                "type": {
                    "type": "string",
                    "description": "CloudEvent type"
                },
                "kind": {
                    "type": "string",
                    "enum": [
                        "consumed",
                        "produced"
                    ],
                    "description": "Defines the CloudEvent as either 'consumed' or 'produced' by the workflow. Default is 'consumed'",
                    "default": "consumed"
                },
                "correlation": {
                    "type": "array",
                    "description": "CloudEvent correlation definitions",
                    "minItems": 1,
                    "items": {
                        "type": "object",
                        "$ref": "#/definitions/correlationDef"
                    }
                },
                "metadata": {
                    "type": "object",
                    "description": "Metadata information",
                    "additionalProperties": {
                        "type": "string"
                    }
                }
            },
            "if": {
                "properties": {
                    "kind": {
                        "const": "consumed"
                    }
                }
            },
            "then": {
                "oneOf": [
                    {
                        "required": [
                            "name",
                            "source",
                            "type"
                        ]
                    },
                    {
                        "required": [
                            "names",
                            "source",
                            "type"
                        ]
                    }
                ]
            },
            "else": {
                "oneOf": [
                    {
                        "required": [
                            "name",
                            "type"
                        ]
                    },
                    {
                        "required": [
                            "names",
                            "type"
                        ]
                    }
                ]
            }
        },
        "correlationDef": {
            "type": "object",
            "description": "CloudEvent correlation definition",
            "properties": {
                "contextAttributeName": {
                    "type": "string",
                    "description": "CloudEvent Extension Context Attribute name",
                    "minLength": 1
                },
                "contextAttributeValue": {
                    "type": "string",
                    "description": "CloudEvent Extension Context Attribute value",
                    "minLength": 1
                }
            },
            "required": [
                "contextAttributeName"
            ]
        },
        "transition": {
            "type": "object",
            "properties": {
                "expression": {
                    "type": "string",
                    "description": "JsonPath expression. Evaluates to true if returns non-empty result"
                },
                "produceEvents": {
                    "type": "array",
                    "description": "Array of events to be produced",
                    "items": {
                        "type": "object",
                        "$ref": "#/definitions/produceeventdef"
                    }
                },
                "nextState": {
                    "type": "string",
                    "description": "Name of state to transition to",
                    "minLength": 1
                }
            },
            "required": [
                "nextState"
            ]
        },
        "error": {
            "type": "object",
            "properties": {
                "error": {
                    "type": "string",
                    "description": "Domain-specific error name, or '*' to indicate all possible errors",
                    "minLength": 1
                },
                "code": {
                    "type": "string",
                    "description": "Error code. Can be used in addition to the name to help runtimes resolve to technical errors/exceptions. Should not be defined if error is set to '*'",
                    "minLength": 1
                },
                "retryRef": {
                    "type": "string",
                    "description": "References a unique name of a retry definition.",
                    "minLength": 1
                },
                "transition": {
                    "description": "Transition to next state to handle the error. If retryRef is defined, this transition is taken only if retries were unsuccessful.",
                    "$ref": "#/definitions/transition"
                },
                "end": {
                    "description": "End workflow execution in case of this error. If retryRef is defined, this ends workflow only if retries were unsuccessful.",
                    "$ref": "#/definitions/end"
                }
            },
            "oneOf": [
                {
                    "required": [
                        "error",
                        "transition"
                    ]
                },
                {
                    "required": [
                        "error",
                        "end"
                    ]
                }
            ]
        },
        "onevents": {
            "type": "object",
            "properties": {
                "eventRefs": {
                    "type" : "array",
                    "description": "References one or more unique event names in the defined workflow events",
                    "minItems": 1,
                    "items": {
                        "type": "string"
                    }
                },
                "actionMode": {
                    "type": "string",
                    "enum": [
                        "sequential",
                        "parallel"
                    ],
                    "description": "Specifies how actions are to be performed (in sequence of parallel)",
                    "default": "sequential"
                },
                "actions": {
                    "type": "array",
                    "description": "Actions to be performed if expression matches",
                    "items": {
                        "type": "object",
                        "$ref": "#/definitions/action"
                    }
                },
                "eventDataFilter": {
                    "$ref": "#/definitions/eventdatafilter"
                }
            },
            "required": [
                "eventRefs",
                "actions"
            ]
        },
        "action": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "description": "Unique action definition name"
                },
                "functionRef": {
                    "description": "References a reusable function definition",
                    "$ref": "#/definitions/functionref"
                },
                "eventRef": {
                    "description": "References a 'trigger' and 'result' reusable event definitions",
                    "$ref": "#/definitions/eventref"
                },
                "timeout": {
                    "type": "string",
                    "description": "Time period to wait for function execution to complete"
                },
                "actionDataFilter": {
                    "$ref": "#/definitions/actiondatafilter"
                }
            },
            "oneOf": [
                {
                    "required": [
                        "functionRef"
                    ]
                },
                {
                    "required": [
                        "eventRef"
                    ]
                }
            ]
        },
        "functionref": {
            "type": "object",
            "description": "Function Reference",
            "properties": {
                "refName": {
                    "type": "string",
                    "description": "Name of the referenced function"
                },
                "parameters": {
                    "type": "object",
                    "description": "Function parameters"
                }
            },
            "required": [
                "refName"
            ]
        },
        "eventref": {
            "type": "object",
            "description": "Event References",
            "properties": {
                "triggerEventRef": {
                    "type": "string",
                    "description": "Reference to the unique name of a 'produced' event definition"
                },
                "resultEventRef": {
                    "type": "string",
                    "description": "Reference to the unique name of a 'consumed' event definition"
                },
                "data": {
                    "type": ["string", "object"],
                    "description": "If string type, an expression which selects parts of the states data output to become the data (payload) of the event referenced by 'triggerEventRef'. If object type, a custom object to become the data (payload) of the event referenced by 'triggerEventRef'."
                },
                "contextAttributes": {
                    "type": "object",
                    "description": "Add additional extension context attributes to the produced event",
                    "additionalProperties": {
                        "type": "string"
                    }
                }
            },
            "required": [
                "triggerEventRef",
                "resultEventRef"
            ]
        },
        "branch": {
            "type": "object",
            "description": "Branch Definition",
            "properties": {
                "name": {
                    "type": "string",
                    "description": "Branch name"
                },
                "actions": {
                    "type": "array",
                    "description": "Actions to be executed in this branch",
                    "items": {
                        "type": "object",
                        "$ref": "#/definitions/action"
                    }
                },
                "workflowId": {
                    "type": "string",
                    "description": "Unique Id of a workflow to be executed in this branch"
                }
            },
            "oneOf": [
                {
                    "required": [
                        "name",
                        "workflowId"
                    ]
                },
                {
                    "required": [
                        "name",
                        "actions"
                    ]
                }
            ]
        },
        "delaystate": {
            "type": "object",
            "description": "Causes the workflow execution to delay for a specified duration",
            "properties": {
                "id": {
                    "type": "string",
                    "description": "Unique State id",
                    "minLength": 1
                },
                "name": {
                    "type": "string",
                    "description": "State name"
                },
                "type": {
                    "type": "string",
                    "const": "delay",
                    "description": "State type"
                },
                "start": {
                    "$ref": "#/definitions/start",
                    "description": "State start definition"
                },
                "end": {
                    "$ref": "#/definitions/end",
                    "description": "State end definition"
                },
                "stateDataFilter": {
                    "$ref": "#/definitions/statedatafilter"
                },
                "timeDelay": {
                    "type": "string",
                    "description": "Amount of time (ISO 8601 format) to delay"
                },
                "onErrors": {
                    "type": "array",
                    "description": "States error handling and retries definitions",
                    "items": {
                        "type": "object",
                        "$ref": "#/definitions/error"
                    }
                },
                "transition": {
                    "description": "Next transition of the workflow after the time delay",
                    "$ref": "#/definitions/transition"
                },
                "dataInputSchema": {
                    "type": "string",
                    "format": "uri",
                    "description": "URI to JSON Schema that state data input adheres to"
                },
                "dataOutputSchema": {
                    "type": "string",
                    "format": "uri",
                    "description": "URI to JSON Schema that state data output adheres to"
                },
                "metadata": {
                    "type": "object",
                    "description": "Metadata information",
                    "additionalProperties": {
                        "type": "string"
                    }
                }
            },
            "oneOf": [
                {
                    "required": [
                        "name",
                        "type",
                        "timeDelay",
                        "end"
                    ]
                },
                {
                    "required": [
                        "name",
                        "type",
                        "timeDelay",
                        "transition"
                    ]
                },
                {
                    "required": [
                        "start",
                        "name",
                        "type",
                        "timeDelay",
                        "transition"
                    ]
                },
                {
                    "required": [
                        "start",
                        "name",
                        "type",
                        "timeDelay",
                        "end"
                    ]
                }
            ]
        },
        "eventstate": {
            "type": "object",
            "description": "This state is used to wait for events from event sources, then consumes them and invoke one or more actions to run in sequence or parallel",
            "properties": {
                "id": {
                    "type": "string",
                    "description": "Unique State id",
                    "minLength": 1
                },
                "name": {
                    "type": "string",
                    "description": "State name"
                },
                "type": {
                    "type": "string",
                    "const": "event",
                    "description": "State type"
                },
                "exclusive": {
                    "type": "boolean",
                    "default": true,
                    "description": "If true consuming one of the defined events causes its associated actions to be performed. If false all of the defined events must be consumed in order for actions to be performed"
                },
                "onEvents": {
                    "type": "array",
                    "description": "Define what events trigger one or more actions to be performed",
                    "items": {
                        "type": "object",
                        "$ref": "#/definitions/onevents"
                    }
                },
                "timeout": {
                    "type": "string",
                    "description": "Time period to wait for incoming events (ISO 8601 format)"
                },
                "stateDataFilter": {
                    "$ref": "#/definitions/statedatafilter"
                },
                "onErrors": {
                    "type": "array",
                    "description": "States error handling and retries definitions",
                    "items": {
                        "type": "object",
                        "$ref": "#/definitions/error"
                    }
                },
                "dataInputSchema": {
                    "type": "string",
                    "format": "uri",
                    "description": "URI to JSON Schema that state data input adheres to"
                },
                "dataOutputSchema": {
                    "type": "string",
                    "format": "uri",
                    "description": "URI to JSON Schema that state data output adheres to"
                },
                "transition": {
                    "description": "Next transition of the workflow after all the actions have been performed",
                    "$ref": "#/definitions/transition"
                },
                "start": {
                    "$ref": "#/definitions/start",
                    "description": "State start definition"
                },
                "end": {
                    "$ref": "#/definitions/end",
                    "description": "State end definition"
                },
                "metadata": {
                    "type": "object",
                    "description": "Metadata information",
                    "additionalProperties": {
                        "type": "string"
                    }
                }
            },
            "oneOf": [
                {
                    "required": [
                        "name",
                        "type",
                        "onEvents",
                        "end"
                    ]
                },
                {
                    "required": [
                        "name",
                        "type",
                        "onEvents",
                        "transition"
                    ]
                },
                {
                    "required": [
                        "start",
                        "name",
                        "type",
                        "onEvents",
                        "transition"
                    ]
                },
                {
                    "required": [
                        "start",
                        "name",
                        "type",
                        "onEvents",
                        "end"
                    ]
                }
            ]
        },
        "operationstate": {
            "type": "object",
            "description": "Defines actions be performed. Does not wait for incoming events",
            "properties": {
                "id": {
                    "type": "string",
                    "description": "Unique State id",
                    "minLength": 1
                },
                "name": {
                    "type": "string",
                    "description": "State name"
                },
                "type": {
                    "type": "string",
                    "const": "operation",
                    "description": "State type"
                },
                "start": {
                    "$ref": "#/definitions/start",
                    "description": "State start definition"
                },
                "end": {
                    "$ref": "#/definitions/end",
                    "description": "State end definition"
                },
                "stateDataFilter": {
                    "$ref": "#/definitions/statedatafilter"
                },
                "actionMode": {
                    "type": "string",
                    "enum": [
                        "sequential",
                        "parallel"
                    ],
                    "description": "Specifies whether actions are performed in sequence or in parallel",
                    "default": "sequential"
                },
                "actions": {
                    "type": "array",
                    "description": "Actions to be performed",
                    "items": {
                        "type": "object",
                        "$ref": "#/definitions/action"
                    }
                },
                "onErrors": {
                    "type": "array",
                    "description": "States error handling and retries definitions",
                    "items": {
                        "type": "object",
                        "$ref": "#/definitions/error"
                    }
                },
                "transition": {
                    "description": "Next transition of the workflow after all the actions have been performed",
                    "$ref": "#/definitions/transition"
                },
                "dataInputSchema": {
                    "type": "string",
                    "format": "uri",
                    "description": "URI to JSON Schema that state data input adheres to"
                },
                "dataOutputSchema": {
                    "type": "string",
                    "format": "uri",
                    "description": "URI to JSON Schema that state data output adheres to"
                },
                "metadata": {
                    "type": "object",
                    "description": "Metadata information",
                    "additionalProperties": {
                        "type": "string"
                    }
                }
            },
            "oneOf": [
                {
                    "required": [
                        "name",
                        "type",
                        "actionMode",
                        "actions",
                        "end"
                    ]
                },
                {
                    "required": [
                        "name",
                        "type",
                        "actionMode",
                        "actions",
                        "transition"
                    ]
                },
                {
                    "required": [
                        "start",
                        "name",
                        "type",
                        "actionMode",
                        "actions",
                        "transition"
                    ]
                },
                {
                    "required": [
                        "start",
                        "name",
                        "type",
                        "actionMode",
                        "actions",
                        "end"
                    ]
                }
            ]
        },
        "parallelstate": {
            "type": "object",
            "description": "Consists of a number of states that are executed in parallel",
            "properties": {
                "id": {
                    "type": "string",
                    "description": "Unique State id",
                    "minLength": 1
                },
                "name": {
                    "type": "string",
                    "description": "State name"
                },
                "type": {
                    "type": "string",
                    "const": "parallel",
                    "description": "State type"
                },
                "start": {
                    "$ref": "#/definitions/start",
                    "description": "State start definition"
                },
                "end": {
                    "$ref": "#/definitions/end",
                    "description": "State end definition"
                },
                "stateDataFilter": {
                    "$ref": "#/definitions/statedatafilter"
                },
                "branches": {
                    "type": "array",
                    "description": "Branch Definitions",
                    "items": {
                        "type": "object",
                        "$ref": "#/definitions/branch"
                    }
                },
                "completionType": {
                    "type" : "string",
                    "enum": ["and", "xor", "n_of_m"],
                    "description": "Option types on how to complete branch execution.",
                    "default": "and"
                },
                "n": {
                    "type": ["integer","string"],
                    "minimum": 0,
                    "minLength": 0,
                    "description": "Used when completionType is set to 'n_of_m' to specify the 'N' value"
                },
                "onErrors": {
                    "type": "array",
                    "description": "States error handling and retries definitions",
                    "items": {
                        "type": "object",
                        "$ref": "#/definitions/error"
                    }
                },
                "transition": {
                    "description": "Next transition of the workflow after all branches have completed execution",
                    "$ref": "#/definitions/transition"
                },
                "dataInputSchema": {
                    "type": "string",
                    "format": "uri",
                    "description": "URI to JSON Schema that state data input adheres to"
                },
                "dataOutputSchema": {
                    "type": "string",
                    "format": "uri",
                    "description": "URI to JSON Schema that state data output adheres to"
                },
                "metadata": {
                    "type": "object",
                    "description": "Metadata information",
                    "additionalProperties": {
                        "type": "string"
                    }
                }
            },
            "oneOf": [
                {
                    "required": [
                        "name",
                        "type",
                        "branches",
                        "end"
                    ]
                },
                {
                    "required": [
                        "name",
                        "type",
                        "branches",
                        "transition"
                    ]
                },
                {
                    "required": [
                        "start",
                        "name",
                        "type",
                        "branches",
                        "transition"
                    ]
                },
                {
                    "required": [
                        "start",
                        "name",
                        "type",
                        "branches",
                        "transition",
                        "end"
                    ]
                }
            ]
        },
        "switchstate": {
            "oneOf": [
                {
                    "$ref": "#/definitions/databasedswitch"
                },
                {
                    "$ref": "#/definitions/eventbasedswitch"
                }
            ]
        },
        "eventbasedswitch": {
            "type": "object",
            "description": "Permits transitions to other states based on events",
            "properties": {
                "id": {
                    "type": "string",
                    "description": "Unique State id",
                    "minLength": 1
                },
                "name": {
                    "type": "string",
                    "description": "State name"
                },
                "type": {
                    "type": "string",
                    "const": "switch",
                    "description": "State type"
                },
                "start": {
                    "$ref": "#/definitions/start",
                    "description": "State start definition"
                },
                "stateDataFilter": {
                    "$ref": "#/definitions/statedatafilter"
                },
                "eventConditions": {
                    "type": "array",
                    "description": "Defines conditions evaluated against events",
                    "items": {
                        "type": "object",
                        "$ref": "#/definitions/eventcondition"
                    }
                },
                "onErrors": {
                    "type": "array",
                    "description": "States error handling and retries definitions",
                    "items": {
                        "type": "object",
                        "$ref": "#/definitions/error"
                    }
                },
                "eventTimeout": {
                    "type": "string",
                    "description": "If eventConditions is used, defines the time period to wait for events (ISO 8601 format)"
                },
                "default": {
                    "description": "Default transition of the workflow if there is no matching data conditions. Can include a transition or end definition",
                    "$ref": "#/definitions/defaultdef"
                },
                "dataInputSchema": {
                    "type": "string",
                    "format": "uri",
                    "description": "URI to JSON Schema that state data input adheres to"
                },
                "dataOutputSchema": {
                    "type": "string",
                    "format": "uri",
                    "description": "URI to JSON Schema that state data output adheres to"
                },
                "metadata": {
                    "type": "object",
                    "description": "Metadata information",
                    "additionalProperties": {
                        "type": "string"
                    }
                }
            },
            "oneOf": [
                {
                    "required": [
                        "name",
                        "type",
                        "eventConditions",
                        "default"
                    ]
                },
                {
                    "required": [
                        "start",
                        "name",
                        "type",
                        "eventConditions",
                        "default"
                    ]
                }
            ]
        },
        "databasedswitch": {
            "type": "object",
            "description": "Permits transitions to other states based on data conditions",
            "properties": {
                "id": {
                    "type": "string",
                    "description": "Unique State id",
                    "minLength": 1
                },
                "name": {
                    "type": "string",
                    "description": "State name"
                },
                "type": {
                    "type": "string",
                    "const": "switch",
                    "description": "State type"
                },
                "start": {
                    "$ref": "#/definitions/start",
                    "description": "State start definition"
                },
                "stateDataFilter": {
                    "$ref": "#/definitions/statedatafilter"
                },
                "dataConditions": {
                    "type": "array",
                    "description": "Defines conditions evaluated against state data",
                    "items": {
                        "type": "object",
                        "$ref": "#/definitions/datacondition"
                    }
                },
                "onErrors": {
                    "type": "array",
                    "description": "States error handling and retries definitions",
                    "items": {
                        "type": "object",
                        "$ref": "#/definitions/error"
                    }
                },
                "default": {
                    "description": "Default transition of the workflow if there is no matching data conditions. Can include a transition or end definition",
                    "$ref": "#/definitions/defaultdef"
                },
                "dataInputSchema": {
                    "type": "string",
                    "format": "uri",
                    "description": "URI to JSON Schema that state data input adheres to"
                },
                "dataOutputSchema": {
                    "type": "string",
                    "format": "uri",
                    "description": "URI to JSON Schema that state data output adheres to"
                },
                "metadata": {
                    "type": "object",
                    "description": "Metadata information",
                    "additionalProperties": {
                        "type": "string"
                    }
                }
            },
            "oneOf": [
                {
                    "required": [
                        "name",
                        "type",
                        "dataConditions",
                        "default"
                    ]
                },
                {
                    "required": [
                        "start",
                        "name",
                        "type",
                        "dataConditions",
                        "default"
                    ]
                }
            ]
        },
        "defaultdef": {
            "type": "object",
            "description": "Default definition. Can be either a transition or end definition",
            "properties": {
                "transition": {
                    "$ref": "#/definitions/transition"
                },
                "end": {
                    "$ref": "#/definitions/end"
                }
            },
            "oneOf": [
                {
                    "required": [
                        "transition"
                    ]
                },
                {
                    "required": [
                        "end"
                    ]
                }
            ]
        },
        "eventcondition": {
            "oneOf": [
                {
                    "$ref": "#/definitions/transitioneventcondition"
                },
                {
                    "$ref": "#/definitions/enddeventcondition"
                }
            ]
        },
        "transitioneventcondition": {
            "type": "object",
            "description": "Switch state data event condition",
            "properties": {
                "name": {
                    "type": "string",
                    "description": "Event condition name"
                },
                "eventRef": {
                    "type" : "string",
                    "description": "References an unique event name in the defined workflow events"
                },
                "transition": {
                    "description": "Next transition of the workflow if there is valid matches",
                    "$ref": "#/definitions/transition"
                }
            },
            "eventDataFilter": {
                "description": "Event data filter definition",
                "$ref": "#/definitions/eventdatafilter"
            },
            "metadata": {
                "type": "object",
                "description": "Metadata information",
                "additionalProperties": {
                    "type": "string"
                }
            },
            "required": ["eventRef", "transition"]
        },
        "enddeventcondition": {
            "type": "object",
            "description": "Switch state data event condition",
            "properties": {
                "name": {
                    "type": "string",
                    "description": "Event condition name"
                },
                "eventRef": {
                    "type" : "string",
                    "description": "References an unique event name in the defined workflow events"
                },
                "end": {
                    "$ref": "#/definitions/end",
                    "description": "Explicit transition to end"
                }
            },
            "eventDataFilter": {
                "description": "Event data filter definition",
                "$ref": "#/definitions/eventdatafilter"
            },
            "metadata": {
                "type": "object",
                "description": "Metadata information",
                "additionalProperties": {
                    "type": "string"
                }
            },
            "required": ["eventRef", "transition"]
        },
        "datacondition": {
            "oneOf": [
                {
                    "$ref": "#/definitions/transitiondatacondition"
                },
                {
                    "$ref": "#/definitions/enddatacondition"
                }
            ]
        },
        "transitiondatacondition": {
            "type": "object",
            "description": "Switch state data based condition",
            "properties": {
                "name": {
                    "type": "string",
                    "description": "Data condition name"
                },
                "condition": {
                    "type": "string",
                    "description": "JsonPath expression evaluated against state data. True if results are not empty"
                },
                "transition": {
                    "description": "Next transition of the workflow if there is valid matches",
                    "$ref": "#/definitions/transition"
                }
            },
            "metadata": {
                "type": "object",
                "description": "Metadata information",
                "additionalProperties": {
                    "type": "string"
                }
            },
            "required": ["condition", "transition"]
        },
        "enddatacondition": {
            "type": "object",
            "description": "Switch state data based condition",
            "properties": {
                "name": {
                    "type": "string",
                    "description": "Data condition name"
                },
                "condition": {
                    "type": "string",
                    "description": "JsonPath expression evaluated against state data. True if results are not empty"
                },
                "end": {
                    "$ref": "#/definitions/end",
                    "description": "Explicit transition to end"
                }
            },
            "metadata": {
                "type": "object",
                "description": "Metadata information",
                "additionalProperties": {
                    "type": "string"
                }
            },
            "required": ["condition", "end"]
        },
        "subflowstate": {
            "type": "object",
            "description": "Defines a sub-workflow to be executed",
            "properties": {
                "id": {
                    "type": "string",
                    "description": "Unique state id",
                    "minLength": 1
                },
                "name": {
                    "type": "string",
                    "description": "State name"
                },
                "type": {
                    "type": "string",
                    "const": "subflow",
                    "description": "State type"
                },
                "start": {
                    "$ref": "#/definitions/start",
                    "description": "State start definition"
                },
                "end": {
                    "$ref": "#/definitions/end",
                    "description": "State end definition"
                },
                "waitForCompletion": {
                    "type": "boolean",
                    "default": false,
                    "description": "Workflow execution must wait for sub-workflow to finish before continuing"
                },
                "workflowId": {
                    "type": "string",
                    "description": "Sub-workflow unique id"
                },
                "stateDataFilter": {
                    "$ref": "#/definitions/statedatafilter"
                },
                "onErrors": {
                    "type": "array",
                    "description": "States error handling and retries definitions",
                    "items": {
                        "type": "object",
                        "$ref": "#/definitions/error"
                    }
                },
                "transition": {
                    "description": "Next transition of the workflow after SubFlow has completed execution",
                    "$ref": "#/definitions/transition"
                },
                "dataInputSchema": {
                    "type": "string",
                    "format": "uri",
                    "description": "URI to JSON Schema that state data input adheres to"
                },
                "dataOutputSchema": {
                    "type": "string",
                    "format": "uri",
                    "description": "URI to JSON Schema that state data output adheres to"
                },
                "metadata": {
                    "type": "object",
                    "description": "Metadata information",
                    "additionalProperties": {
                        "type": "string"
                    }
                }
            },
            "oneOf": [
                {
                    "required": [
                        "name",
                        "type",
                        "workflowId",
                        "end"
                    ]
                },
                {
                    "required": [
                        "name",
                        "type",
                        "workflowId",
                        "transition"
                    ]
                },
                {
                    "required": [
                        "start",
                        "name",
                        "type",
                        "workflowId",
                        "transition"
                    ]
                },
                {
                    "required": [
                        "start",
                        "name",
                        "type",
                        "workflowId",
                        "end"
                    ]
                }
            ]
        },
        "injectstate": {
            "type": "object",
            "description": "Inject static data into state data. Does not perform any actions",
            "properties": {
                "id": {
                    "type": "string",
                    "description": "Unique state id",
                    "minLength": 1
                },
                "name": {
                    "type": "string",
                    "description": "State name"
                },
                "type": {
                    "type": "string",
                    "const": "inject",
                    "description": "State type"
                },
                "start": {
                    "$ref": "#/definitions/start",
                    "description": "State start definition"
                },
                "end": {
                    "$ref": "#/definitions/end",
                    "description": "State end definition"
                },
                "data": {
                    "type": "object",
                    "description": "JSON object which can be set as states data input and can be manipulated via filters"
                },
                "stateDataFilter": {
                    "$ref": "#/definitions/statedatafilter"
                },
                "transition": {
                    "description": "Next transition of the workflow after subflow has completed",
                    "$ref": "#/definitions/transition"
                },
                "dataInputSchema": {
                    "type": "string",
                    "format": "uri",
                    "description": "URI to JSON Schema that state data input adheres to"
                },
                "dataOutputSchema": {
                    "type": "string",
                    "format": "uri",
                    "description": "URI to JSON Schema that state data output adheres to"
                },
                "metadata": {
                    "type": "object",
                    "description": "Metadata information",
                    "additionalProperties": {
                        "type": "string"
                    }
                }
            },
            "oneOf": [
                {
                    "required": [
                        "name",
                        "type",
                        "end"
                    ]
                },
                {
                    "required": [
                        "name",
                        "type",
                        "transition"
                    ]
                },
                {
                    "required": [
                        "start",
                        "name",
                        "type",
                        "transition"
                    ]
                },
                {
                    "required": [
                        "start",
                        "name",
                        "type",
                        "end"
                    ]
                }
            ]
        },
        "foreachstate": {
            "type": "object",
            "description": "Execute a set of defined actions or workflows for each element of a data array",
            "properties": {
                "id": {
                    "type": "string",
                    "description": "Unique State id",
                    "minLength": 1
                },
                "name": {
                    "type": "string",
                    "description": "State name"
                },
                "type": {
                    "type": "string",
                    "const": "foreach",
                    "description": "State type"
                },
                "start": {
                    "$ref": "#/definitions/start",
                    "description": "State start definition"
                },
                "end": {
                    "$ref": "#/definitions/end",
                    "description": "State end definition"
                },
                "inputCollection": {
                    "type": "string",
                    "description": "JsonPath expression selecting an array element of the states data"
                },
                "outputCollection": {
                    "type": "string",
                    "description": "JsonPath expression specifying an array element of the states data to add the results of each iteration"
                },
                "iterationParam": {
                    "type": "string",
                    "description": "Name of the iteration parameter that can be referenced in actions/workflow. For each parallel iteration, this param should contain an unique element of the inputCollection array"
                },
                "max": {
                    "type": ["integer","string"],
                    "minimum": 0,
                    "minLength": 0,
                    "description": "Specifies how upper bound on how many iterations may run in parallel"
                },
                "actions": {
                    "type": "array",
                    "description": "Actions to be executed for each of the elements of inputCollection",
                    "items": {
                        "type": "object",
                        "$ref": "#/definitions/action"
                    }
                },
                "workflowId": {
                    "type": "string",
                    "description": "Unique Id of a workflow to be executed for each of the elements of inputCollection"
                },
                "stateDataFilter": {
                    "$ref": "#/definitions/statedatafilter"
                },
                "onErrors": {
                    "type": "array",
                    "description": "States error handling and retries definitions",
                    "items": {
                        "type": "object",
                        "$ref": "#/definitions/error"
                    }
                },
                "transition": {
                    "description": "Next transition of the workflow after state has completed",
                    "$ref": "#/definitions/transition"
                },
                "dataInputSchema": {
                    "type": "string",
                    "format": "uri",
                    "description": "URI to JSON Schema that state data input adheres to"
                },
                "dataOutputSchema": {
                    "type": "string",
                    "format": "uri",
                    "description": "URI to JSON Schema that state data output adheres to"
                },
                "metadata": {
                    "type": "object",
                    "description": "Metadata information",
                    "additionalProperties": {
                        "type": "string"
                    }
                }
            },
            "oneOf": [
                {
                    "required": [
                        "name",
                        "type",
                        "inputCollection",
                        "inputParameter",
                        "workflowId",
                        "end"
                    ]
                },
                {
                    "required": [
                        "name",
                        "type",
                        "inputCollection",
                        "inputParameter",
                        "workflowId",
                        "transition"
                    ]
                },
                {
                    "required": [
                        "start",
                        "name",
                        "type",
                        "inputCollection",
                        "inputParameter",
                        "workflowId",
                        "end"
                    ]
                },
                {
                    "required": [
                        "start",
                        "name",
                        "type",
                        "inputCollection",
                        "inputParameter",
                        "workflowId",
                        "transition"
                    ]
                },
                {
                    "required": [
                        "name",
                        "type",
                        "inputCollection",
                        "inputParameter",
                        "actions",
                        "end"
                    ]
                },
                {
                    "required": [
                        "name",
                        "type",
                        "inputCollection",
                        "inputParameter",
                        "actions",
                        "transition"
                    ]
                },
                {
                    "required": [
                        "start",
                        "name",
                        "type",
                        "inputCollection",
                        "inputParameter",
                        "actions",
                        "end"
                    ]
                },
                {
                    "required": [
                        "start",
                        "name",
                        "type",
                        "inputCollection",
                        "inputParameter",
                        "actions",
                        "transition"
                    ]
                }
            ]
        },
        "callbackstate": {
            "type": "object",
            "description": "This state performs an action, then waits for the callback event that denotes completion of the action",
            "properties": {
                "id": {
                    "type": "string",
                    "description": "Unique state id",
                    "minLength": 1
                },
                "name": {
                    "type": "string",
                    "description": "State name"
                },
                "type": {
                    "type" : "string",
                    "const": "callback",
                    "description": "State type"
                },
                "action": {
                    "description": "Defines the action to be executed",
                    "$ref": "#/definitions/action"
                },
                "eventRef": {
                    "type" : "string",
                    "description": "References an unique callback event name in the defined workflow events"
                },
                "timeout": {
                    "type": "string",
                    "description": "Time period to wait for incoming events (ISO 8601 format)"
                },
                "eventDataFilter": {
                    "description": "Callback event data filter definition",
                    "$ref": "#/definitions/eventdatafilter"
                },
                "stateDataFilter": {
                    "description": "State data filter definition",
                    "$ref": "#/definitions/statedatafilter"
                },
                "onErrors": {
                    "type": "array",
                    "description": "States error handling and retries definitions",
                    "items": {
                        "type": "object",
                        "$ref": "#/definitions/error"
                    }
                },
                "dataInputSchema": {
                    "type": "string",
                    "format": "uri",
                    "description": "URI to JSON Schema that state data input adheres to"
                },
                "dataOutputSchema": {
                    "type": "string",
                    "format": "uri",
                    "description": "URI to JSON Schema that state data output adheres to"
                },
                "transition": {
                    "description": "Next transition of the workflow after all the actions have been performed",
                    "$ref": "#/definitions/transition"
                },
                "start": {
                    "$ref": "#/definitions/start",
                    "description": "State start definition"
                },
                "end": {
                    "$ref": "#/definitions/end",
                    "description": "State end definition"
                },
                "metadata": {
                    "type": "object",
                    "description": "Metadata information",
                    "additionalProperties": {
                        "type": "string"
                    }
                }
            },
            "oneOf": [
                {
                    "required": [
                        "name",
                        "type",
                        "action",
                        "eventRef",
                        "timeout",
                        "end"
                    ]
                },
                {
                    "required": [
                        "name",
                        "type",
                        "action",
                        "eventRef",
                        "timeout",
                        "transition"
                    ]
                },
                {
                    "required": [
                        "start",
                        "name",
                        "type",
                        "action",
                        "eventRef",
                        "timeout",
                        "end"
                    ]
                },
                {
                    "required": [
                        "start",
                        "name",
                        "type",
                        "action",
                        "eventRef",
                        "timeout",
                        "transition"
                    ]
                }
            ]
        },
        "start": {
            "type": "object",
            "description": "State start definition",
            "properties": {
                "kind": {
                    "type": "string",
                    "enum": [
                        "default",
                        "scheduled"
                    ],
                    "description": "Kind of start definition"
                },
                "schedule": {
                    "description": "If kind is 'scheduled', define when the time/repeating intervals at which workflow instances can/should be started",
                    "$ref": "#/definitions/schedule"
                }
            },
            "if": {
                "properties": {
                    "kind": {
                        "const": "scheduled"
                    }
                }
            },
            "then": {
                "required": [
                    "kind",
                    "schedule"
                ]
            },
            "else": {
                "required": [
                    "kind"
                ]
            }
        },
        "schedule": {
            "type": "object",
            "description": "Start state schedule definition",
            "properties": {
                "interval": {
                    "type": "string",
                    "description":  "Time interval (ISO 8601 format) describing when the workflow starting state is active"
                },
                "cron": {
                    "type": "string",
                    "description":  "Repeating interval (cron expression) describing when the workflow starting state should be triggered"
                },
                "directInvoke": {
                    "description": "Define if workflow instances can be created outside of the defined interval/cron",
                    "type": "string",
                    "enum": [
                        "allow",
                        "deny"
                    ]
                },
                "timezone": {
                    "type": "string",
                    "description":  "Timezone name used to evaluate the cron expression. Not used for interval as timezone can be specified there directly. If not specified, should default to local machine timezone."
                }
            },
            "oneOf": [
                {
                    "required": [
                        "interval",
                        "directInvoke"
                    ]
                },
                {
                    "required": [
                        "cron",
                        "directInvoke"
                    ]
                }
            ]
        },
        "end": {
            "type": "object",
            "description": "State end definition",
            "properties": {
                "kind": {
                    "type": "string",
                    "enum": [
                        "default",
                        "terminate",
                        "event"
                    ],
                    "description": "Kind of end definition"
                },
                "produceEvents": {
                    "type": "array",
                    "description": "Used if kind is event. Array of events to be produced",
                    "items": {
                        "type": "object",
                        "$ref": "#/definitions/produceeventdef"
                    }
                }
            },
            "if": {
                "properties": {
                    "kind": {
                        "const": "event"
                    }
                }
            },
            "then": {
                "required": [
                    "kind",
                    "produceEvents"
                ]
            },
            "else": {
                "required": [
                    "kind"
                ]
            }
        },
        "produceeventdef": {
            "type": "object",
            "description": "Produce an event and set its data",
            "properties": {
                "eventRef": {
                    "type": "string",
                    "description": "References a name of a defined event"
                },
                "data": {
                    "type": ["string", "object"],
                    "description": "If String, expression which selects parts of the states data output to become the data of the produced event. If object a custom object to become the data of produced event."
                },
                "contextAttributes": {
                    "type": "object",
                    "description": "Add additional event extension context attributes",
                    "additionalProperties": {
                        "type": "string"
                    }
                }
            },
            "required": [
                "eventRef"
            ]
        },
        "statedatafilter": {
            "type": "object",
            "properties": {
                "dataInputPath": {
                    "type": "string",
                    "description": "JsonPath definition that selects parts of the states data input"
                },
                "dataOutputPath": {
                    "type": "string",
                    "description": "JsonPath definition that selects parts of the states data output"
                }
            },
            "required": []
        },
        "eventdatafilter": {
            "type": "object",
            "properties": {
                "dataOutputPath": {
                    "type": "string",
                    "description": "JsonPath definition that selects parts of the event data, to be merged with the states data"
                }
            },
            "required": []
        },
        "actiondatafilter": {
            "type": "object",
            "properties": {
                "dataInputPath": {
                    "type": "string",
                    "description": "JsonPath definition that selects parts of the states data input to be the action data"
                },
                "dataResultsPath": {
                    "type": "string",
                    "description": "JsonPath definition that selects parts of the actions data result, to be merged with the states data"
                }
            },
            "required": []
        },
        "errordatafilter": {
            "type": "object",
            "properties": {
                "dataOutputPath": {
                    "type": "string",
                    "description": "JsonPath definition that selects parts of the error data, to be merged with the states data"
                }
            },
            "required": []
        }
    }
}