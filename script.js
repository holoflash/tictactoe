(() => {
    const result = document.querySelector(".result");
    const grid = document.querySelectorAll(".grid");
    const gameBoard = document.querySelector(".gameboard");
    const newGameButton = document.querySelector(".restart");
    const playerMark = "😎";
    const computerMark = "🤖"
    let yourTurn = true;
    let playerWins = false;
    let aiWins = false;
    let gridArray = [];
    let gridArrayAi = [];
    let gameOver = false;
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],

        [0, 3, 4, 5],
        [0, 3, 6, 2],
        [0, 3, 4, 6],
        [0, 6, 7, 8],
        [0, 1, 4, 7],
        [0, 2, 5, 8],
        [0, 2, 4, 6],
        [0, 2, 3, 6],

        [1, 3, 4, 5],
        [1, 6, 7, 8],
        [1, 2, 5, 8],
        [1, 2, 4, 6],

        [2, 3, 4, 5],
        [2, 3, 4, 6],
        [2, 6, 7, 8],
        [2, 1, 4, 7],
        [2, 4, 6, 7],
        [2, 4, 6, 8],
        [2, 4, 5, 6],

        [3, 6, 7, 8],
        [3, 1, 4, 7],
        [3, 2, 5, 8],
        [3, 2, 4, 6],

        [4, 3, 4, 5],
        [4, 6, 7, 8],
        [4, 1, 4, 7],
        [4, 2, 5, 8],
        [4, 2, 4, 6],
        [0, 3, 4, 8],


        [5, 3, 4, 5],
        [5, 6, 7, 8],
        [5, 1, 4, 7],
        [5, 2, 5, 8],
        [5, 2, 4, 6],

        [0, 2, 4, 7, 8],
        [0, 4, 5, 7, 8],
        [0, 5, 6, 7, 8],
        [2, 3, 6, 7, 8],
        [2, 5, 6, 7, 8],
        [1, 3, 4, 7, 8],
        [1, 5, 6, 7, 8],
        [1, 2, 5, 6, 8],
        [2, 3, 5, 7, 8],

        [1, 2, 5, 6, 7, 8],
    ]

    //Clear the board
    newGameButton.addEventListener("click", newGame = () => {
        gameBoard.style.display = "grid";
        grid.forEach(grid => grid.addEventListener("click", humanMove));
        grid.forEach(grid => grid.innerText = "");
        grid.forEach(grid => grid.id = "");
        grid.forEach(grid => grid.dataset.ai = "");
        yourTurn = true;
        playerWins = false;
        aiWins = false;
        gameOver = false;
        updateDisplay("TIC TAC TOE")
    });

    //Place player mark on the clicked square and respond with computer move
    humanMove = (event) => {
        if (event.target.innerText === "" && yourTurn === true && gameOver === false) {
            event.target.innerText = playerMark;
            event.target.id = event.target.dataset.key;
            yourTurn = false;
            computerMove();
            currentPlayerState();
        }
    }



    //Update the overhead display using the argument passed to the function.
    updateDisplay = (textToShow) => {
        result.innerText = textToShow;
    }

    //Make computer move after a moment of thought (for fun)
    computerMove = () => {
        updateDisplay("🤖 Hmm...")
        setTimeout(() => {
            for (const square of grid) {
                if (square.innerText === "" && playerWins === false) {
                    square.innerText = computerMark;
                    square.dataset.ai = square.dataset.key;
                    updateDisplay("Your turn");
                    computerVsComputer();
                    currentAiState();
                    yourTurn = true;
                    //activate A.I mode
                    break;
                }
            }
            //Decide how long AI thinks before making the move
        }, 200)
    }

    computerVsComputer = () => {
        grid.forEach(grid => grid.removeEventListener("click", humanMove, false));
        updateDisplay("🤖 Hmm...")
        setTimeout(() => {
            for (const square of grid) {
                if (square.innerText === "" && yourTurn === true && gameOver === false) {
                    square.innerText = playerMark;
                    square.id = square.dataset.key;
                    yourTurn = false
                    computerMove();
                    currentPlayerState();
                    currentAiState();
                }
            }

            //Decide how long AI thinks before making the move
        }, 200)
    }
    //All of the code below is for tracking board state and determining winner   


    currentPlayerState = () => {
        grid.forEach(function (square) {
            gridArray.push(parseInt(square.id))
        });
        const filledArray = Array.from(gridArray).filter(item => !isNaN(item));
        gridArray = [];
        winCheck(filledArray);
        console.log("player " + filledArray)
        if (filledArray.length === 5 && gameOver === false) {
            updateDisplay("😎 DRAW! 🤖 ")
            gameOver = true;
            return

        }
    }


    currentAiState = () => {
        grid.forEach(function (square) {
            gridArrayAi.push(parseInt(square.dataset.ai))
        });
        const filledArrayAi = Array.from(gridArrayAi).filter(item => !isNaN(item));
        gridArrayAi = [];
        winCheck(null, filledArrayAi);
        console.log(filledArrayAi)
    }

    winCheck = (humanCase, aiCase) => {
        winningCombos.forEach((winCase) => {
            if (`${winCase}` == `${humanCase}`) {
                updateDisplay("🏆😎 YOU WIN! 😎🏆")
                playerWins = true;
                gameOver = true;
                return
            }
            if (`${winCase}` == `${aiCase}` && playerWins === false) {
                updateDisplay("🏆🤖 I WIN! 🤖🏆")
                aiWins = true;
                gameOver = true;
                return
            }
        });
    }
})();