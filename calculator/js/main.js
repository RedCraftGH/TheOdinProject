let termOneComplete = false;
let termOne = "0";
let termTwo = "";
let currentOperation = false;
let displayWidth = document.querySelector(".display").clientWidth;
let expectOperator = false;

let lastOp = {

    operator: null,
    term: null
}

const numberIds = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 3.14, 2.71828, 50
];

const operatorIds = [
    10, 11, 12, 13
]

const commandIds = [
    -1, -2, -3, -4, -5, -6, -7, -8
]

function sendInput(buttonId) {

    if (numberIds.includes(buttonId)) {

        handleNumber(buttonId);
    } else if (operatorIds.includes(buttonId)) {

        handleOperator(buttonId);
    } else {

        handleCommand(buttonId);
    }
}

function handleNumber(number) {

    if (expectOperator) {

        clearCalc();

    }

    if (number === 50) number = ".";
    
    if (!termOneComplete) {

        if (checkOverflow()) {

            handleOverflow();
            return;
        }

        if (termOne !== "0" && (number === 3.14 || number === 2.71828)) return;

        if (termOne.includes(".") && number === ".") return;

        termOne = (termOne == "0") ? number.toString() : termOne.toString() + number;
        
        updateDisplay(termOne);
    } else {

        if (checkOverflow()) {

            handleOverflow();
            return;
        }

        if (termTwo !== "" && (number === 3.14 || number === 2.71828)) return;

        if (termTwo.includes(".") && number === ".") return;

        termTwo = termTwo.toString() + number;
        updateDisplay(termTwo);
    }
}

function handleOperator(operator) {

    if (termOne === "") {

        handleInvalidOperation();
        return;
    }

    if (!termOneComplete) {

        termOneComplete = true;
        updateDisplay("");
        currentOperation = operator;
    } else if (termTwo === "") {
        
        currentOperation = operator;
        updateDisplay("");
    } else {

        findAnswer();
        currentOperation = operator;
    }
    expectOperator = false;
}

function handleCommand(command) {

    switch (command) {

        case -1:
            clearCalc();
            break;
        case -2:
            sqrt();
            break;
        case -3:
            toggleNegPos();
            break;
        case -4:
            deleteCharacter();
            break;
        case -5:
            square();
            break;
        case -6:
            turnOff();
            break;
        case -7:
            convertPercent();
            break;
        case -8:
            findAnswer();
            break;
    }
}

function handleOverflow() {
    
    updateDisplay("Overflow Error!");

    let screenTimer = setInterval(() => {

        clearCalc();
        clearInterval(screenTimer);
    }, 1000);

}

function handleInvalidOperation() {

    updateDisplay("Invalid Operation");

    let screenTimer = setInterval(() => {

        clearCalc();
        clearInterval(screenTimer);
    }, 1000);
}

function updateDisplay(text = "0") {

    let display = document.querySelector(".display p");
    display.innerHTML = text;
}

function checkOverflow() {

    let display = document.querySelector(".display p");

    if (display.clientWidth > displayWidth - (4 * 16)) {

        return true;
    }
}

function clearCalc() {

    updateDisplay();
    termOne = "0";
    termTwo = "";
    termOneComplete = false;
    currentOperation = false;
    expectOperator = false;
    lastOp.operator = null;
    lastOp.term = null;
}

function sqrt() {

    if (termOneComplete) {

        if (termTwo !== "") {

           termTwo =  Math.sqrt(parseFloat(termTwo)).toString();

           termTwo = fixDecimalLength(termTwo);

           updateDisplay(termTwo);
        }
    } else {

        termOne = Math.sqrt(parseFloat(termOne)).toString();

        termOne = fixDecimalLength(termOne);

        updateDisplay(termOne);
    }
}

function toggleNegPos() {

    if (termOneComplete) {

        if (termTwo !== "") {

            termTwo = (termTwo.includes("-")) ? termTwo.slice(1) : "-" + termTwo;

            updateDisplay(termTwo);
        }
    } else {

        termOne = (termOne.includes("-")) ? termOne.slice(1) : "-" + termOne;

        updateDisplay(termOne);
    }
}

