---
title: Serverless Workflow 1.0.0-alpha1
author: Charles d'Avernas
date: 2024-06-07
description: >
   Exciting News! Serverless Workflow DSL v1.0.0-alpha1 Released!
---

Exciting News! Serverless Workflow DSL v1.0.0-alpha1 Released!

We're thrilled to announce the release of **Serverless Workflow DSL version 1.0.0-alpha1**! This is a major milestone, introducing numerous features and a significant **refactor to simplify and enhance the DSL**.

## What's New?

- Total Refactor: Overhauled grammar and semantics.
- Unified Descriptive Properties: Now at the document top level with a new namespace property. Addresses [#838](https://github.com/serverlessworkflow/specification/issues/838)
- Improved JSON Pointers: Complex objects now use maps instead of arrays. Addresses [#831](https://github.com/serverlessworkflow/specification/issues/831)
- Referencable Workflow Components: Eliminates cumbersome 'oneOf' definitions. Partially addresses [#691](https://github.com/serverlessworkflow/specification/issues/691)
- Unified Task Concept: Merged state and action into task.
- Flow Directives: Merged end and transition into flow directives. Addresses [#684](https://github.com/serverlessworkflow/specification/issues/684)
- Simplified Compensation: Designed via task branching/chaining.
- Composite Tasks: Support for nested tasks. Addresses [#413](https://github.com/serverlessworkflow/specification/issues/413)
- Flexible Function Calls: Supports HTTP, GRPC, OpenAPI, and AsyncAPI. Addresses [#828](https://github.com/serverlessworkflow/specification/issues/828)
- Custom Processes: Run containers, shell commands, scripts, or workflows.
- Execution Strategies: Sequential and concurrent task execution modes.
- Fault Tolerance: Use try tasks to catch and handle errors.
- Retry Policy: Retry on specific errors. Addresses [#681](https://github.com/serverlessworkflow/specification/issues/681) and [#772](https://github.com/serverlessworkflow/specification/issues/772)
- Timeouts: Define durations to raise timeout errors.
- Error Handling: Raise and manage errors effectively. Addresses [#771](https://github.com/serverlessworkflow/specification/issues/771)
- Gherkin Features: For conformance testing and Behavior Driven Design (BDD). Addresses [#324](https://github.com/serverlessworkflow/specification/issues/324)
- Concurrent Event Correlations: Enhanced event handling. Addresses [#679](https://github.com/serverlessworkflow/specification/issues/679) and [#680](https://github.com/serverlessworkflow/specification/issues/680)
- Extensions: Extend and override the DSL without writing code.

This release aims to be the final version with breaking changes before the stable Serverless Workflow DSL 1.0.0 release.

Check out the full details and start exploring the new features today!
