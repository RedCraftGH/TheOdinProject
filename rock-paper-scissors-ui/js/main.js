let score = {
    computer: 0,
    player: 0
}

let chosen = {
    computer: null,
    player: null
}

let screenSelector = 0;

const ONE_SECOND = 1000;

const WIN_THRESHOLD = 5;

const RPS_IMAGES = {
    rock: "./images/fist.svg",
    paper: "./images/open-hand.svg",
    scissors: "./images/peace-sign.svg"
}

const gameRules = {
    rock: {beats: "scissors"},
    paper: {beats: "rock"},
    scissors: {beats: "paper"}
}

function getRandomInt(min, max) {

    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function setComputerChoice() {

    let selector = getRandomInt(1, 3);
    switch (selector) {
        case 1:
            chosen.computer = "Rock";
        break;
        case 2:
            chosen.computer = "Paper";
        break;
        case 3:
            chosen.computer = "Scissors";
        break;
    }
    chosen.computer = chosen.computer.toLowerCase();

    setComputerImage(chosen.computer);

    return chosen.computer;
}

function setComputerImage(choice) {

    let imageElement = document.querySelector(".computer img");
    let path;
    let counter = 0;

    let lotto = setInterval(() => {

        counter++;
        if (counter < 30) {

            path = Object.values(RPS_IMAGES)[getRandomInt(0, 2)];
        } else {

            path = RPS_IMAGES[choice];
            compareChosen();
            clearInterval(lotto);
        }
        imageElement.src = path;
        
    }, ONE_SECOND / 10);
}

function setPlayerChoice(choice) {

    chosen.player = choice;
    viewDisplay();
    setComputerChoice();

    return chosen.player;
}

function viewDisplay() {

    window.scrollTo({
        top: 181,
        behavior: "smooth"
    });
}

function compareChosen() {

    let player = chosen.player;
    let computer = chosen.computer;
    let winner;

    chosen.computer = null;
    chosen.player = null;

    if (!player || !computer) {

        console.log("Something went terribly wrong.");
        return;
    }

    if (player === computer) {

        winner = "Draw!";
    } else if (computer === gameRules[player].beats) {
        
        winner = "You win!"
        increasePlayer();
    } else {

        winner = "You lose!"
        increaseComputer();
    }

    updateDisplay(winner);
}

function increasePlayer() {

    document.querySelector("#playerscore").innerHTML = ++score.player;
}

function increaseComputer() {

    document.querySelector("#computerscore").innerHTML = ++score.computer;
}

function updateDisplay(outcome) {

    document.querySelector(".resultscreen h3").innerHTML = outcome;

    let computer = document.querySelector("#computer");
    let player = document.querySelector("#player");
    let screenDivider = document.querySelector("#screendivider");
    let resultScreen = document.querySelector(".resultscreen");

    swapScreens(computer, player, screenDivider, resultScreen);
    let screenSwap = setInterval(() => {

        swapScreens(computer, player, screenDivider, resultScreen);
        clearInterval(screenSwap);
    }, ONE_SECOND * 2);
}

function swapScreens(computer, player, screenDivider, resultScreen) {

    if (screenSelector === 0) {

        computer.style.display = "none";
        player.style.display = "none";
        screenDivider.style.display = "none";
        resultScreen.style.display = "block";
        screenSelector++
    } else {

        computer.style.display = "block";
        player.style.display = "block";
        screenDivider.style.display = "block";
        resultScreen.style.display = "none";
        screenSelector--;
    }
}

function resetGame() {

    score = {
        player: 0,
        computer: 0
    }

    chosen = {
        player: null,
        computer: null
    }
}