// (() => {
const RESULT = document.querySelector(".result");
const NEW_GAME_BTN = document.querySelector(".newGame");
const GRID_SQUARES = document.querySelectorAll("span");
const GAME_BOARD_ELEMENT = document.querySelector(".gameboard");

NEW_GAME_BTN.addEventListener("click", reset);

const gameBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
];

class Player {
    constructor(name, algorithm) {
        this.name = name;
        this.algorithm = algorithm;
    }
    //Methods for obtaining player choice of square
    human() {
        this.mark = "😎";
        return console.log("working?")
    }

    ai1() {
        this.mark = "🙈";
        return console.log("am I doing it?")

    }

    ai2() {
        this.mark = "🤓";
        return console.log("r u proud dah-dah?")
    }

    ai3() {
        this.mark = "🤖";
        return console.log("yeah I suppose")
    }
}

let gameInProgress = false;


NEW_GAME_BTN.addEventListener("click", choosePlayer);

function choosePlayer() {
    const player1 = new Player("Player1", document.getElementById("choosePlayer1").value);
    const player2 = new Player("Player2", document.getElementById("choosePlayer2").value);
    // Get the elements with the "choosePlayer1" and "choosePlayer2" IDs
    gameInProgress = true;
    //Send the player1 objects to playGame
    playGame(player1, player2)
}

function playGame(player1, player2) {
    if (!gameInProgress) return;
    player1[player1.algorithm]();
    player2[player2.algorithm]();
    winCheck();
    //Passing along the player1 object
    markMe(player1);
}

//receiving the player1 object
function markMe(player1) {
    console.log(player1.mark)
}



function reset() {
    gameBoard.forEach((row) => row.fill(""));
    GRID_SQUARES.forEach((square) => (square.innerText = ""));
    currentPlayer = "X";
    winner = "";
    currentPlayerMark = "😎";
    RESULT.innerText = "TIC TAC TOE";
    GAME_BOARD_ELEMENT.style.display = "grid";


    const DROPDOWN = document.querySelectorAll("select");
    DROPDOWN.forEach((menu) => menu.style.display = "none");


    GAME_BOARD_ELEMENT.addEventListener("click", onClick);
}



let currentPlayer = "X"
let currentPlayerMark = "😎";
let winner = "";

GAME_BOARD_ELEMENT.addEventListener("click", onClick);

function onClick(event) {
    if (event.target.innerText !== "") return;
    const [row, col] = event.target.id.split("").map((x) => parseInt(x));
    placeMove(row, col);
    event.target.innerText = currentPlayerMark;
    computerMove();
    if (currentPlayer === "O") {
        GAME_BOARD_ELEMENT.removeEventListener("click", onClick);
        return
    }
}

function placeMove(row, col) {
    if (gameBoard[row][col] === "X" || gameBoard[row][col] === "O") return;
    gameBoard[row][col] = currentPlayer;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    currentPlayerMark = currentPlayer === "X" ? "🤖" : "😎";
    RESULT.innerText = winCheck();
}

function computerMove() {
    if (winner !== "") return;
    RESULT.innerText = "🤖 Hmm..."
    const values = ["00", "01", "02", "10", "11", "12", "20", "21", "22"];
    let computerNum = values[Math.floor(Math.random() * values.length)];
    let [cRow, cCol] = computerNum.split("").map((x) => parseInt(x));
    if (gameBoard[cRow][cCol] === "") {
        placeMove(cRow, cCol);
        let gridSquare = document.getElementById(`${computerNum}`);
        gridSquare.innerText = currentPlayerMark;
    } else {
        computerMove();
    }
}


function winCheck() {
    for (let row = 0; row < gameBoard.length; row++) {
        if (gameBoard[row][0] === gameBoard[row][1] && gameBoard[row][1] === gameBoard[row][2] && gameBoard[row][0] !== "") {
            GAME_BOARD_ELEMENT.removeEventListener("click", onClick);
            if (gameBoard[row][0] === "X") {
                winner = "player"
                return "🏆 YOU WIN! 🏆";
            } else if (gameBoard[row][0] === "O") {
                winner = "computer"
                return "🤖 I WIN! 🤖";
            }
        }
    }

    for (let col = 0; col < gameBoard[0].length; col++) {
        if (gameBoard[0][col] === gameBoard[1][col] && gameBoard[1][col] === gameBoard[2][col] && gameBoard[0][col] !== "") {
            GAME_BOARD_ELEMENT.removeEventListener("click", onClick);
            if (gameBoard[0][col] === "X") {
                winner = "player"
                return "🏆 YOU WIN! 🏆";
            } else if (gameBoard[0][col] === "O") {
                winner = "computer"
                return "🤖 I WIN! 🤖";
            }
        }
    }

    if (gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2] && gameBoard[0][0] !== "") {
        GAME_BOARD_ELEMENT.removeEventListener("click", onClick);
        if (gameBoard[0][0] === "X") {
            winner = "player"
            return "🏆 YOU WIN! 🏆";
        } else if (gameBoard[0][0] === "O") {
            winner = "computer"
            return "🤖 I WIN! 🤖";
        }
    }

    if (gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0] && gameBoard[0][2] !== "") {
        GAME_BOARD_ELEMENT.removeEventListener("click", onClick);
        if (gameBoard[0][2] === "X") {
            winner = "player"
            return "🏆 YOU WIN! 🏆";
        } else if (gameBoard[0][2] === "O") {
            winner = "computer"
            return "🤖 I WIN! 🤖";
        }
    }

    else if (gameBoard.every(row => row.every(cell => cell !== ""))) {
        GAME_BOARD_ELEMENT.removeEventListener("click", onClick);
        winner = "draw"
        return "IT'S A DRAW!";
    }

    return "YOUR TURN";
}
// })();