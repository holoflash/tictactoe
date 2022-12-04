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
    let draw = false;
    let gameOver = false;

    const winningCombos = [[0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 4, 6], [2, 5, 8], [3, 4, 5], [6, 7, 8],]

    //Clear the board
    newGameButton.addEventListener("click", newGame = () => {
        gameBoard.style.display = "grid";
        grid.forEach((square) => {
            square.addEventListener("click", humanMove);
            square.innerText = "";
            square.id = "";
            square.dataset.ai = "";
        });
        yourTurn = true;
        playerWins = false;
        aiWins = false;
        gameOver = false;
        updateDisplay("TIC TAC TOE");
    });

    //Place player mark on the clicked square and respond with computer move
    const humanMove = (event) => {
        if (event.target.innerText || !yourTurn || gameOver) return;
        event.target.innerText = playerMark;
        event.target.id = event.target.dataset.key;
        yourTurn = false;
        computerMove();
        currentGameState();
    };

    //Update the overhead display using the argument passed to the function.
    updateDisplay = (textToShow) => {
        result.innerText = textToShow;
    }

    //Make computer move after a moment of thought (for fun)
    computerMove = () => {
        updateDisplay("🤖 Hmm...")
        setTimeout(() => {
            for (const square of grid) {
                if (square.innerText === "" && !playerWins) {
                    square.innerText = computerMark;
                    square.dataset.ai = square.dataset.key;
                    updateDisplay("Your turn");
                    currentGameState();
                    yourTurn = true;
                    break;
                }
            }
            //Decide how long AI thinks before making the move
        }, 200)
    }

    //All of the code below is for tracking board state and determining winner   
    const currentGameState = () => {
        // Check player state
        const filledArray = [...grid].map((square) => parseInt(square.id)).filter((item) => !isNaN(item));
        if (winningCombos.some((state) => state.every((index) => filledArray.includes(index)))) {
            updateDisplay("🏆😎 YOU WIN! 😎🏆")
            playerWins = true;
            gameOver = true;
            return
        }
        else if (filledArray.length === 5 && gameOver === false) {
            updateDisplay("😎 DRAW! 🤖 ")
            gameOver = true;
            draw = true;
            return
        }
    
        // Check AI state
        const filledArrayAi = [...grid].map((square) => parseInt(square.dataset.ai)).filter((item) => !isNaN(item));
        if (winningCombos.some((state) => state.every((index) => filledArrayAi.includes(index)))) {
            updateDisplay("🏆🤖 I WIN! 🤖🏆")
            aiWins = true;
            gameOver = true;
            return
        }
    }
})();