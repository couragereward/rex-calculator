const display = document.getElementById("display");
const expression = document.getElementById("expression");
const buttons = document.querySelectorAll("[data-value]");

const clearButton = document.getElementById("clear");
const equalsButton = document.getElementById("equals");
const percentButton = document.getElementById("percent");
const signButton = document.getElementById("sign");
const backspaceButton = document.getElementById("backspace");
const angleModeButton = document.getElementById("angleMode");

const exactAnswer = document.getElementById("exactAnswer");
const decimalAnswer = document.getElementById("decimalAnswer");
const fractionButton = document.getElementById("fractionButton");

const historyList = document.getElementById("historyList");
const clearHistory = document.getElementById("clearHistory");

const scientificToggle = document.getElementById("scientificToggle");
const scientificPanel = document.getElementById("scientificPanel");

let input = "";
let answer = "";
let angleMode = "DEG";
let history = [];

function updateDisplay() {
    display.textContent = input || "0";
    expression.textContent = input;
}

function addValue(value) {
    input += value;
    updateDisplay();
}

function clearCalculator() {
    input = "";
    answer = "";
    display.textContent = "0";
    expression.textContent = "";
    exactAnswer.textContent = "—";
    decimalAnswer.textContent = "—";
}

function calculateFactorial(number) {
    if (number < 0 || !Number.isInteger(number)) {
        throw new Error("Invalid factorial");
    }

    let result = 1;

    for (let i = 2; i <= number; i++) {
        result *= i;
    }

    return result;
}

function toRadians(value) {
    if (angleMode === "DEG") {
        return value * Math.PI / 180;
    }

    if (angleMode === "GRAD") {
        return value * Math.PI / 200;
    }

    return value;
}

function fromRadians(value) {
    if (angleMode === "DEG") {
        return value * 180 / Math.PI;
    }

    if (angleMode === "GRAD") {
        return value * 200 / Math.PI;
    }

    return value;
}

function cleanNumber(value) {
    if (Math.abs(value) < 1e-12) {
        return 0;
    }

    return Number(value.toFixed(12));
}

function calculateFunction(name, value) {
    const number = Number(value);

    if (name === "sin") {
        return cleanNumber(Math.sin(toRadians(number)));
    }

    if (name === "cos") {
        return cleanNumber(Math.cos(toRadians(number)));
    }

    if (name === "tan") {
        return cleanNumber(Math.tan(toRadians(number)));
    }

    if (name === "cot") {
        return cleanNumber(1 / Math.tan(toRadians(number)));
    }

    if (name === "sec") {
        return cleanNumber(1 / Math.cos(toRadians(number)));
    }

    if (name === "csc") {
        return cleanNumber(1 / Math.sin(toRadians(number)));
    }

    if (name === "asin") {
        return cleanNumber(fromRadians(Math.asin(number)));
    }

    if (name === "acos") {
        return cleanNumber(fromRadians(Math.acos(number)));
    }

    if (name === "atan") {
        return cleanNumber(fromRadians(Math.atan(number)));
    }

    if (name === "sqrt") {
        return Math.sqrt(number);
    }

    if (name === "cbrt") {
        return Math.cbrt(number);
    }

    if (name === "log") {
        return Math.log10(number);
    }

    if (name === "ln") {
        return Math.log(number);
    }

    if (name === "abs") {
        return Math.abs(number);
    }

    if (name === "factorial") {
        return calculateFactorial(number);
    }

    throw new Error("Unknown function");
}

