let boardData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
]
// Define game variables
let player = 1;
let gameOver = false;
const result = document.querySelector(".result");
const grid = document.querySelectorAll(".grid");
grid.forEach(square => square.addEventListener("click", (event) => {
    let index = event.target.id;
    //big brain moves for column and row
    let col = index % 3;
    let row = (index - col) / 3;
    // check if current cell is empty
    if (boardData[row][col] == 0 && gameOver == false) {
        boardData[row][col] = player;
    }
    //change player
    //wow wow woww, bloody amazing!!!
    player *= -1;
    //update the screen with markers
    drawMarkers();
    //Check if anyone has won
    checkResult()
}))

function drawMarkers() {
    //Iterate over rows
    for (let row = 0; row < 3; row++) {
        //Iterate over columns
        for (let col = 0; col < 3; col++) {
            //check if it is player 1's maker
            if (boardData[row][col] == 1) {
                //update cell with cross
                grid[(row * 3) + col].innerText = "X";
            }
            else if (boardData[row][col] == -1) {
                //update cell with circle
                grid[(row * 3) + col].innerText = "O";
            }
        }
    }
}

function checkResult() {
    //Check rows and columns
    for (let i = 0; i < 3; i++) {
        let rowSum = boardData[i][0] + boardData[i][1] + boardData[i][2];
        let colSum = boardData[0][i] + boardData[1][i] + boardData[2][i];
        if (rowSum == 3 || colSum == 3) {
            //Player 1 wins
            endGame(1);
            return
        } else if (rowSum == -3 || colSum == -3) {
            //Player 2 wins
            endGame(2);
            return
        }
    }
    //Check diagonals
    let diagonalSum1 = boardData[0][0] + boardData[1][1] + boardData[2][2];
    let diagonalSum2 = boardData[0][2] + boardData[1][1] + boardData[2][0];
    if (diagonalSum1 == 3 || diagonalSum2 == 3) {
        //Player 1 wins
        endGame(1);
        return
    }
    else if (diagonalSum1 == -3 || diagonalSum2 == -3) {
        //Player 2 wins
        endGame(2);
        return
    }
    //Check for a tie
    if (boardData[0].indexOf(0) == -1 &&
        boardData[1].indexOf(0) == -1 &&
        boardData[2].indexOf(0) == -1) {
        endGame(0);
        return
    }
}

function endGame(winner) {
    //trigger game over
    gameOver = true;
    // check if game ended in a tie
    if (winner == 0) {
        result.innerText = "IT'S A TIE"
    } else {
        result.innerText = (`PLAYER ${winner} HAS WON`);
    }
}

const restartButton = document.querySelector(".restart");
restartButton.addEventListener("click", () => {
    boardData = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ]
    player = 1;
    gameOver = false;
    result.innerText = "TIC TAC TOE"
    grid.forEach(grid => {
        grid.innerText = "";
    })
    //reset game board
});



// const game = (() => {
//     const result = document.querySelector(".result");
//     const grid = document.querySelectorAll(".grid");
//     grid.forEach(square => square.addEventListener("click", () => {
//         if (square.innerText !== "") {
//             return
//         }

//         function wincheck(){
//             if (grid[3].innerText + grid[4].innerText + grid[5].innerText === "XXX") {
//                 result.innerText = "You win!!"
//                 let winner = true;
//                 return winner;
//             }
//             else if (grid[0].innerText + grid[1].innerText + grid[2].innerText === "OOO") {
//                 result.innerText = "Computer wins!!";
//                 return;
//             }
//         }
//         square.innerText = "X";
//         setTimeout(function () {
//             function fallback() {
//                 const gameboard = Array.from(grid);
//                 for (const ai of gameboard) {
//                     if (ai.innerText === "") {
//                         ai.innerText = "O"
//                         break;
//                     }
//                 }
//             }

//             switch (square.id) {
//                 case "0": case "2": case "6": case "8":
//                     if (grid[4].innerText === "") {
//                         grid[4].innerText = "O";
//                         wincheck();
//                     }
//                     else {
//                         fallback();
//                     }
//                     break;
//                 case "1": case "3": case "5": case "7":
//                     if (grid[0].innerText === "") {
//                         grid[0].innerText = "O";
//                         wincheck();
//                     }
//                     else if (grid[2].innerText === "") {
//                         grid[2].innerText = "O";
//                         wincheck();
//                     }
//                     else if (grid[6].innerText === "") {
//                         grid[6].innerText = "O";
//                         wincheck();
//                     }
//                     else if (grid[8].innerText === "") {
//                         grid[8].innerText = "O";   
//                         wincheck();
//                     }
//                     else {
//                         fallback();
//                     }
//                     break;
//                 default:
//                     fallback();
//                     wincheck();
//             }
//         }, 200)
//     }))
// })();