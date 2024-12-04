---
title: Serverless Workflow Java SDK 7.0.0-alpha5
author: Francisco Javier Tirado Sarti
date: 2024-11-7
description: >
   Heads up, community! We have released a new Java SDK version compatible with Specification 1.0.0.
---

## Announcing the Release of Serverless Workflow Java SDK 7.0.0-alpha5

Hello, Serverless Workflow community!

We're excited to announce the release of the latest Java SDK, version 7.0.0-alpha5, now compatible with the upcoming Serverless Workflow Specification 1.0.0. You can dive right in by using [one of the examples](https://github.com/serverlessworkflow/specification/tree/main/examples) available in the specification repository. Here's a quick example to get you started:

{{< card code=true header="**Java SDK Example**" lang="Java" >}}
// Make sure simple.yaml is in your src/main/resources folder
try (InputStream in = new FileInputStream("simple.yaml")) {
   Workflow workflow = WorkflowReader.readWorkflow (in, WorkflowFormat.YAML);
    // Once you have the Workflow instance, you can use its API to inspect it
}
{{< /card >}}

To install the SDK, simply add it as a dependency to your Maven project:

{{< card code=true header="**Maven Dependency**" lang="Java" >}}
<dependency>
    <groupId>io.serverlessworkflow</groupId>
    <artifactId>serverlessworkflow-api</artifactId>
    <version>7.0.0-alpha5</version>
</dependency>
{{< /card >}}

With this release, 

- We update to the latest schema. 
- We improve POJO generation from specification schema by:
     - creating proper union classes when the one of the union members is a string
     - assigning meaningful names by using schema titles. 
- We start the development of a reference implementation, that will be properly documented when it reaches a more stable state.

We're also thrilled to share that new features are in the pipeline, and we'll be releasing another alpha version soon. You can track our progress towards the 7.0.0.Final version [here](https://github.com/serverlessworkflow/sdk-java/milestone/1).

### Previous Versions and Support for the Specification 0.8

As we move forward, if you encounter any issues with the 5.x series, which supports Specification 0.8, please [open an issue in our repository](https://github.com/serverlessworkflow/sdk-java/issues) so we can track it. While we may release patch versions to address critical issues, please note that no new features will be added, and our resources for maintaining this branch are limited.

For those interested in contributing to the 6.x series, which supports the legacy 0.9 version of the specification, we welcome your efforts. However, we want to emphasize that our primary focus and resources are dedicated to the new 1.0.0 specification, which aligns with the 7.x stream of the Java SDK.

Happy coding!
