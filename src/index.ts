import "./styles.css";

const onElementKeepTapped = (
  element: HTMLElement,
  func: (event: any) => any
) => {
  let idTimer;
  let isKeeped;

  const onKeeped = (event) => {
    func.bind(this)(event);
    idTimer = setTimeout(() => onKeeped(event), 120);
  };

  element.ontouchstart = (event) => {
    isKeeped = true;
    idTimer = setTimeout(() => onKeeped(event), 300);
  };
  element.onmousedown = (event) => {
    isKeeped = true;
    idTimer = setTimeout(() => onKeeped(event), 300);
  };
  element.onmouseup = () => {
    isKeeped = false;
    clearTimeout(idTimer);
  };
  element.onmouseout = () => {
    isKeeped = false;
    clearTimeout(idTimer);
  };
  element.ontouchcancel = () => {
    isKeeped = false;
    clearTimeout(idTimer);
  };
  element.ontouchend = () => {
    isKeeped = false;
    clearTimeout(idTimer);
  };
  element.ondragend = () => {
    isKeeped = false;
    clearTimeout(idTimer);
  };
};

enum KeyName {
  plus = "plus",
  minus = "minus",
  divide = "divide",
  delete = "delete",
  multiply = "multiply",
  equal = "equal",
  dot = "dot",
  zero = "0",
  one = "1",
  two = "2",
  three = "3",
  four = "4",
  five = "5",
  six = "6",
  seven = "7",
  eight = "8",
  nine = "9",
}

const keys = {
  [KeyName.plus]: {
    value: KeyName.plus,
    htmlElement: "+",
    mathElement: "+",
  },
  [KeyName.minus]: {
    value: KeyName.minus,
    htmlElement: "-",
    mathElement: "-",
  },
  [KeyName.equal]: {
    value: KeyName.equal,
    htmlElement: "=",
    mathElement: "=",
  },
  [KeyName.multiply]: {
    value: KeyName.multiply,
    htmlElement: "*",
    mathElement: "*",
  },
  [KeyName.divide]: {
    value: KeyName.divide,
    htmlElement: "/",
    mathElement: "/",
  },
  [KeyName.delete]: {
    value: KeyName.delete,
    htmlElement: "DEL",
    mathElement: "DEL",
  },
  [KeyName.dot]: {
    value: KeyName.dot,
    htmlElement: ".",
    mathElement: ".",
  },
  [KeyName.zero]: {
    value: KeyName.zero,
    htmlElement: "0",
    mathElement: "0",
  },
  [KeyName.one]: {
    value: KeyName.one,
    htmlElement: "1",
    mathElement: "1",
  },
  [KeyName.two]: {
    value: KeyName.two,
    htmlElement: "2",
    mathElement: "2",
  },
  [KeyName.three]: {
    value: KeyName.three,
    htmlElement: "3",
    mathElement: "3",
  },
  [KeyName.four]: {
    value: KeyName.four,
    htmlElement: "4",
    mathElement: "4",
  },
  [KeyName.five]: {
    value: KeyName.five,
    htmlElement: "5",
    mathElement: "5",
  },
  [KeyName.six]: {
    value: KeyName.six,
    htmlElement: "6",
    mathElement: "6",
  },
  [KeyName.seven]: {
    value: KeyName.seven,
    htmlElement: "7",
    mathElement: "7",
  },
  [KeyName.eight]: {
    value: KeyName.eight,
    htmlElement: "8",
    mathElement: "8",
  },
  [KeyName.nine]: {
    value: KeyName.nine,
    htmlElement: "9",
    mathElement: "9",
  },
};

type OnUpdateParams = {
  originalExpression: string[];
  processedExpression: string[];
};

export class KeyboardCalculator {
  stack: string[] = ["0"];
  operations: string[] = [
    KeyName.plus,
    KeyName.minus,
    KeyName.divide,
    KeyName.multiply,
  ];
  onUpdate: (params: OnUpdateParams) => any = () => {};

