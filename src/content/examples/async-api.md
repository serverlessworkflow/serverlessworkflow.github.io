---
title: Async API
---
document:
  dsl: '1.0.0'
  namespace: default
  name: call-asyncapi
  version: '1.0.0'
do:
- findPet:
    call: asyncapi
    with:
      document:
        uri: https://fake.com/docs/asyncapi.json
      operationRef: findPetsByStatus
      server: staging
      message:
        payload:
          petId: ${ .pet.id }
      authentication:
        bearer:
          token: ${ .token }