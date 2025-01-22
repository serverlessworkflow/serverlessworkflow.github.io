---
title: "Announcing Serverless Workflow SDK Go 3.0.0"
date: "2025-01-22"
description: "Discover the new features and improvements in Serverless Workflow SDK Go 3.0.0, aligned with the Serverless Workflow specification 1.0.0."
author: "Serverless Workflow Team"
---

# Announcing Serverless Workflow SDK Go 3.0.0

We are thrilled to announce the release of **Serverless Workflow SDK Go 3.0.0**, a milestone that aligns with the latest Serverless Workflow specification (v1.0.0).

## **What’s New in 3.0.0?**

This release introduces a host of new features and improvements:

1. **Support for Serverless Workflow Specification 1.0.0**  
   The SDK now fully supports the latest workflow specification, ensuring compatibility with modern standards and enabling developers to leverage advanced features effortlessly.

2. **Improved DSL Parsing**  
   The new implementation of the DSL parser ensures more robust validation and parsing of workflow definitions, adhering strictly to the updated JSON Schema.

3. **Reusable Components**  
   The introduction of reusable components such as authentication policies, error handlers, and catalogs simplifies workflow definitions and promotes consistency across workflows.

4. **Schema Validation and Interoperability**  
   With Go validators integrated natively, developers can rely on robust schema validation for input, output, and context management, ensuring workflows are reliable and error-free.

5. **Developer-Focused Improvements**  
   - Enhanced Go language idioms for better developer experience.
   - Improved code organization for scalability and maintainability.

## **Getting Started**

Upgrading to the new version is straightforward:

1. Update your project to use the new `v3` path:
   ```bash
   go get github.com/serverlessworkflow/sdk-go/v3
   ```

2. Update your code to accommodate the new DSL and schema changes. Refer to the updated [specification](https://github.com/serverlessworkflow/specification/tree/main/examples) for examples.

3. Run your tests and validate your workflows against the new schema to ensure a smooth transition.

## **Join the Community**

We are proud of what we’ve accomplished with version 3.0.0, and we’re excited to see how you will use it to create innovative solutions. Share your feedback, contributions, and ideas on our [GitHub issue page](https://github.com/serverlessworkflow/sdk-go/issues).
