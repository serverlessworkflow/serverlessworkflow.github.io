---
title: Visit to Huawei to learn more about their implementations and future work
author: Ricardo Zanini
date: 2025-07-30
description: >
  On July 2025 we visited Huawei to meet with Paul Chen, Yuri Zhao, Heng Kuang and other contributors from the company to learn more about their specification implementation, future work and collaboration to the project.
---

Last week, I had the pleasure of joining a workshop at Huawei Canada’s headquarters alongside [Heng Kuang](https://www.linkedin.com/in/hengyuankuang/) and [Paul Chen](https://www.linkedin.com/in/paul-chen-a81ab688/). We dove into Huawei’s recent efforts to implement the Serverless Workflow specification and explored how they might contribute to our upcoming 1.1.0 milestone.

At the heart of our discussions was the proposed A2A call task (see [issue #1102](https://github.com/serverlessworkflow/specification/issues/1102)). Huawei’s team has already developed a proof-of-concept based on the v1.0.0 [HTTP call task](https://github.com/serverlessworkflow/specification/blob/main/dsl-reference.md#http-call), demonstrating how agents can be orchestrated through standard workflows. While the POC works, relying solely on raw HTTP calls proved verbose and introduced complexity—especially for operations like exchanging vCards.

Huawei has been an active partner in our community since 2020, when [Yuri Zhao](https://www.linkedin.com/in/yuri-zhao-0037a356/) first introduced the [FunctionGraph project](https://www.huaweicloud.com/intl/en-us/product/functiongraph.html) on Huawei Cloud. That project remains healthy and is slated to migrate to the v1.0.0 specification soon. Beyond FunctionGraph, Huawei is also building a fresh implementation of the specification using our Go SDK. If all goes according to plan, they’ll contribute their work back to our reference implementation.

This week, the Huawei team will join our [weekly community meeting](https://github.com/serverlessworkflow/specification/discussions/799) to present their A2A POC and propose formally adding the A2A call as an official task in the specification. We’re excited about this partnership and the opportunity to bring more AI-driven use cases into the Serverless Workflow ecosystem. Collaborating with Huawei is a significant step forward in strengthening our CNCF open source project and expanding our reach in the AI space.
