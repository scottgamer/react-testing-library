# React Testing Library

## RTL vs Jest

### RTL

- [Docs](https://testing-library.com/docs/)
- provides virtual DOM for tests
- renders components into virtual DOM
- searches virtual DOM
- interacts with virtual DOM

### Jest

- test runner
- finds tests
- runs tests
- determines whether tests pass or fail

## The render method

- create virtual DOM for argument JSX
- access virtual DOM via screen global

```javascript
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

## Assertions

`expect(linkElement).toBeInTheDocument();'

- expect
  - jest global, starts the assertion
- expect argument
  - subject of the assertion
- matcher
  - comes form Jest-DOM
- marcher argument

  - refines matcher

- another examples

```javascript
expect(element.textContent).toBe("hello");
expect(elementsArray).toHaveLength(7);
```

## Events

- Read the [docs](https://testing-library.com/docs/dom-testing-library/api-events/) for events using `dom-testing-library`
- In most cases, it's recommended to use the [user-event](https://testing-library.com/docs/ecosystem-user-event) which provides advanced simulation of browser interactions than the built-in `fireEvent` method

```bash
npm install --save-dev @testing-library/user-event @testing-library/dom
```

```javascript
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

test("types inside textarea", () => {
  document.body.innerHTML = `<textarea />`;

  userEvent.type(screen.getByRole("textbox"), "Hello, World!");
  expect(screen.getByRole("textbox")).toHaveValue("Hello, World!");
});
```

## Mock Service Worker

- [Docs](https://mswjs.io/docs/getting-started)
- Purpose:
  - intercept network calls
  - return specified responses
- Prevent network calls during tests
- Set up test conditions using server responses

### Setup

- `npm i msw`
- create handlers
- create test server
- make sure test server listens during all tests
  - reset after each test

```javascript
res.get("http://localhosT:3030/acoops", (req, res, ctx) => {});
```

- handler type: rest or graphql
- http method to mock: get, post, etc
- full url to mock
- response resolver function
  - req: request object
  - res: function to create response
  - ctx: utility to build response

### Jest-DOM

- comes with cra
- `src/setup/Tests.js` imports it before each test, makes matchers available
- DOM-based matchers
  - `toBeVisible()` or `toBeChecked`
- more on matchers [Docs](https://github.com/testing-library/jest-dom)

### Query Methods

`command[All]ByQueryType`

command:

- get: expect element to be in the DOM
- query: expect element not to be in the DOM
- find: expect element to appear async

- when expecting async updates use:
  - `await findAllByRole`
- there are some cases when multiple components are mounted aynchronously, in this case, `await findAllBy` isn't enough
- it's necessary to wrap the query in the `waitFor` statement

```javascript
await waitFor(async () => {
  const alerts = await screen.findAllByRole("alert");

  expect(alerts).toHaveLength(2);
});
```

[All]:

- (exclude): expect only one match
- (include): expect more than one match

QueryType:

- Role: most preferred
- AltText: (images)
- Text: (display elements)
- Form elements:

  - PlaceholderText
  - LabelText
  - DisplayValue

- more on [Queries](https://testing-library.com/docs/queries/about/)

## TDD (Test-Drive Development)

- write tests before writing code
  - then write code according to "spec" set set by tests
- "red-green" testing
  - tests fail before code is written
- makes a huge difference in how it feels to write tests
  - part of the coding process, not a "chore" to do at the end
- more efficient
  - re-run tests "for free" after changes

## Types of Tests

- unit tests
  - tests one unit of code in isolation
- integration tests
  - how multiple units work together
- functional tests
  - tests a particular function of software
- acceptance / e2e test
  - use actual browser and server(Cypress/Selenium)

## Functional Testing vs Unit Testing

### Functional Testing

- different mindset from unit testing
- include all relevant units, test behavior
- close to how users interact with software
- robust tests
- more difficult to debug failing tests

### Unit Testing

- isolated: mock dependencies, test internals
- easy to pinpoint failures
- further from how users interact with software
- more likely to break with refactoring
- for more complicated functions, unit tests help with:
  - covering all possible edge cases
  - determining what caused functional tests to fail
- issues with functional tests:
  - high-level makes them resistant to refactors
  - high-level makes them difficult to diagnose

## TDD vs BDD

- BDD: Behavior-Driven Development
- Testing Library encourages behavior over implementation

## Accessibility and Finding Elements

- RTL recommends finding elements by accessibility handles
- [About Queries](https://testing-library.com/docs/queries/about/#priority)
- it's preferable to use the `getByRole` query since it's more accessible-friendly
- [W3C role definitions](https://www.w3.org/TR/wai-aria/#role_definitions)
  - a role can be added to an element via the `role` attribute
  - some elements already have built-in roles: `button, a`
- If you can't find an element like a screen reader would,
  - then your app isn't friendly to screen readers

## Unit Testing Functions

- Functions separate from components
  - used by several components
  - complex logic
- unit test if
  - complex logic difficult to test via functional tests
  - too many edge cases

## Formatting and Linting with Jest-DOM

To manage formatting and linting use eslint with prettier

```bash
npm i eslint-plugin-testing-library eslint-plugin-jest-dom
```

Once installed, create a `.eslintrc.json` file to set the configuration:

```json
{
  "plugins": ["testing-library", "jest-dom"],
  "extends": [
    "react-app",
    "react-app/jest",
    "plugin:testing-library/recommended",
    "plugin:testing:library/react",
    "plugin:jest-dom/recommended"
  ]
}
```
