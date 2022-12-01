const gameBoard = (() => {
    const result = document.querySelector(".result");
    const grid = document.querySelectorAll(".grid");
    const restartButton = document.querySelector(".restart");
    restartButton.addEventListener("click", restart);
    grid.forEach(square => square.addEventListener("click", humanMove))

    let boardData = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ]
    // Define game variables
    let player = 1;
    let gameOver = false;

    function humanMove(event) {
        let index = event.target.id;
        let col = index % 3;
        let row = (index - col) / 3;
        // check if current cell is empty and the game is still going
        if (boardData[row][col] == 0 && gameOver == false) {
            boardData[row][col] = player;
        }
        //change player
        player *= -1;
        drawMarkers();
        checkResult()
        if (player == -1) {
            aiMove(minimax(index));
        }
    }


    // All the new stuff
    const allChoices = [];

    function minimax(index) {
        allChoices.push(parseInt(index));
        let randomAi = Math.floor(Math.random() * (8 - 0 + 1)) + 0;
        return randomAi
    }

    function aiMove(aiIndex) {
        let col = aiIndex % 3;
        let row = (aiIndex - col) / 3;
        // check if current cell is empty and the game is still going
        if (boardData[row][col] == 0 && gameOver == false) {
            boardData[row][col] = player;
        }
        //change player
        player *= -1;
        drawMarkers();
        checkResult()
        allChoices.push(parseInt(aiIndex));
        console.log(allChoices);
    }

    // new stuff ends here 




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

    function restart() {
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
    }
})();