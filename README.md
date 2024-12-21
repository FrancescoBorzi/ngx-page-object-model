# ngx-page-object-model

ngx-page-object-model is a lightweight library designed to simplify writing [unit tests for Angular UI Components](https://javascript.plainenglish.io/component-dom-testing-in-angular-0d2256414c06) by leveraging the [Page Object Model (POM) design pattern](https://martinfowler.com/bliki/PageObject.html).

This library is fully Angular-based and completely testing-framework-agnostic, making it compatible with (Jasmine)[https://jasmine.github.io/], [Jest](https://jestjs.io/), [Vitest](https://vitest.dev/), or any other unit testing framework. 
It can be used alongside tools like [Spectator](https://ngneat.github.io/spectator/) or as a standalone solution, offering maximum flexibility.

By using the Page Object Model design pattern, you can create a new abstraction and separate your test logic from the logic to read and manipulate the DOM.
