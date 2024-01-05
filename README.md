# Calculator Keyboard

## About
Calculator keyboard component build 
on clear ts and css. Can be usefull 
for number inputs, where users can 
count some staff.

## Install
```bash
npm i calculator-keyboard
```

## Idea 
Use calculator for numeric inputs where user
can count some staff

## API

```typescript
/**
 * Params for onUpdate function
 */
type OnUpdateParams = {
  originalExpression: string[];
  processedExpression: string[];
};

/**
 * Represents a virtual keyboard calculator for basic arithmetic operations.
 */
class KeyboardCalculator {
  /**
   * The internal stack that holds the expression elements.
   */
  stack: string[] = ["0"];

  /**
   * Creates a new instance of the KeyboardCalculator class.
   * @param element - The HTML element to which the calculator will be attached.
   */
  constructor(element: HTMLElement);

  /**
   * A callback function triggered whenever the calculator's state is updated.
   * @param params - An object with the original and processed expressions.
   */
  onUpdate: (params: OnUpdateParams) => any = () => {};

  /**
   * Removes the calculator from the DOM.
   */
  destroy(): void;

  /**
   * Resets the calculator's internal stack to its initial state.
   */
  clearValue(): void;

  /**
   * Returns the current result of the evaluated expression with a precision of four decimal places.
   * Returns undefined if the expression is invalid.
   */
  getCurrentCountedValue(): number | undefined;

  /**
   * Checks if the current expression is valid and can be evaluated.
   */
  isExpressionValid(): boolean;
  // ... (private methods)
}
```

## Can by styled by redefining css vars and change styles for elements below

### CSS vars
```css
:root {
  --awesome-calculator-height: 14em;
  --awesome-calculator-hover-background: rgba(128, 128, 128, 0.4);
  --awesome-calculator-hover-border: solid 1px rgba(128, 128, 128, 0.6);
  --awesome-calculator-active-bg: rgba(128, 128, 128, 0.8);
  --awesome-calculator-border-radius: 5px;
  --awesome-calculator-key-color: black;
  --awesome-calculator-key-bg: rgba(128, 128, 128, 0.2);
  --awesome-calculator-gap: 2px;
}
```
### HTML elements structure
```html
// "key" is numbers from 0 to 9, "dot", "divide", "multiply", "plus", "minus", "equal"
<div id='awesome-calculator' class="awesome-calculator-container">
    <div class="key key-${key}" id="awesome-calculator-key-${keyValue}">
        <div>
            ${key}
        </div>
    </div>
</div>
```

## Example in codesandbox
[Example on vue in codesandbox](https://codesandbox.io/p/devbox/vue-calc-gwgwg2?file=%2Fsrc%2Fcomponents%2FCalculatorModal.vue%3A48%2C34)
<p align="start">
  <img src="https://github.com/fede4ka1245/keyboard-calculator/blob/main/docs/demo.png" height="394px" width="276px" />
</p>

## Inspired by keyboard in Tinkoff bank application
<p align="start">
  <img src="https://github.com/fede4ka1245/keyboard-calculator/blob/main/docs/calc.png" height="426px" width="315px" />
</p>