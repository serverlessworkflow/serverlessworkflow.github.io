---
title: HTTP
---
document:
  dsl: '1.0.0'
  namespace: default
  name: call-http
  version: '1.0.0'
do:
- getPet:
    call: http
    with:
      method: get
      endpoint: https://petstore.swagger.io/v2/pet/{petId}