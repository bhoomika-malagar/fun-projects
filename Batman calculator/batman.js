const display = document.getElementById("display-text");
const buttons = document.querySelectorAll("button");

let currentInput = "";
let lastAnswer = "";

// Operators list
const operators = ["+", "-", "×", "/", "%"];

function updateDisplay(value) {
    display.innerText = value || "0";
}

function calculate() {
    try {
        let expression = currentInput.replace(/×/g, "*");
        let result = eval(expression);

// Round to 4 decimal places
result = parseFloat(result.toFixed(4));

lastAnswer = result;
currentInput = result.toString();
updateDisplay(currentInput);


        if (result === undefined) return;

        lastAnswer = result;
        currentInput = result.toString();
        updateDisplay(currentInput);
    } catch {
        updateDisplay("Error");
        currentInput = "";
    }
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.innerText;

        // CLEAR
        if (value === "C") {
            currentInput = "";
            updateDisplay("0");
        }

        // BACKSPACE
        else if (value === "⌫") {
            currentInput = currentInput.slice(0, -1);
            updateDisplay(currentInput);
        }

        // ANS
        else if (value === "ans") {

    if (currentInput !== "") {
        calculate();
    }

    if (lastAnswer !== "") {
        currentInput = lastAnswer.toString();
        updateDisplay(currentInput);
    }
}


        // DECIMAL
        else if (value === ".") {
            let parts = currentInput.split(/[\+\-\×\/%]/);
            let lastPart = parts[parts.length - 1];

            if (!lastPart.includes(".")) {
                currentInput += ".";
                updateDisplay(currentInput);
            }
        }

        // OPERATORS
        else if (operators.includes(value)) {
            let lastChar = currentInput.slice(-1);

            if (operators.includes(lastChar)) return; // prevent ++

            if (currentInput === "") return; // prevent starting with operator

            currentInput += value;
            updateDisplay(currentInput);
        }

        // NUMBERS
        else {
            currentInput += value;
            updateDisplay(currentInput);
        }
    });
});
