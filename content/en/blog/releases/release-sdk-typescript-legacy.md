---
title: Serverless Workflow TypeScript SDK Legacy
author: Jean-Baptiste Bianchi
date: 2024-08-09
description: >
   Legacy Branch & Release for the TypeScript SDK 
---

# Announcing the Legacy Branch & release for Serverless Workflow TypeScript SDK

Hello, Serverless Workflow community!

I'm excited to share some important updates regarding the TypeScript SDK for the Serverless Workflow specification. As many of you know, our specification underwent a significant rewrite after version 0.9, culminating in the anticipated release of version 1.0.0-alpha. This update will bring many improvements and changes, aligning the spec with the latest needs and trends in serverless architectures.

## Introducing the Legacy Branch

For those of you who have been working with version 0.9 of the spec and wish to continue using it, we've created a **legacy branch** in our GitHub repository. This branch is for developers who want to maintain the older version, even though our organization will not officially support it moving forward.

You can find the legacy branch here: [Serverless Workflow TypeScript SDK - Legacy spec 0.9 Branch](https://github.com/serverlessworkflow/sdk-typescript/tree/legacy-spec-0.9)

### NPM Package for the Legacy Version

The legacy branch is published under the previously erroneous organization name `@severlessworkflow`. This package is available for those needing the older version for compatibility reasons and is aligned with version 0.9 of the specification.

To install the legacy package, you can use:

```bash
npm install @severlessworkflow/sdk-typescript@4.0.0-rc1
```

This package will retain the older naming and organizational structure to maintain backward compatibility for existing projects.

## Upcoming Packages with Correct Naming

Moving forward, all new packages will be released under the correct (organization) name `@serverlessworkflow/sdk`. This change not only corrects a previous error but also aligns with the updated versioning of the spec. 

The version 1.0.0-alpha is still a [work in progress](https://github.com/serverlessworkflow/sdk-typescript/pull/188). It will be released once it is ready and will feature all the enhancements and updates introduced with the rewritten specification.

## Why This Matters

These changes ensure consistency and alignment with our community's expectations and standards. Maintaining a legacy branch provides a bridge for developers needing more time to transition to the new specification. At the same time, the correct naming and versioning for new packages help streamline our offerings and reduce confusion.

## Moving Forward

We encourage all developers to explore the new features and improvements of the upcoming SDK version once it is released. For those who need to stick with the older version for now, the legacy branch is there for your convenience.

Thank you for your continued support and contributions to the Serverless Workflow community. As always, your feedback is invaluable, and we look forward to hearing your thoughts on these changes.

Happy coding!