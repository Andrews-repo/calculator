

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