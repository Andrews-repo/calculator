//variables and dom tools
const numButtons = document.querySelectorAll("[data-number]");
const opButtons = document.querySelectorAll("[data-operator]");
const equalButton = document.querySelector("[data-equal]");
const clearButton = document.querySelector("[data-clear]");
const deleteButton = document.querySelector("[data-delete]");
const pointButton = document.querySelector("[data-point]");
const percentButton = document.querySelector("[data-percent]");
const polarityButton = document.querySelector("[data-polarity]");
const screen = document.querySelector("[data-screen]");

let firstOperand = "";
let secondOperand = "";
let currentOperation = null;
let shouldResetScreen = false;

//triggers calc buttons on click
equalButton.addEventListener("click", evaluate);
clearButton.addEventListener("click", clear);
deleteButton.addEventListener("click", deleteNumber);
pointButton.addEventListener("click", appendPoint);
polarityButton.addEventListener("click", appendPolarity);

numButtons.forEach((button) =>
    button.addEventListener("click", () => appendNumber(button.textContent))
 );

opButtons.forEach((button) =>
     button.addEventListener("click", () => setOperation(button.textContent))
 );

percentButton.addEventListener("click", () => percButton()
 );

//calculates percentage of screen on button click
function percButton() {
    setOperation(percentButton.textContent);
    screen.textContent = operate(currentOperation, firstOperand)
    shouldResetScreen = false;
    currentOperation = null;
};
//adds typed number to screen
function appendNumber(number) {
    if (screen.textContent === "0" || shouldResetScreen) resetScreen();
    screen.textContent += number;
}
//
function resetScreen() {
    screen.textContent = "";
    shouldResetScreen = false;
}
//sets screen to 0
function clear() {
    screen.textContent = "0";
    firstOperand = "";
    secondOperand = "";
    currentOperation = null;
}
//changes number from positive to negative
function appendPolarity() {
    if (shouldResetScreen) resetScreen();
    if (screen.textContent === "") return;
    screen.textContent = -1 * screen.textContent;
}
//adds decimal to number
function appendPoint() {
    if (shouldResetScreen) resetScreen();
    if (screen.textContent === "") screen.textContent = "0";
    if (screen.textContent.includes(".")) return;
    screen.textContent += ".";
}
//removes number at end of sting on screen
function deleteNumber() {
    screen.textContent = screen.textContent.toString().slice(0, -1);
}

//declares math operation
function setOperation(operator) {
    if (currentOperation !== null) evaluate();
    firstOperand = screen.textContent;
    currentOperation = operator;
    shouldResetScreen = true;
}

//runs math equation
function evaluate() {
    if (currentOperation === null || shouldResetScreen) return;
    if (currentOperation === "/" && screen.textContent === "0") {
        alert("you cant divide by 0");
        clear();
        return;
    }
    secondOperand = screen.textContent;
    screen.textContent = operate(currentOperation, firstOperand, secondOperand)
    currentOperation = null;
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

//switch function for all of the math functions
function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return mult(a, b);
        case "÷":
            if (b === 0) return null;
            else return divide(a, b);
        case "%":
            return percent(a);
        default:
            return null;
}
}