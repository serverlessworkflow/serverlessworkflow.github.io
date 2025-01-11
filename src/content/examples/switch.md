---
title: Switch
---
document:
  dsl: '1.0.0-alpha5'
  namespace: test
  name: switch-example
  version: '0.1.0'
do:
  - processOrder:
      switch:
        - case1:
            when: .orderType == "electronic"
            then: processElectronicOrder
        - case2:
            when: .orderType == "physical"
            then: processPhysicalOrder
        - default:
            then: handleUnknownOrderType
  - processElectronicOrder:
      do:
        - validatePayment:
            call: http
            with:
              method: post
              endpoint: https://fake-payment-service.com/validate
        - fulfillOrder:
            call: http
            with:
              method: post
              endpoint: https://fake-fulfillment-service.com/fulfill
      then: exit
  - processPhysicalOrder:
      do:
        - checkInventory:
            call: http
            with:
              method: get
              endpoint: https://fake-inventory-service.com/inventory
        - packItems:
            call: http
            with:
              method: post
              endpoint: https://fake-packaging-service.com/pack
        - scheduleShipping:
            call: http
            with:
              method: post
              endpoint: https://fake-shipping-service.com/schedule
      then: exit
  - handleUnknownOrderType:
      do:
        - logWarning:
            call: http
            with:
              method: post
              endpoint: https://fake-logging-service.com/warn
        - notifyAdmin:
            call: http
            with:
              method: post
              endpoint: https://fake-notification-service.com/notify