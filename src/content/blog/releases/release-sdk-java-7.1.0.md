---
title: Serverless Workflow Java SDK 7.1.0
author: Francisco Javier Tirado Sarti
date: 2025-04-29
description: >
   Heads up, community! We have released a new Java SDK version compatible with Specification 1.0.0.
---

## Announcing the Release of Serverless Workflow Java SDK 7.1.0

Hello, Serverless Workflow community!

We're excited to announce the release of the latest Java SDK, version 7.1.0, which is now compatible with the upcoming Serverless Workflow Specification 1.0.0 and includes a reference implementation. The reference implementation provides a ready-to-use runtime that supports the Serverless Workflow Specification. It consists of a workflow execution engine, validation utilities, and example workflows to help you quickly test and deploy your workflows. 


## Java SDK example

You can dive right in using [one of the examples](https://github.com/serverlessworkflow/specification/tree/main/examples) available in the specification repository. Here's a quick example to get you started:

To use the SDK, simply add it as a dependency to your Maven project:


```xml
<dependency>
    <groupId>io.serverlessworkflow</groupId>
    <artifactId>serverlessworkflow-api</artifactId>
    <version>7.0.0</version>
</dependency>
```

Then, you can write 

```java
// Make sure simple.yaml is in your root folder
try (InputStream in = new FileInputStream("simple.yaml")) {
   Workflow workflow = WorkflowReader.readWorkflow (in, WorkflowFormat.YAML);
    // Once you have the Workflow instance, you can use its API to inspect it
}
```

## Java Reference implementation example 

You can dive right in using [one of the examples](https://github.com/serverlessworkflow/sdk-java/tree/main/examples) available in the implementation repository or by checking the [README](https://github.com/serverlessworkflow/sdk-java/tree/main/impl). 

Here's a quick example to get you started:

To use reference implementation, simply add it as a dependency to your Maven project:

```xml
<dependency>
      <groupId>io.serverlessworkflow</groupId>
      <artifactId>serverlessworkflow-impl-core</artifactId>
      <version>7.1.0.Final</version>
</dependency>
```

Then, you can write the following code to execute a workflow

``` java 
// Make sure simple.yaml is in your src/main/resources folder
try (WorkflowApplication appl = WorkflowApplication.builder().build()) {
      logger.info(
          "Workflow output is {}",
          appl.workflowDefinition(WorkflowReader.readWorkflowFromClasspath("simple.yaml"))
              .instance(Map.of())
              .start()
              .join());
    }
```

## Whats new?

In this release:

- We updated the latest schema revision, which include these breaking changes
  - https://github.com/serverlessworkflow/specification/issues/1087
  - https://github.com/serverlessworkflow/specification/issues/1076
  - https://github.com/serverlessworkflow/specification/issues/1079


### Future plans 

Check out our roadmap [here](https://github.com/serverlessworkflow/sdk-java/milestone/2)

### Previous Versions and Support for the Specification 0.8

As we move forward, if you encounter any issues with the 5.x series, which supports Specification 0.8, please [open an issue in our repository](https://github.com/serverlessworkflow/sdk-java/issues) so we can track it. While we may release patch versions to address critical issues, please note that no new features will be added, and our resources for maintaining this branch are limited.

For those interested in contributing to the 6.x series, which supports the legacy 0.9 version of the specification, we welcome your efforts. However, we want to emphasize that our primary focus and resources are dedicated to the new 1.0.0 specification, which aligns with the 7.x stream of the Java SDK.

Happy coding!
