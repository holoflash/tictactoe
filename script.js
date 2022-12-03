(() => {
    const result = document.querySelector(".result");
    const grid = document.querySelectorAll(".grid");
    const gameBoard = document.querySelector(".gameboard");
    const newGameButton = document.querySelector(".restart");
    const playerMark = "😎";
    const computerMark = "🤖"
    let yourTurn = true;
    let playerWins = false;
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    //Clear the board
    newGameButton.addEventListener("click", newGame = () => {
        gameBoard.style.display = "grid";
        grid.forEach(grid => grid.innerText = "");
        grid.forEach(grid => grid.id = "");
        yourTurn = true;
        playerWins = false;
        updateDisplay("TIC TAC TOE")
    });

    //Place player mark on the clicked square and respond with computer move
    grid.forEach(grid => grid.addEventListener("click", humanMove = (event) => {
        if (event.target.innerText === "" && yourTurn === true) {
            event.target.innerText = playerMark;
            event.target.id = event.target.dataset.key;
            yourTurn = false;
            computerMove();
            resultCheck();
        }
    }));

    //Update the overhead display using the argument passed to the function.
    updateDisplay = (textToShow) => {
        result.innerText = textToShow;
    }

    //Make computer move after a moment of thought (for fun)
    computerMove = () => {
        updateDisplay("🤖 Hmm...")
        setTimeout(() => {
            random();
            //Place mark on first available square
            function random() {
                for (const square of grid) {
                    if (square.innerText === "" && playerWins === false) {
                        square.innerText = computerMark;
                        updateDisplay("Your turn")
                        yourTurn = true;
                        break;
                    }
                }
            }
            //Decide how long AI thinks before making the move
        }, 500)
    }

    //this thing isn't really working 
    let gridArray = [];

    resultCheck = () => {
        [...grid].forEach(function (ele) {
            gridArray.push(parseInt(ele.id))
        });
        const filledArray = Array.from(gridArray).filter(item => !isNaN(item));
        gridArray = [];
        winningCombos.forEach((number) => {
            if (`${number}` == `${filledArray}`){
                updateDisplay("🏆 YOU WIN! 🏆")
                playerWins = true;
                return
            }
        });
    }

})();