let score = {
    computer: 0,
    player: 0
}

let chosen = {
    computer: null,
    player: null
}

function getRandomInt(min, max) {

    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function chooseComputer() {

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

function choosePlayer(coa) {

    chosen.player = prompt(coa + `\nComputer: ${score.computer}\nPlayer: ${score.player}`);
    if (!chosen.player) {

        choosePlayer("You have to choose something. -_-");
    }
    chosen.player = chosen.player.toLowerCase();
    if (chosen.player === "rock" || chosen.player === "paper" || chosen.player === "scissors") {

        return chosen.player;
    } else {

        choosePlayer(`You can't choose ${chosen.player}, silly!`);
    }
}

function compareChosen() {

    let player = chosen.player;
    let computer = chosen.computer;
    if (!player || !computer) {

        alert("Something went terribly wrong.");
        return;
    }

    switch (player) {

        case "rock":
            if (computer === player) {

                alert("It was a tie!");
            } else if (computer === "paper") {

                increaseComputer();
                alert(`The computer chose ${computer}! You lose!`);
            } else {

                increasePlayer();
                alert(`The computer chose ${computer}! You win!`)
            }
        break;
        case "paper":
            if (computer === player) {

                alert("It was a tie!");
            } else if (computer === "scissors") {

                increaseComputer();
                alert(`The computer chose ${computer}! You lose!`);
            } else {

                increasePlayer();
                alert(`The computer chose ${computer}! You win!`)
            }
        break;
        case "scissors":
            if (computer === player) {

                alert("It was a tie!");
            } else if (computer === "rock") {

                increaseComputer();
                alert(`The computer chose ${computer}! You lose!`);
            } else {

                increasePlayer();
                alert(`The computer chose ${computer}! You win!`)
            }
        break;
    }
}

function increasePlayer() {

    return score.player++;
}

function increaseComputer() {

    return score.computer++;
}

function playRound() {

    chooseComputer();
    choosePlayer("Rock, Paper, or Scissors?");
    compareChosen();
}

function playGame() {

    while (Math.max(score.player, score.computer) < 5) {

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

while (true) {
    playGame();
}