  actions = {
    [KeyName.delete]: () => {
      const target = this._getTarget();

      if (this._isOperation(target as KeyName)) {
        this.stack.pop();
      } else {
        if (
          target.length === 1 ||
          (target.length === 2 && target.startsWith("-")) ||
          +target === Infinity ||
          +target === -Infinity ||
          isNaN(+target)
        ) {
          if (this.stack.length > 1) {
            return this.stack.pop();
          }

          this.stack[0] = "0";
        } else {
          this.stack[this.stack.length - 1] = target.slice(
            0,
            target.length - 1
          );
        }
      }
    },
    [KeyName.equal]: () => {
      if (this.stack.length === 1) {
        return;
      }

      try {
        const expression = this._processExpression(this.stack).join("");
        const result = Number(eval(expression));

        if (!isNaN(result) && result !== Infinity && result !== -Infinity) {
          this.stack = [String(Number(Number(result).toFixed(4)))];
        }
      } catch {}
    },
    [KeyName.dot]: () => {
      const target = this._getTarget();

      if (this._isOperation(target as KeyName)) {
        return;
      } else if (
        !String(this.stack[this.stack.length - 1]).includes(
          keys[KeyName.dot].mathElement
        )
      ) {
        this.stack[this.stack.length - 1] =
          String(this.stack[this.stack.length - 1]) +
          String(keys[KeyName.dot].mathElement);
      }
    },
    operation: (key: KeyName) => {
      const target = this._getTarget();

      if (this._isOperation(target as KeyName)) {
        this.stack[this.stack.length - 1] = key;
      } else {
        this.stack[this.stack.length - 1] = String(
          Number(String(this.stack[this.stack.length - 1]))
        );
        this.stack.push(key);
      }
    },
    num: (num: string) => {
      const target = this._getTarget();

      if (this._isOperation(target as KeyName)) {
        this.stack.push(num);
      } else {
        if (
          String(this.stack[this.stack.length - 1]).includes(
            keys[KeyName.dot].mathElement
          )
        ) {
          this.stack[this.stack.length - 1] =
            String(this.stack[this.stack.length - 1]) + String(num);
          return;
        }

        this.stack[this.stack.length - 1] = String(
          Number(String(this.stack[this.stack.length - 1]) + String(num))
        );
      }
    },
  };

  _getTarget = () => {
    return this.stack[this.stack.length - 1];
  };

  _isOperation = (key: KeyName) => {
    return this.operations.includes(key);
  };

  _processExpression = (expression: any[]) => {
    return expression.map((el) => {
      if (this._isOperation(el)) {
        return keys[el].mathElement;
      } else {
        return el;
      }
    });
  };

  destroy = () => {
    const element = document.getElementById("awesome-calculator");
    if (element) {
      element.remove();
    }
  };

  clearValue = () => {
    this.stack = ["0"];
  };

  getCurrentCountedValue = () => {
    try {
      const expression = this._processExpression(this.stack).join("");
      const result = Number(eval(expression));

      if (!isNaN(result) && result !== Infinity && result !== -Infinity) {
        return Number(Number(result).toFixed(4));
      }
    } catch {}
  };

  isExpressionValid = () => {
    try {
      const expression = this._processExpression(this.stack).join("");
      const result = Number(eval(expression));

      return !isNaN(result) && result !== Infinity && result !== -Infinity;
    } catch {
      return false;
    }
  };

  constructor(element) {
    element.innerHTML = `
      <div id='awesome-calculator' class="awesome-calculator-container">
        ${Object.values(keys).reduce((prev, cur, index) => {
      const key = `<div class="key key-${cur.value}" id="awesome-calculator-key-${cur.value}">
              <div>
                ${cur.htmlElement}
              </div>
            </div>`;
      return prev + key;
    }, "")}
      </div>
    `;

    const awesomeCalc = document.getElementById("awesome-calculator");

    awesomeCalc.onclick = (event) => {
      if (
        !(event.target as HTMLElement).id.includes("awesome-calculator-key-")
      ) {
        return;
      }

      const key: string = (event.target as HTMLElement).id.replace(
        "awesome-calculator-key-",
        ""
      );

      if (this.actions[key]) {
        this.actions[key]();
      } else if (this._isOperation(key as KeyName)) {
        this.actions["operation"](key as KeyName);
      } else {
        this.actions["num"](key);
      }

      if (this.onUpdate) {
        this.onUpdate({
          originalExpression: this.stack,
          processedExpression: this._processExpression(this.stack),
        });
      }
    };

    onElementKeepTapped(awesomeCalc, (event) => {
      if (
        !(event.target as HTMLElement).id.includes("awesome-calculator-key-")
      ) {
        return;
      }

      const key: string = (event.target as HTMLElement).id.replace(
        "awesome-calculator-key-",
        ""
      );

      if (!key) {
        return;
      }

      if (this.actions[key]) {
        this.actions[key]();
      } else if (this._isOperation(key as KeyName)) {
        this.actions["operation"](key as KeyName);
      } else {
        this.actions["num"](key);
      }

      if (this.onUpdate) {
        this.onUpdate({
          originalExpression: this.stack,
          processedExpression: this._processExpression(this.stack),
        });
      }
    });
  }
}