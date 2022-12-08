const RESULT = document.querySelector(".result");
const NEW_GAME_BTN = document.querySelector(".newGame");
const GRID_SQUARES = document.querySelectorAll("span");
const GAME_BOARD_ELEMENT = document.querySelector(".gameboard");

const gameBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
];

const player1 = {};
const player2 = {};
let gameInProgress = false;

const human = (player) => {
    player.mark = "😎";
    selectByClick(player);
}

const alsoHuman = (player) => {
    player.mark = "🤡";
    selectByClick(player);
}

const selectByClick = (player) => {
    const handleClick = (event) => {
        if (event.target.innerText !== "") return;
        const [row, col] = event.target.id.split("").map((x) => parseInt(x));
        placeMove(row, col, player.mark);
    }
    GAME_BOARD_ELEMENT.addEventListener("click", handleClick);
}

const ai1 = (player) => {
    player.mark = "🙈";
    selectByClick(player);
}

const ai2 = (player) => {
    player.mark = "🤓";
    selectByClick(player);
}

const ai3 = (player) => {
    player.mark = "🤖";
    selectByClick(player);
}

//Enable function calling using string containing function name
const functionDict = {
    human,
    alsoHuman,
    ai1,
    ai2,
    ai3,
};

const newGame = () => {
    //Assing player algorithms based on dropdwon menu choices
    player1.algorithm = document.getElementById("choosePlayer1").value
    player2.algorithm = document.getElementById("choosePlayer2").value

    //Hide dropdown menu's after the game has been inititated
    const DROPDOWN = document.querySelectorAll("select");
    DROPDOWN.forEach((menu) => menu.style.display = "none");

    gameInProgress = true;

    //Reveal the game board
    GAME_BOARD_ELEMENT.style.display = "grid";
    placeMove();
}

NEW_GAME_BTN.addEventListener("click", newGame);

let player1turn = true;

const placeMove = (row, col) => {
    //Disable further input if the game is over
    if (gameInProgress == false) return;

    // Determine which player's turn it is and call the appropriate algorithm function
    const player = player1turn ? player1 : player2;
    functionDict[player.algorithm](player);

    //Wait for input before proceeding
    if (row == undefined) return;

    //Place the current player mark on array and in HTML
    gameBoard[row][col] = player.mark;
    const coordinates = `${row}${col}`;
    document.getElementById(coordinates).innerText = player.mark;

    //Find out if the game is over
    console.table(gameBoard);
    winCheck(player);

    // Invert the value of player1turn
    player1turn = !player1turn;
    return player1turn;
};

function winCheck(player) {
    for (let row = 0; row < gameBoard.length; row++) {
        if (gameBoard[row][0] === gameBoard[row][1] && gameBoard[row][1] === gameBoard[row][2] && gameBoard[row][0] !== "") {
            if (gameBoard[row][0] === player.mark) {
                RESULT.innerText = `${player.mark} WINS!`
                gameInProgress = false;
            }
        }
    }

    for (let col = 0; col < gameBoard[0].length; col++) {
        if (gameBoard[0][col] === gameBoard[1][col] && gameBoard[1][col] === gameBoard[2][col] && gameBoard[0][col] !== "") {
            if (gameBoard[0][col] === player.mark) {
                RESULT.innerText = `${player.mark} WINS!`
                gameInProgress = false;
            }
        }
    }

    if (gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2] && gameBoard[0][0] !== "") {
        if (gameBoard[0][0] === player.mark) {
            RESULT.innerText = `${player.mark} WINS!`
            gameInProgress = false;
        }
    }

    if (gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0] && gameBoard[0][2] !== "") {
        if (gameBoard[0][2] === player.mark) {
            RESULT.innerText = `${player.mark} WINS!`
            gameInProgress = false;
        }
    }

    else if (gameBoard.every(row => row.every(cell => cell !==""))) {
        RESULT.innerText = "IT'S A DRAW!";
        gameInProgress = false;
    }
}

const reset = () => {
    // gameBoard.forEach((row) => row.fill(""));
    // GRID_SQUARES.forEach((square) => (square.innerText = ""));
    // RESULT.innerText = "TIC TAC TOE";
}




// function computerMove() {
//     if (winner !== "") return;
//     RESULT.innerText = "🤖 Hmm..."
//     const values = ["00", "01", "02", "10", "11", "12", "20", "21", "22"];
//     let computerNum = values[Math.floor(Math.random() * values.length)];
//     let [cRow, cCol] = computerNum.split("").map((x) => parseInt(x));
//     if (gameBoard[cRow][cCol] === "") {
//         placeMove(cRow, cCol);
//         let gridSquare = document.getElementById(`${computerNum}`);
//         gridSquare.innerText = currentPlayerMark;
//     } else {
//         computerMove();
//     }
// }