function replaceFunctions(value) {
    value = value.replace(
        /asin\(([^()]*)\)/g,
        (_, number) => calculateFunction("asin", evaluate(number))
    );

    value = value.replace(
        /acos\(([^()]*)\)/g,
        (_, number) => calculateFunction("acos", evaluate(number))
    );

    value = value.replace(
        /atan\(([^()]*)\)/g,
        (_, number) => calculateFunction("atan", evaluate(number))
    );

    value = value.replace(
        /sin\(([^()]*)\)/g,
        (_, number) => calculateFunction("sin", evaluate(number))
    );

    value = value.replace(
        /cos\(([^()]*)\)/g,
        (_, number) => calculateFunction("cos", evaluate(number))
    );

    value = value.replace(
        /tan\(([^()]*)\)/g,
        (_, number) => calculateFunction("tan", evaluate(number))
    );

    value = value.replace(
        /cot\(([^()]*)\)/g,
        (_, number) => calculateFunction("cot", evaluate(number))
    );

    value = value.replace(
        /sec\(([^()]*)\)/g,
        (_, number) => calculateFunction("sec", evaluate(number))
    );

    value = value.replace(
        /csc\(([^()]*)\)/g,
        (_, number) => calculateFunction("csc", evaluate(number))
    );

    value = value.replace(
        /sqrt\(([^()]*)\)/g,
        (_, number) => calculateFunction("sqrt", evaluate(number))
    );

    value = value.replace(
        /cbrt\(([^()]*)\)/g,
        (_, number) => calculateFunction("cbrt", evaluate(number))
    );

    value = value.replace(
        /log\(([^()]*)\)/g,
        (_, number) => calculateFunction("log", evaluate(number))
    );

    value = value.replace(
        /ln\(([^()]*)\)/g,
        (_, number) => calculateFunction("ln", evaluate(number))
    );

    value = value.replace(
        /abs\(([^()]*)\)/g,
        (_, number) => calculateFunction("abs", evaluate(number))
    );

    value = value.replace(
        /fact\(([^()]*)\)/g,
        (_, number) => calculateFunction("factorial", evaluate(number))
    );

    return value;
}

function evaluate(value) {
    if (!value) {
        return 0;
    }

    let formula = value
        .replace(/π/g, "Math.PI")
        .replace(/\be\b/g, "Math.E")
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/\^/g, "**");

    formula = replaceFunctions(formula);

    return Function(`"use strict"; return (${formula})`)();
}

function calculate() {
    if (!input) {
        return;
    }

    try {
        let result = evaluate(input);

        result = cleanNumber(result);

        answer = result;

        display.textContent = result;
        exactAnswer.textContent = exactForm(result);
        decimalAnswer.textContent = result;

        addHistory(input, result);

        input = String(result);
    } catch {
        display.textContent = "Error";
        exactAnswer.textContent = "Invalid expression";
        decimalAnswer.textContent = "—";
    }
}

function exactForm(value) {
    const special = {
        "0": "0",
        "0.5": "1/2",
        "0.25": "1/4",
        "0.333333333333": "1/3",
        "0.666666666667": "2/3",
        "1": "1",
        "1.5": "3/2",
        "2": "2",
        "3": "3",
        "3.14159265359": "π",
        "1.570796326795": "π/2",
        "0.785398163397": "π/4",
        "1.047197551197": "π/3",
        "2.094395102393": "2π/3",
        "4.712388980385": "3π/2"
    };

    const rounded = Number(value.toFixed(12));

    if (special[String(rounded)]) {
        return special[String(rounded)];
    }

    return decimalToFraction(value);
}

function decimalToFraction(value) {
    if (!Number.isFinite(value)) {
        return "—";
    }

    if (Number.isInteger(value)) {
        return String(value);
    }

    const sign = value < 0 ? "-" : "";

    value = Math.abs(value);

    let numerator = 1;
    let denominator = 1;
    let bestError = Math.abs(value - 1);

    for (let d = 1; d <= 1000; d++) {
        const n = Math.round(value * d);
        const error = Math.abs(value - n / d);

        if (error < bestError) {
            bestError = error;
            numerator = n;
            denominator = d;
        }

        if (error < 0.000000001) {
            break;
        }
    }

    const divisor = gcd(numerator, denominator);

    return `${sign}${numerator / divisor}/${denominator / divisor}`;
}

function gcd(a, b) {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }

    return Math.abs(a);
}

