---
title: gRPC
---
document:
  dsl: '1.0.0'
  namespace: default
  name: call-grpc
  version: '1.0.0'
do:
  - greet:
      call: grpc
      with:
        proto: 
          endpoint: file://app/greet.proto
        service:
          name: GreeterApi.Greeter
          host: localhost
          port: 5011
        method: SayHello
        arguments:
          name: '${ .user.preferredDisplayName }'