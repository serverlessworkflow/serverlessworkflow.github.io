---
title: Serverless Workflow Java SDK 7.2.0
author: Ricardo Zanini
date: 2025-09-10
description: >-
 We’ve shipped Serverless Workflow Java SDK 7.2.0, aligned with Specification 1.0.0, with a brand-new Fluent DSL, experimental Func DSL, Mermaid diagrams, auth enhancements, and more.
---

## Announcing the Release of Serverless Workflow Java SDK 7.2.0

Hello, Serverless Workflow community! We’re excited to announce **Java SDK 7.2.0.Final**, aligned with **Serverless Workflow Specification 1.0.0**. This release strengthens the developer experience with a **Fluent DSL**, lifecycle hooks, richer HTTP authentication, and numerous quality and dependency updates.

👉 Full release notes: [GitHub – 7.2.0.Final](https://github.com/serverlessworkflow/sdk-java/releases/tag/7.2.0.Final)

---

## Highlights

* **Fluent DSL (Spec)**

  * Clean, expressive Java builders to define workflows, with new `if`/`until` predicates and extensible expression building.
* **Func DSL (experimental)**

  * Early function‑centric DSL for composing reusable functions and data transformations. API may evolve.
* **Mermaid diagrams**

  * Generate Mermaid diagrams for workflows and export SVG/PNG for docs, PRs, and design reviews.
* **Agentic (experimental)**

  * Early Agentic DSL and LangChain4j-based modules to explore LLM-powered workflows.
* **HTTP Auth Enhancements**

  * Adds **Basic**, **Bearer**, and **OAuth** auth to HTTP call tasks.
* **Lifecycle & Events**

  * New lifecycle events to observe workflow execution phases.
* **Core refactors & quality**

  * Stronger typing, clearer module boundaries (Jackson/JQ separated), more tests, and improved JWT handling.
* **Dependency updates**

  * JUnit 5, Hibernate Validator 9.x, Jackson 2.20.x line, Maven plugins, and more.

---

## Quick start

### Add the API

```xml
<dependency>
  <groupId>io.serverlessworkflow</groupId>
  <artifactId>serverlessworkflow-api</artifactId>
  <version>7.2.0.Final</version>
</dependency>
```

### (Optional) Reference implementation

```xml
<dependency>
  <groupId>io.serverlessworkflow</groupId>
  <artifactId>serverlessworkflow-impl-core</artifactId>
  <version>7.2.0.Final</version>
</dependency>
```

### Read a workflow

```java
// Make sure simple.yaml is on your classpath (e.g., src/main/resources)
try (InputStream in = Thread.currentThread().getContextClassLoader().getResourceAsStream("simple.yaml")) {
    Workflow workflow = WorkflowReader.readWorkflow(in, WorkflowFormat.YAML);
    // Inspect or execute with the reference implementation
}
```

---

## Visualize workflows with Mermaid (new)

Add the module:

```xml
<dependency>
  <groupId>io.serverlessworkflow</groupId>
  <artifactId>serverlessworkflow-mermaid</artifactId>
  <version>7.2.0.Final</version>
</dependency>
```

Render a workflow to Mermaid and export SVG:

```java
Workflow wf = WorkflowReader.readWorkflow(
    Thread.currentThread().getContextClassLoader().getResourceAsStream("simple.yaml"),
    WorkflowFormat.YAML);
String mermaid = new Mermaid().from(wf);
Path out = MermaidInk.render(mermaid, true, Path.of("workflow.svg")); // true = svg
```

> API is evolving; see the [Mermaid module README](https://github.com/serverlessworkflow/sdk-java/tree/main/mermaid) for the latest usage.

---

## Try the examples

* Spec examples: [https://github.com/serverlessworkflow/specification/tree/main/examples](https://github.com/serverlessworkflow/specification/tree/main/examples)
* SDK examples: [https://github.com/serverlessworkflow/sdk-java/tree/main/examples](https://github.com/serverlessworkflow/sdk-java/tree/main/examples)

> Note: Example modules are not published to Maven Central; build locally to try them.

---

## Roadmap & community

* Roadmap/Milestone: [https://github.com/serverlessworkflow/sdk-java/milestone/2](https://github.com/serverlessworkflow/sdk-java/milestone/2)
* Issues/feedback: [https://github.com/serverlessworkflow/sdk-java/issues](https://github.com/serverlessworkflow/sdk-java/issues)

Thank you to all contributors who helped shape this release. 🎉
