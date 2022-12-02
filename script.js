(() => {
    console.log("Loading: 100%")
    const result = document.querySelector(".result");
    const grid = document.querySelectorAll(".grid");
    const restartButton = document.querySelector(".restart");
    const playerMark = "🍎";
    const computerMark = "🍊";
    let yourTurn = true;
    console.log(grid)

    //Clear the board
    restartButton.addEventListener("click", restart = () => {
        grid.forEach(grid => grid.innerText = "")
        yourTurn = true;
        updateDisplay("TIC TAC TOE")
    });

    //Place player mark on the clicked square and respond with computer move
    grid.forEach(grid => grid.addEventListener("click", humanMove = (event) => {
        if (event.target.innerText === "" && yourTurn === true) {
            event.target.innerText = playerMark;
            yourTurn = false;
            computerMove();
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
                    if (square.innerText === "") {
                        square.innerText = computerMark;
                        updateDisplay("Your turn")
                        yourTurn = true;
                        break;
                    }
                }
            }
        }, 1000)
    }
})();