function addHistory(exp, result) {
    history.unshift({
        expression: exp,
        result: result
    });

    history = history.slice(0, 10);

    localStorage.setItem(
        "rexCalculatorHistory",
        JSON.stringify(history)
    );

    showHistory();
}

function showHistory() {
    historyList.innerHTML = "";

    if (history.length === 0) {
        historyList.innerHTML = "<p>No calculations yet.</p>";
        return;
    }

    history.forEach(item => {
        const box = document.createElement("div");

        box.className = "history-item";

        box.innerHTML = `
            <div class="history-expression">
                ${item.expression}
            </div>

            <div class="history-result">
                ${item.result}
            </div>
        `;

        historyList.appendChild(box);
    });
}

function loadHistory() {
    const saved = localStorage.getItem("rexCalculatorHistory");

    if (saved) {
        history = JSON.parse(saved);
        showHistory();
    }
}

function insertFunction(name) {
    input += `${name}(`;
    updateDisplay();
}

function insertPower(power) {
    if (power === "y") {
        input += "^";
    } else {
        input += `^${power}`;
    }

    updateDisplay();
}

function toggleSign() {
    if (!input) {
        input = "-";
    } else {
        input = `(-1)*(${input})`;
    }

    updateDisplay();
}

function percent() {
    if (!input) {
        return;
    }

    try {
        input = String(cleanNumber(evaluate(input) / 100));
        updateDisplay();
    } catch {
        display.textContent = "Error";
    }
}

function backspace() {
    input = input.slice(0, -1);
    updateDisplay();
}

function changeAngleMode() {
    if (angleMode === "DEG") {
        angleMode = "RAD";
    } else if (angleMode === "RAD") {
        angleMode = "GRAD";
    } else {
        angleMode = "DEG";
    }

    angleModeButton.textContent = angleMode;
}

function addConstant(value) {
    addValue(value);
}

function showScientific() {
    scientificPanel.classList.toggle("show");

    if (scientificPanel.classList.contains("show")) {
        scientificToggle.textContent = "SCI ▲";
    } else {
        scientificToggle.textContent = "SCI ▼";
    }
}

function fractionResult() {
    if (answer === "") {
        return;
    }

    exactAnswer.textContent = decimalToFraction(Number(answer));
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        addValue(button.dataset.value);
    });
});

document.querySelectorAll("[data-function]").forEach(button => {
    button.addEventListener("click", () => {
        insertFunction(button.dataset.function);
    });
});

document.querySelectorAll("[data-power]").forEach(button => {
    button.addEventListener("click", () => {
        insertPower(button.dataset.power);
    });
});

document.querySelectorAll("[data-constant]").forEach(button => {
    button.addEventListener("click", () => {
        if (button.dataset.constant === "pi") {
            addConstant("π");
        }

        if (button.dataset.constant === "e") {
            addConstant("e");
        }
    });
});

clearButton.addEventListener("click", clearCalculator);
equalsButton.addEventListener("click", calculate);
percentButton.addEventListener("click", percent);
signButton.addEventListener("click", toggleSign);
backspaceButton.addEventListener("click", backspace);
angleModeButton.addEventListener("click", changeAngleMode);
fractionButton.addEventListener("click", fractionResult);
scientificToggle.addEventListener("click", showScientific);

clearHistory.addEventListener("click", () => {
    history = [];
    localStorage.removeItem("rexCalculatorHistory");
    showHistory();
});

document.addEventListener("keydown", event => {
    const key = event.key;

    if (/^[0-9.]$/.test(key)) {
        addValue(key);
    }

    if (["+", "-", "*", "/", "(", ")", "^"].includes(key)) {
        addValue(key);
    }

    if (key === "Enter" || key === "=") {
        calculate();
    }

    if (key === "Escape") {
        clearCalculator();
    }

    if (key === "Backspace") {
        backspace();
    }

    if (key === "%") {
        percent();
    }
});

loadHistory();