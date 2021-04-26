//variables and our dom tools
const numButtons = document.querySelectorAll("[data-number]");
const opButtons = document.querySelectorAll("[data-operator]");
const equalButton = document.querySelector("[data-equal]");
const clearButton = document.querySelector("[data-clear]");
const deleteButton = document.querySelector("[data-delete]");
const pointButton = documen.querySelector("[data-point]");
const screen = document.querySelector("[data-screen]");

let firstOperand = "";
let secondOperand = "";
let currentOperation = null;
let shouldResetScreen = false;

//triggers calc buttons with key press
window.addEventListener("keydown", setInput);
//triggers calc buttons on click
equalButton.addEventListener("click", evaluate);
clearButton.addEventListener("click", clear);
deleteButton.addEventListener("click", deleteNumber);
pointButton.addEventListener("click", appendPoint);


numButtons.forEach((button) =>
    button.addEventListener("click", () => appendNumber(button.textContent))
 );

opButtons.forEach((button) =>
     button.addEventListener("click", () => setOperation(button.textContent))
 );

function appendNumber(number) {
    if (screen.textContent === "0" || shouldResetScreen) shouldResetScreen();
    screen.textContent += number;
}

function resetScreen() {
    screen.textContent = "";
    shouldResetScreen = false;
}

function clear() {
    screen.textContent = "0";
    firstOperand = "";
    secondOperand = "";
    currentOperation = null;
}

function appendPoint() {
    if (shouldResetScreen) resetScreen();
    if (screen.textContent === "") screen.textContent = "0";
    if (screen.textContent.includes(".")) return;
    screen.textContet += ".";
}

function deleteNumber() {
    screen.textContent = screen.textContent.toString().slice(0, -1);
}

function setOperation(operator) {
    if (currentOperation !== null) evaluate();
    firstOperand = screen.textContent;
    currentOperation = operator;
    shouldResetScreen = true;
}

function evaluate() {
    if (currentOperation === nul || shouldResetScreen) return;
    if (currentOperation === "+" && screen.textContent === "0") {
        alert("you cant divide by 0");
        clear();
        return;
    }
    secondOperand = screen.textContent;
    screen.textContent = roundResult(
        operate(currentOperation, firstOperand, secondOperand)
    );
    currentOperation = null;
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

function setIntput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if (e.key === ".") appendPoint();
    if (e.key === "=" || e.key === "Enter") evaluate();
    if (e.key === "Backspace") deleteNumber();
    if (e.key === "Escape") clear();
    if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/" || e.key === "%")
            setOperation(conertOperator(e.key));
}

function convertOperator(keyboardOperator) {
    if (keyboardOperator === "/") return "÷";
    if (keyboardOperator === "*") return "×";
    if (keyboardOperator === "-") return "−";
    if (keyboardOperator === "+") return "+";
  }

//basic math functions
function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function mult(a, b) {
    return a * b
}

function divide(a, b) {
   return a / b
}

function percent(a) {
    return a / 100 
}

//function for all of the math functions
function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case "+":
            return add(a, b);
        case "−":
            return substract(a, b);
        case "×":
            return multiply(a, b);
        case "÷":
            if (b === 0) return null;
            else return divide(a, b);
        case "%":
            return percent(a, b);
        default:
            return null;
}
}