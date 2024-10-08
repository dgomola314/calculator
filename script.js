const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".number");
const decimal = document.querySelector(".decimal");
const operators = document.querySelectorAll(".operator");
const clearButton = document.querySelector(".clear-button");
const equalButton = document.querySelector(".equal-button");

let currentInput = "";
let previousInput = "";
let operatorSign = "";

const output = () => {
    display.textContent = currentInput;
};

numbers.forEach(number => {
    number.addEventListener("click", () => {
        currentInput += number.textContent;
        output();
    });
});

decimal.addEventListener("click", () => {
    // Prevent multiple decimals
    if (!currentInput.includes(".")) {
        currentInput += ".";
        output();
    }
});

operators.forEach(operator => {
    operator.addEventListener("click", () => {
        // It ignores any operator when there's no input
        if (currentInput === "") {
            return;
        }

        if (currentInput !== "") {
            operate();
        }

        operatorSign = operator.textContent;
        previousInput = currentInput;
        currentInput = "";
    });
});

// Calculate two numbers
const operate = () => {
    let result;
    const prev = Number(previousInput);
    const current = Number(currentInput);

    switch (operatorSign) {
        case "+":
            result = prev + current;
            break;
        case "−":
            result = prev - current;
            break;
        case "×":
            result = prev * current;
            break
        case "÷":
            if (current === 0) {
                // Handling division by zero
                display.textContent = "Cannot divide by zero!";
                return;
            } else {
                result = prev / current;
                break;
            }
        default:
            return;
    }

    currentInput = +result.toFixed(2); // Round result to 2 decimal places and remove extra zeros by using unary operator
    operatorSign = "";
    previousInput = "";
    output();
};

clearButton.addEventListener("click", () => {
    currentInput = "";
    previousInput = "";
    operatorSign = "";
    output();
});

equalButton.addEventListener("click", operate);