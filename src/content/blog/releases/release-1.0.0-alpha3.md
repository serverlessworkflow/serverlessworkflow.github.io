---
title: Serverless Workflow 1.0.0-alpha3
author: Ricardo Zanini
date: 2024-10-07
description: >
   A Closer Look at Serverless Workflow v1.0.0-alpha3: Major Fixes and Performance Boosts
---

We’re excited to announce the release of v1.0.0-alpha3 for the Serverless Workflow project! This release includes several impactful improvements and bug fixes, making the platform more stable and feature-rich. Below are the most notable issues we’ve resolved in this version:

- **[#907](https://github.com/serverlessworkflow/specification/pull/907)**: Improved handling of **export expressions** in workflow schemas, ensuring smoother transitions and reliable exports of specific expressions and data during workflow execution. This enhancement enhances the overall flow and usability.

- **[#908](https://github.com/serverlessworkflow/specification/pull/908)**: Enhanced clarity in referencing **authentication policies** within workflows. This improvement simplifies the management of secure service calls by allowing clearer references and reuse of authentication policies across different states.

- **[#938](https://github.com/serverlessworkflow/specification/pull/938)**: Introduced support for **expressions in formatted strings**, enabling users to dynamically insert expressions into string literals. This feature enhances flexibility in defining dynamic values, allowing workflows to adapt based on runtime data.

- **[#953](https://github.com/serverlessworkflow/specification/pull/953)**: Resolved issues with the **definition of task and workflow properties**, allowing for more specific attributes that improve clarity and usability. This refinement leads to better-defined workflows and easier implementation.

- **[#956](https://github.com/serverlessworkflow/specification/pull/956)**: Added support for **query parameters in HTTP task definitions**, enabling users to specify parameters directly within their HTTP tasks. This enhancement improves usability and flexibility in constructing rich API requests.

- **[#960](https://github.com/serverlessworkflow/specification/pull/960)**: Introduced the capability to add **arguments to script processes**, allowing users to pass specific arguments during script execution. This flexibility enables workflows to adapt dynamically to varying conditions.

- **[#963](https://github.com/serverlessworkflow/specification/pull/963)**: Addressed semantic inconsistencies between **listen and emit tasks**, clarifying their definitions and expected behaviors. This standardization facilitates clearer logic and better integration within event-driven workflows.

- **[#973](https://github.com/serverlessworkflow/specification/pull/973)**: Refactored OAuth2 authentication and introduced **OIDC authentication** support, broadening the range of authentication strategies available. This improvement enhances security and usability when integrating with various identity providers.

- **[#995](https://github.com/serverlessworkflow/specification/pull/995)**: A new property has been added to determine whether to **await the execution of a process**, allowing for precise control over workflow execution flow. This flexibility helps in accommodating various execution scenarios effectively.

- **[#996](https://github.com/serverlessworkflow/specification/pull/996)**: Introduced support for adding **metadata to workflow documents and tasks**, allowing users to embed additional contextual information. This enhancement improves documentation and discoverability, facilitating better integration with external systems.

---

We believe these changes will make Serverless Workflow even more powerful and flexible for developers. Check out the [release notes](https://github.com/serverlessworkflow/specification/releases/tag/v1.0.0-alpha3) for the full list of updates. As always, we’re grateful for the continued support from our community and welcome feedback on this release!
