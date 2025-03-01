let termOneComplete = false;
let termOne = "";
let termTwo = "";
let currentOperation = false;
let displayWidth = document.querySelector(".display").clientWidth;

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

    console.log(buttonId);
    if (numberIds.includes(buttonId)) {

        handleNumber(buttonId);
    } else if (operatorIds.includes(buttonId)) {

        handleOperator(buttonId);
    } else {

        handleCommand(buttonId);
    }
}

function handleNumber(number) {

    if (number === 50) number = ".";
    
    if (!termOneComplete) {

        if (checkOverflow()) {

            handleOverflow();
            return;
        }
        
        termOne = termOne.toString() + number;
        updateDisplay(termOne);
        console.log({termOne});
    } else {

        if (checkOverflow()) {

            handleOverflow();
            return;
        }

        termTwo = termTwo.toString() + number;
        updateDisplay(termTwo);
        console.log({termTwo});
    }
}

function handleOperator(operator) {

    let symbol = findSymbol(operator);

    if (termOne === "") handleInvalidOperation();

    if (!termOneComplete) {

        termOneComplete = true;
        updateDisplay("");
        currentOperation = operator;
    } else {

        //this block only runs if an operator is pressed AND the first term is
        //already complete. This will evaluate whatever the current first
        //and second terms are and display the answer as the first term being
        //operated on by the pressed on operator.
    }
}

function findSymbol(id) {

    switch (id) {

        case 10:
            return "+";
        case 11:
            return "-";
        case 12:
            return "x"
        case 13:
            return "÷"
    }
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

    
}

function updateDisplay(text) {

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

    updateDisplay("0");
    termOne = "";
    termTwo = "";
    termOneComplete = false;
    currentOperation = false;
}

function sqrt() {


}

function toggleNegPos() {


}

function deleteCharacter() {


}

function square() {


}

function turnOff() {


}

function convertPercent() {


}

function findAnswer() {

    let answer;

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

    updateDisplay(answer);
}

function addTerms() {

    termOne = termOne.toFloat();
    termTwo = termTwo.toFloat();

    return termOne + termTwo;
}

function subtractTerms() {

    termOne = termOne.toFloat();
    termTwo = termTwo.toFloat();

    return termOne - termTwo;
}

function multiplyTerms() {

    termOne = termOne.toFloat();
    termTwo = termTwo.toFloat();

    return termOne * termTwo;
}

function divideTerms() {

    termOne = termOne.toFloat();
    termTwo = termTwo.toFloat();

    return termOne / termTwo;
}