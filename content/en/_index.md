---
title: Serverless Workflow
description: Serverless Workflow presents a vendor-neutral, open-source, and entirely community-driven ecosystem tailored for defining and executing DSL-based workflows in the realm of Serverless technology.
summary: Serverless Workflow presents a vendor-neutral, open-source, and entirely community-driven ecosystem tailored for defining and executing DSL-based workflows in the realm of Serverless technology.
keywords:
- workflows
- serverless
- cloudevent
- services
images:
- img/logos/sw-logo.png
---

<!-- Cover -->
{{% blocks/cover title="Serverless Workflow" image_anchor="top" height="auto" %}}
<a class="btn btn-lg btn-primary me-3 mb-4" href="https://github.com/serverlessworkflow/specification/blob/main/README.md">
  Learn More <i class="fas fa-arrow-alt-circle-right ms-2"></i>
</a>
<p class="lead mt-5">Serverless Workflow presents a vendor-neutral, open-source, and entirely community-driven ecosystem tailored for defining and executing DSL-based workflows in the realm of Serverless technology.</p>
<p>The current version is 1.0.0-alpha5, get the JSON Schema here: <a href="https://serverlessworkflow.io/schemas/1.0.0-alpha5/workflow.yaml" target="_blank">YAML</a> or <a href="https://serverlessworkflow.io/schemas/1.0.0-alpha5/workflow.json" target="_blank">JSON</a></p>
{{< blocks/link-down color="info" >}}
{{% /blocks/cover %}}
<!-- END OF Cover -->

<!-- Selling points -->
{{% blocks/lead color="primary" %}}
The Serverless Workflow DSL is a high-level language that reshapes the terrain of workflow creation, boasting a design that is ubiquitous, intuitive, imperative, and fluent.
{{% /blocks/lead %}}

<section class="row td-box td-box--dark td-box--height-auto">
  <div class="col">
    <div class="container">
      <div class="row">
{{% blocks/feature icon="fa-thumbs-up" title="Easy to Use!" %}}
Serverless Workflow DSL simplifies workflow concepts, allowing users to easily create complex workflows.
{{% /blocks/feature %}}

{{% blocks/feature icon="fa-bolt" title="Event Driven" %}}
Integrate events seamlessly into workflows with support for formats like CloudEvents, enabling event-driven architectures
{{% /blocks/feature %}}


{{% blocks/feature icon="fa-cogs" title="Service Oriented" %}}
The Serverless Workflow DSL allows developers to integrate with service-oriented architectures, defining workflows that interact with services using protocols like HTTP, GRPC, OpenAPI, and AsyncAPI.
{{% /blocks/feature %}}

{{% blocks/feature icon="fa-server" title="FaaS Centric" %}}
Invoke functions across platforms seamlessly within workflows, supporting FaaS and microservices architectures.
{{% /blocks/feature %}}


{{% blocks/feature icon="fa-clock" title="Timely" %}}
Set timeouts for workflows and tasks to manage execution duration.
{{% /blocks/feature %}}


{{% blocks/feature icon="fa-shield-alt" title="Fault Tolerant" %}}
Define error handling strategies to manage and recover from workflow execution errors, ensuring robustness and reliability.
{{% /blocks/feature %}}
  </div><!-- <-- identing breaks the template ... -->
  </div>
  </div>
</section>
<!-- END OF Selling points -->

<!-- Samples -->
<section class="row td-box td-box--white td-box--height-auto">
  <div class="col">
    <div class="container">
      <p class="h1 text-center mb-5">User-Friendly DSL: Workflows Made Simple</p>
      <div class="row">
        <div class="col">
{{< tabpane text=true right=true >}}
  {{% tab header="**Examples**:" disabled=true /%}}
  {{% tab header="Minimal" lang="minimal" %}}
  ```yaml
  document:
    dsl: '1.0.0-alpha5'
    namespace: examples
    name: call-http-shorthand-endpoint
    version: '1.0.0'
  do:
    - getPet:
        call: http
        with:
          method: get
          endpoint: https://petstore.swagger.io/v2/pet/{petId}
  ```
  {{% /tab %}}
  {{% tab header="Async API" lang="asyncapi" %}}
  ```yaml
  document:
    dsl: '1.0.0-alpha5'
    namespace: examples
    name: bearer-auth
    version: '1.0.0'
  do:
    - findPet:
        call: asyncapi
        with:
          document:
            uri: https://fake.com/docs/asyncapi.json
          operationRef: findPetsByStatus
          server: staging
          message: getPetByStatusQuery
          binding: http
          payload:
            petId: ${ .pet.id }
          authentication:
            bearer:
              token: ${ .token }
  ```
  {{% /tab %}}
{{< /tabpane >}}
        </div>
      </div>
    </div>
  </div>
