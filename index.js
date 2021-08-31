class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand;
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsBtn = document.querySelector("[data-equals]");
const allClear = document.querySelector("[data-all-clear]");
const deleteBtn = document.querySelector("[data-delete]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand ]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand ]"
);
console.log(previousOperandTextElement);

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);
//console.log(calculator);
numberButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});
//operation buttons
operationButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    //console.log("object");
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

//equals button
equalsBtn.addEventListener("click", function (button) {
  calculator.compute();
  calculator.updateDisplay();
});
//all clear
allClear.addEventListener("click", function () {
  calculator.clear();
  calculator.updateDisplay();
});
//delete
deleteBtn.addEventListener("click", function () {
  calculator.delete();
  calculator.updateDisplay();
});
