---
title: Open API
---
document:
  dsl: '1.0.0'
  namespace: default
  name: call-openapi
  version: '1.0.0'
do:
  - findPet:
      call: openapi
      with:
        document: 
          endpoint: https://petstore.swagger.io/v2/swagger.json
        operationId: findPetsByStatus
        parameters:
          status: available