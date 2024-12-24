---
sidebar_position: 1
---

# Best practice: encapsulation

In case you missed it, since [Angular 14+](https://blog.angular.dev/angular-v14-is-now-available-391a6db736af) the Component's template can access `protected` members of the Component's class.
It is a good practice to always keep your class attributes and methods `private` by default and `protected` when they need to be accessed by the template.
Only in very rare cases you'll need to keep them `public`.

This is excellent for Component DOM Testing too as it will keep you and your colleagues away from the temptation of calling directly `component.onButtonClick()` 
