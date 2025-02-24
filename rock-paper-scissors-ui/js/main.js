let score = {
    computer: 0,
    player: 0
}

let chosen = {
    computer: null,
    player: null
}

const WIN_THRESHOLD = 5;

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

    return chosen.computer;
}

function setPlayerChoice(coa) {

    while (!chosen.player || !["rock", "paper", "scissors"].includes(chosen.player)) {

        chosen.player = gamePrompt(coa).toLowerCase();
    }

    return chosen.player;
}

function compareChosen() {

    let player = chosen.player;
    let computer = chosen.computer;

    chosen.computer = null;
    chosen.player = null;

    if (!player || !computer) {

        alert("Something went terribly wrong.");
        return;
    }

    if (player === computer) {

        declareDraw(player, computer);
        return;
    } else if (computer === gameRules[player].beats) {
        
        declareRoundWinner("player", player, computer);
        increasePlayer();
        return;
    } else {

        declareRoundWinner("computer", player, computer);
        increaseComputer();
        return;
    }
}

function increasePlayer() {

    return score.player++;
}

function increaseComputer() {

    return score.computer++;
}

function playRound() {

    setComputerChoice();
    setPlayerChoice("Rock, Paper, or Scissors?");
    compareChosen();
}

function playGame() {

    while (Math.max(score.player, score.computer) < WIN_THRESHOLD) {

        playRound();
    }

    declareWinner();
    resetGame();
}

function declareWinner() {

    if (score.player == 5) {

        alert("All games have been played. The winner is the player!" + `\nComputer: ${score.computer}\nPlayer: ${score.player}`);
    } else {

        alert("All games have been played. The winner is the computer!" + `\nComputer: ${score.computer}\nPlayer: ${score.player}`);
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

function gamePrompt(coa) {

   return prompt(coa + `\nComputer: ${score.computer}\nPlayer: ${score.player}`);
}

function declareDraw(player, computer) {

    return alert(`The player chose: ${player}\nThe computer chose: ${computer}\nThis round is a tie!`)
}

function declareRoundWinner(winner, player, computer) {

    return alert(`The player chose: ${player}\nThe computer chose: ${computer}\nThe winner is ${winner}!`)
}

while (true) {
    playGame();
    let playAgain = confirm("Do you want to play again?");
    if (!playAgain) break;
}