function deleteCharacter() {

    if (termOneComplete) {

        if (termTwo === "") {

            termOneComplete = false;
            updateDisplay(termOne);
        } else {

            termTwo = termTwo.slice(0, -1);
            updateDisplay(termTwo);
        }
    } else {

        if (termOne !== "0") {

            termOneLength = termOne.length;

            if (termOne.length === 1) {

                termOne = "0";
                updateDisplay();
                return;
            }

            termOne = termOne.slice(0, -1);

            updateDisplay(termOne);
        }
    }
}

function square() {

    if (termOneComplete) {

        if (termTwo !== "") {

            termTwo = Math.pow(parseFloat(termTwo), 2).toString();

            termTwo = fixDecimalLength(termTwo);

            updateDisplay(termTwo);
        }
    } else {

        termOne = Math.pow(parseFloat(termOne), 2).toString();

        termOne = fixDecimalLength(termOne);

        updateDisplay(termOne);
    }

    if (checkOverflow()) {

        handleOverflow();
    }
}

function turnOff() {

    if (termOne !== "") {

        clearCalc();
        termOne = "";
    } else {

        clearCalc();
        termOne = "0"
    }

    updateDisplay(termOne);
}

function convertPercent() {

    if (termOneComplete) {

        if (termTwo !== "") {

            termTwo = (parseFloat(termTwo) / 100).toString();

            termTwo = fixDecimalLength(termTwo);

            updateDisplay(termTwo);
        }
    } else {

        termOne = (parseFloat(termOne) / 100).toString();

        termOne = fixDecimalLength(termOne);

        updateDisplay(termOne);
    }
}

function findAnswer() {

    let answer;
    
    if (termTwo === "") {

        if (lastOp.operator === null) {

            return;
        } else if (currentOperation == false) {

            currentOperation = lastOp.operator;
            termTwo = lastOp.term;
        } else {

            handleInvalidOperation();
            return;
        }
    }

    switch (currentOperation) {

        case 10:
            answer = addTerms();
            break;
        case 11:
            answer = subtractTerms();
            break;
        case 12:
            answer = multiplyTerms();
            break;
        case 13:
            answer = divideTerms();
            break;
    }

    lastOp.operator = currentOperation;
    lastOp.term = termTwo;

    currentOperation = false;
    termTwo = "";

    termOne = answer.toString();
    termOneComplete = true;
    expectOperator = true;
    updateDisplay(termOne);

    if (checkOverflow()) {

        handleOverflow();
    }
}

function addTerms() {

    termOne = parseFloat(termOne);
    termTwo = parseFloat(termTwo);

    let answer = (termOne + termTwo).toString();

    answer = fixDecimalLength(answer);

    return answer;
}

function subtractTerms() {

    termOne = parseFloat(termOne);
    termTwo = parseFloat(termTwo);

    let answer = (termOne - termTwo).toString();

    answer = fixDecimalLength(answer);

    return answer;
}

function multiplyTerms() {

    termOne = parseFloat(termOne);
    termTwo = parseFloat(termTwo);

    let answer = (termOne * termTwo).toString();

    answer = fixDecimalLength(answer);

    return answer;
}

function divideTerms() {

    termOne = parseFloat(termOne);
    termTwo = parseFloat(termTwo);

    let answer = (termOne / termTwo).toString();

    answer = fixDecimalLength(answer);

    if (termTwo == 0) {

        answer = Infinity;
    }

    return answer;
}

function fixDecimalLength(answer) {

    if (answer.includes(".") && answer.length > 10) {

        let divider = answer.split(".");
        let decimalLimit = 7 - divider[0].length;
        if (decimalLimit <= 0) {
           decimalLimit = 0;
        }
        answer = parseFloat(answer).toFixed(decimalLimit);
    } else {

        answer = parseFloat(answer);
    }

    return answer;
}