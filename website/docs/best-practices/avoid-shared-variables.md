---
sidebar_position: 3
---

# Avoid shared variables

Avoiding sharing mutable variables across different tests can be achieved by using a `setup()` (or `init()` or `testSetup()`) function instead of using `beforeEach` to initialize variables that will be used in tests.

This approach makes tests more isolated, prevents unexpected side effects, and improves the overall code readability.

Instead of doing:

```typescript
const MOCK_OBJECT = { value: 123 } as const;
let page: Page;
let myService: MyService;

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [MyComponent],
  }).compileComponents();

  page = new Page(TestBed.createComponent(MyComponent));
  myService = TestBed.inject(MyService);
});

it('should do something', () => {
  spyOn(myService, 'someMethod').and.returnValue(MOCK_OBJECT);
  page.detectChanges();

  // ...
});
```

Do this:

```typescript
// it's okay to share immutable, read-only variables
const MOCK_OBJECT = { value: 123 } as const;
// no non-immutable variables are now shared across the tests

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [MyComponent],
  }).compileComponents();
  // keep the beforeEach minimal and containing only the Angular component setup
  // do not use it to initialize variables
});

const setup = () => {
  const page = new Page(TestBed.createComponent(MyComponent));
  const myService = TestBed.inject(MyService);

  // all mutable variables needed by the tests are initizalied and returned here
  return { page, myService };
};

it('should do something', () => {
  const { page, myService } = setup();
  spyOn(myService, 'someMethod').and.returnValue(MOCK_OBJECT);
  page.detectChanges();

  // ...
});
```

The mindset is, in a nutshell, everything that is used by tests and is not immutable, should not be shared but initialized inside the `setup()` function.

This opens up the possibility of passing an optional `config` object parameter containing optional fields that different tests can reuse.

The optional `config` object can be especially useful when testing a Component with some inputs:

```typescript
const setup = (config: { param1?: string, param2?: string } = {}) => {
  const param1 = config.param1 ?? 'defaultParam1Value';
  const param2 = config.param2 ?? 'defaultParam2Value';

  const page = new Page(TestBed.createComponent(MyComponent));

  // setting the [textValue] input of MyComponent with the value of param1
  page.fixture.componentRef.setInput('textValue', param1);
  
  const myService = TestBed.inject(MyService);
 
  // setting the returned value of myservice.getText() with the value of param2
  spyOn(myService, 'getText').and.returnValue(param2);
  
  // ...
  
  return { page, myService };
}
```

Now tests can optionally use such parameters or any combination of them:

```typescript
it('should do something when called with default parameters', () => {
  const { page } = setup();
  // ...
});

it('should do something else when called with a different param1', () => {
  const { page } = setup({ param1: 'custom value' });
  // ...
});

it('should do something else when called with a different param2', () => {
  const { page } = setup({ param2: 'XX12345' });
  // ...
});

it('should behave completely different when both paramters are changed', () => {
  const { page } = setup({ param1: 'I love testing!', param2: 'XY123' });
  // ...
});
```

This approach provides full control while still making every test completely independent and maximising code reuse.
