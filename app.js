const numberBtn = document.querySelectorAll("[data-number]");
const previousDisplay = document.querySelector("[data-calc-previous]");
const currentDisplay = document.querySelector("[data-calc-current]");
const operant = document.querySelectorAll("[data-operant]");
const negation = document.querySelector("[data-negation]");
const percentage = document.querySelector("[data-percent]");
const del = document.querySelector("[data-delete]");
const clear = document.querySelector("[data-clear]");
const equal = document.querySelector("[data-equal]");

let currentValue = "";
let mathSign = undefined;
let previousValue = "";
let solution = "";

const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;

function getCurrentNumber(number) {
  if (number === "." && currentValue.includes(".")) return;
  currentValue = currentValue.toString() + number.toString();
}

function getOperation(sign) {
  if (currentValue === "") return;
  if (previousValue != "") {
    operate();
  }
  mathSign = sign;
  appendPreviousDisplay();
}

function appendCurrentDisplay(currentValue) {
  currentDisplay.textContent = currentValue;
}

function appendPreviousDisplay() {
  previousDisplay.textContent = `${currentValue} ${mathSign}`;
  previousValue = currentValue;
  currentValue = "";
  currentDisplay.textContent = "";
}

function operate() {
  if (currentValue === "" || previousValue === "") return;
  currentValue = parseFloat(currentValue);
  previousValue = parseFloat(previousValue);
  switch (mathSign) {
    case "+":
      solution = add(previousValue, currentValue);
      break;
    case "-":
      solution = subtract(previousValue, currentValue);
      break;
    case "*":
      solution = multiply(previousValue, currentValue);
      break;
    case "÷":
      if (currentValue === 0) {
        solution = "Nice try";
      } else {
        solution = divide(previousValue, currentValue);
      }

      break;
    default:
      return;
  }
  if (solution.toString().includes(".")) {
    solution = solution.toFixed(4);
  }
  currentValue = solution;
  appendCurrentDisplay(currentValue);
  previousDisplay.textContent = "";
  mathSign = undefined;
}

function clearCalc() {
  currentValue = "";
  mathSign = undefined;
  previousValue = "";
  solution = "";
  currentDisplay.textContent = "";
  previousDisplay.textContent = "";
}

function delNumbers() {
  currentValue = currentValue.toString().slice(0, -1);
  appendCurrentDisplay(currentValue);
}

function negateNum() {
  if (currentValue > 0) {
    currentValue = 0 - currentValue;
  } else {
    currentValue = currentValue * -1;
  }
  appendCurrentDisplay(currentValue);
}

function percentNum() {
  currentValue = currentValue / 100;
  appendCurrentDisplay(currentValue);
}

numberBtn.forEach((button) => {
  button.addEventListener("click", () => {
    let number = button.dataset.number;
    getCurrentNumber(number);
    appendCurrentDisplay(currentValue);
  });
});

operant.forEach((button) => {
  button.addEventListener("click", () => {
    sign = button.dataset.operant;
    getOperation(sign);
  });
});

clear.addEventListener("click", () => {
  clearCalc();
});

del.addEventListener("click", () => {
  delNumbers();
});

equal.addEventListener("click", () => {
  operate();
});

negation.addEventListener("click", () => {
  negateNum();
});

percentage.addEventListener("click", () => {
  percentNum();
});
