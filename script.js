document.addEventListener("DOMContentLoaded", function () {
    const display = document.querySelector(".display p");
    const buttons = document.querySelectorAll(".pad button");

    let currentInput = "";
    let previousInput = "";
    let operator = "";

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const buttonText = button.textContent;

            if (buttonText === "CL") {
                clearDisplay();
            } else if (buttonText === "DEL") {
                deleteLastInput();
            } else if (isOperator(buttonText)) {
                handleOperator(buttonText);
            } else if (buttonText === "=") {
                calculate();
            } else {
                addToDisplay(buttonText);
            }
        });
    });

    function addToDisplay(value) {
        currentInput += value;
        display.textContent = currentInput;
    }

    function clearDisplay() {
        currentInput = "";
        previousInput = "";
        operator = "";
        display.textContent = "0";
    }

    function deleteLastInput() {
        currentInput = currentInput.slice(0, -1);
        display.textContent = currentInput || "0";
    }

    function handleOperator(op) {
        if (currentInput !== "") {
            if (previousInput !== "") {
                calculate();
            } else {
                previousInput = currentInput;
                currentInput = "";
            }
            operator = op;
        }
    }

    function calculate() {
        if (previousInput && currentInput && operator) {
            const result = evaluateExpression(previousInput, operator, currentInput);
            display.textContent = result;
            previousInput = result;
            currentInput = "";
            operator = "";
        }
    }

    function evaluateExpression(num1, op, num2) {
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);

        switch (op) {
            case "+":
                return num1 + num2;
            case "-":
                return num1 - num2;
            case "*":
                return num1 * num2;
            case "/":
                return num1 / num2;
            default:
                return "Error";
        }
    }

    function isOperator(value) {
        return value === "+" || value === "-" || value === "*" || value === "/";
    }
});