</section>
<!-- END OF Samples -->

<!-- Reach out -->
{{% blocks/section color="info" type="container" %}}
Reach out to us!
{.h1 .text-center .mb-5}
<div class="row">
{{% blocks/feature icon="fas fa-users" title="Join our Meetings!" url="https://github.com/serverlessworkflow/specification/discussions/799" %}}
Add the schedule to your calendar and become a part of our discussions!
{{% /blocks/feature %}}

{{% blocks/feature icon="fab fa-github" title="Contributions welcome!"
    url="https://github.com/serverlessworkflow/specification" %}}
We do a [Pull Request](https://github.com/serverlessworkflow/specification/pulls)
contributions workflow on **GitHub**. New users are always welcome!
{{% /blocks/feature %}}

{{% blocks/feature icon="fab fa-slack" title="Join us on Slack!"
    url="https://slack.cncf.io/" %}}
Chat with our community and follow announcements at **#serverless-workflow**

{{% /blocks/feature %}}
</div>
{{% /blocks/section %}}
<!-- END OF Reach out -->

<!-- Projects -->
{{% blocks/lead %}}
Open Source projects supporting our DSL
{.h1 .text-center}
{{% /blocks/lead %}}

{{% blocks/section type="container" color="white" %}}
<div class="row">
  <div class="col-lg-4 mb-5 mb-lg-0 text-center">
    <div class="logo-container my-4 d-flex justify-content-center align-items-center">
      <img src="img/logos/eventmesh.png" class="img-logo"/>
    </div>
    <h4 class="h3">
      Apache EventMesh Workflow
    </h4>
    <div class="mb-0">
      Apache EventMesh Workflow is a cloud vendor-independent, cloud-native-oriented Serverless Workflow Runtime based on Serverless Workflow specification, and provides durability, reliability, scalability, and observability capabilities.
    </div>
    <p><a class="me-3 mb-4" href="https://github.com/apache/eventmesh-workflow">Get Started</a></p>
  </div>

  <div class="col-lg-4 mb-5 mb-lg-0 text-center">
    <div class="logo-container my-4 d-flex justify-content-center align-items-center">
      <img src="img/logos/kogito.png" class="img-logo"/>
    </div>
    <h4 class="h3">
      Apache KIE SonataFlow
    </h4>
    <div class="mb-0">
      SonataFlow is a powerful tool for building cloud-native workflow applications, enabling seamless orchestration and choreography of services and events.
    </div>
    <p><a class="me-3 mb-4" href="https://sonataflow.org">Get Started</a></p>
  </div>

  <div class="col-lg-4 mb-5 mb-lg-0 text-center">
    <div class="logo-container my-4 d-flex justify-content-center align-items-center">
      <img src="img/logos/synapselogo.png" class="img-logo"/>
    </div>
    <h4 class="h3">
      Synapse
    </h4>
    <div class="mb-0">
      Synapse is a vendor-neutral, free, open-source, and community-driven Workflow Management System (WFMS) implementing the Serverless Workflow specification. You can deploy Synapse on Docker, Kubernetes, or natively on Windows, Mac, and Linux.
    </div>
    <p><a class="me-3 mb-4" href="https://github.com/serverlessworkflow/synapse">Get Started</a></p>
  </div>
</div>
{{% /blocks/section %}}
<!-- END OF Projects -->

<!-- Adopters -->
{{% blocks/lead color="primary" %}}
Trusted by top brands in workflow technologies
{.h1 .text-center .mb-3}

Already using Serverless Workflow? Join our list of top brands by letting us know here!
{{% /blocks/lead %}}

{{% blocks/section type="container" color="light-gray" %}}
<div class="row">
  <div class="col-lg-4 mb-5 mb-lg-0 text-center">
    <div class="logo-container my-4 d-flex justify-content-center align-items-center">
      <img src="img/logos/eventmesh2.png" class="img-logo-company"/>
    </div>
    <h4 class="h3">
      Apache EventMesh
    </h4>
    <div class="mb-0">
      A new generation serverless event middleware for building distributed event-driven applications.
    </div>
    <p><a class="me-3 mb-4" href="https://github.com/apache/eventmesh">Learn More</a></p>
  </div>

  <div class="col-lg-4 mb-5 mb-lg-0 text-center">
    <div class="logo-container my-4 d-flex justify-content-center align-items-center">
      <img src="img/logos/caf.png" class="img-logo-company"/>
    </div>
    <h4 class="h3">
      Caf
    </h4>
    <div class="mb-0">
      Serverless Workflow is the core technology behind every KYC/KYB solution allowing them to customize it for their clients seamlessly.
    </div>
    <p><a class="me-3 mb-4" href="https://caf.io/">Learn More</a></p>
  </div>

  <div class="col-lg-4 mb-5 mb-lg-0 text-center">
    <div class="logo-container my-4 d-flex justify-content-center align-items-center">
      <img src="img/logos/faasnet.png" class="img-logo-company"/>
    </div>
    <h4 class="h3">
      FaasNet
    </h4>
    <div class="mb-0">
      FaasNet makes it easy to deploy functions and API to Kubernetes without repetitive, boiler-plate coding.
    </div>
    <p><a class="me-3 mb-4" href="https://github.com/simpleidserver/FaasNet">Learn More</a></p>
  </div>

  <div class="col-lg-4 mb-5 mb-lg-0 text-center">
    <div class="logo-container my-4 d-flex justify-content-center align-items-center">
      <img src="img/logos/huawei.png" class="img-logo-company"/>
    </div>
    <h4 class="h3">
      Huawei
    </h4>
    <div class="mb-0">
      Huawei FunctionGraph hosts event-driven functions in a serverless context while ensuring high availability, high scalability, and zero maintenance.
    </div>
    <p><a class="me-3 mb-4" href="https://www.huaweicloud.com/intl/en-us/product/functiongraph.html">Learn More</a></p>
  </div>

  <div class="col-lg-4 mb-5 mb-lg-0 text-center">
    <div class="logo-container my-4 d-flex justify-content-center align-items-center">
      <img src="img/logos/neuroglia.png" class="img-logo-company"/>
    </div>
    <h4 class="h3">
      Neuroglia
    </h4>
    <div class="mb-0">
      Neuroglia is a consultancy and solution design company for the digital transformation of companies and their services.
    </div>
    <p><a class="me-3 mb-4" href="https://neuroglia.io/">Learn More</a></p>
  </div>

  <div class="col-lg-4 mb-5 mb-lg-0 text-center">
    <div class="logo-container my-4 d-flex justify-content-center align-items-center">
      <img src="img/logos/redhat.png" class="img-logo-company"/>
    </div>
    <h4 class="h3">
      Red Hat
    </h4>
    <div class="mb-0">
  Red Hat sponsors Apache KIE SonataFlow, a tool for creating cloud-native workflows. SonataFlow supports service and event orchestration, integrating with your architecture using CloudEvents, REST calls, and other standard components.
    </div>
    <p><a class="me-3 mb-4" href="https://www.redhat.com/en/technologies/cloud-computing/openshift/serverless">Learn More</a></p>
  </div>

  <div class="col-lg-4 mb-5 mb-lg-0 text-center">
    <div class="logo-container my-4 d-flex justify-content-center align-items-center">
      <img src="img/logos/warrify.png" class="img-logo-company"/>
    </div>
    <h4 class="h3">
      Warrify
    </h4>
    <div class="mb-0">
      warrify offers a leading data platform for the retail industry. With "warrify Journeys" (powered by Serverless Workflows) retailers are discovering new ways how to engage their customers in real time.
    </div>
    <p><a class="me-3 mb-4" href="https://www.warrify.com">Learn More</a></p>
  </div>
</div>
{{% /blocks/section %}}
<!-- END OF Adopters -->

<!-- Sponsors -->
{{% blocks/lead color="primary" %}}
Support our Project
{.h1 .text-center .mb-5}
Our sponsors, along with our community, help our project grow and stay vendor-neutral through their donations. <a class="me-3 mb-4" href="https://crowdfunding.lfx.linuxfoundation.org/projects/beb979ae-75b5-4589-a2d0-f82949253bb7">Buy us a coffee!</a>
{.h4 .text-center}

{{% /blocks/lead %}}
{{% blocks/section type="container" color="white" %}}
<div class="row">
  <div class="col-lg-4 mb-5 mb-lg-0 text-center">
    <div class="logo-container my-4 d-flex justify-content-center align-items-center">
      <img src="img/logos/neuroglia.png" class="img-logo-company"/>
    </div>
    <div class="mb-0">
      Neuroglia is a consultancy and solution design company for the digital transformation of companies and their services.
    </div>
    <p><a class="me-3 mb-4" href="https://neuroglia.io/">Website</a></p>
  </div>
</div>
{{% /blocks/section %}}
<!-- END OF Sponsors -->