const RESULT = document.querySelector(".result");
const NEW_GAME_BTN = document.querySelector(".newGame");
const REMATCH_BTN = document.querySelector(".rematch");
const GRID_SQUARES = document.querySelectorAll("span");
const GAME_BOARD_ELEMENT = document.querySelector(".gameboard");
const DROPDOWN = document.querySelectorAll("select");

const gameBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
];

const player1 = {
    id: 1,
};
const player2 = {
    id: 2,
};

let gameInProgress = false;
let player1turn = true;

const human = (player) => {
    player.mark = (player.id === 1) ? "😎" : "🤓";
    selectByClick(player);
}

const ai1 = (player) => {
    player.mark = (player.id === 1) ? "🙈" : "🤪";
    selectByClick(player);
}

const ai2 = (player) => {
    player.mark = (player.id === 1) ? "💀" : "👽";
    selectByClick(player);
}

const ai3 = (player) => {
    player.mark = (player.id === 1) ? "🤖" : "👾";
    selectByClick(player);
}

//Add mark to clicked square
const selectByClick = (player) => {
    const handleClick = (event) => {
        if (event.target.innerText !== "") return;
        const [row, col] = event.target.id.split("").map((x) => parseInt(x));
        placeMove(row, col, player.mark);
    }
    GAME_BOARD_ELEMENT.addEventListener("click", handleClick);
}

//Enable function calling using string containing function name
const functionDict = {
    human,
    ai1,
    ai2,
    ai3,
};

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
    // Check rows
    if (gameBoard.some(row => row.every(cell => cell === player.mark))) {
        RESULT.innerText = `${player.mark} WINS!`;
        gameInProgress = false;
        return;
    }

    // Check columns
    for (let col = 0; col < gameBoard.length; col++) {
        if (gameBoard.every(row => row[col] === player.mark)) {
            RESULT.innerText = `${player.mark} WINS!`;
            gameInProgress = false;
            return;
        }
    }

    // Check diagonals
    if (gameBoard.every((row, index) => row[index] === player.mark) ||
        gameBoard.every((row, index) => row[gameBoard.length - 1 - index] === player.mark)) {
        RESULT.innerText = `${player.mark} WINS!`;
        gameInProgress = false;
        return;
    }

    // Check for draw
    if (gameBoard.every(row => row.every(cell => cell !== ""))) {
        RESULT.innerText = "IT'S A DRAW!";
        gameInProgress = false;
    }
}

const newGame = () => {
    //Return to player selection screen
    if (gameInProgress === true) {
        DROPDOWN.forEach((menu) => menu.style.display = "flex");
        GAME_BOARD_ELEMENT.style.display = "";
        gameInProgress = false;
        return
    }

    rematch();

    //Assign chosen algorithm to each player
    player1.algorithm = document.getElementById("choosePlayer1").value
    player2.algorithm = document.getElementById("choosePlayer2").value

    //Hide dropdown menu's after the game has been inititated
    DROPDOWN.forEach((menu) => menu.style.display = "none");

    gameInProgress = true;

    //Reveal the game board
    GAME_BOARD_ELEMENT.style.display = "grid";
    placeMove();
}

NEW_GAME_BTN.addEventListener("click", newGame);

//Reset the game but keep the selected player algorithms
const rematch = () => {
    player1turn = true;
    gameInProgress = true;
    gameBoard.forEach((row) => row.fill(""));
    GRID_SQUARES.forEach((square) => (square.innerText = ""));
    RESULT.innerText = "TIC TAC TOE";
}



REMATCH_BTN.addEventListener("click", rematch);


