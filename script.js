(() => {
    console.log("Loading: 100%")
    const result = document.querySelector(".result");
    const grid = document.querySelectorAll(".grid");
    const restartButton = document.querySelector(".restart");
    const playerMark = 1;
    const computerMark = "💩"
    let yourTurn = true;

    //Clear the board
    restartButton.addEventListener("click", restart = () => {
        grid.forEach(grid => grid.innerText = "")
        yourTurn = true;
        updateDisplay("TIC TAC TOE")
    });

    //Place player mark on the clicked square and respond with computer move
    grid.forEach(grid => grid.addEventListener("click", humanMove = (event) => {
        if (event.target.innerText === "" && yourTurn === true) {
            event.target.innerText = event.target.id;
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
                        resultCheck();
                        break;
                    }
                }
            }
            //Decide how long AI thinks before making the move
        }, 0)
    }

    //this thing isn't really working 
    let gridArray = [];
    resultCheck = () => {
        [...grid].forEach(function (ele) {
            gridArray.push(parseInt(ele.innerText))
        });
        //Creates an array only containing the grid id's of player choices
        let filledArray = Array.from(gridArray).filter(item => !isNaN(item));
        console.log(filledArray)
        //Super long way to check for winning combos. Iterate?
        if (filledArray.toString() === winningCombos[0].toString() ||
            filledArray.toString() === winningCombos[1].toString() ||
            filledArray.toString() === winningCombos[2].toString() ||
            filledArray.toString() === winningCombos[3].toString() ||
            filledArray.toString() === winningCombos[4].toString() ||
            filledArray.toString() === winningCombos[5].toString() ||
            filledArray.toString() === winningCombos[6].toString() ||
            filledArray.toString() === winningCombos[7].toString()
        ){
            updateDisplay("YOU WIN!!🙋‍♂️")
        }
        gridArray = [];
    }
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
    console.table(winningCombos)


})();