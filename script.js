(() => {
    const result = document.querySelector(".result");
    const newGameButton = document.querySelector(".reset");
    const gridSquares = document.querySelectorAll("span");
    const gameBoardElement = document.querySelector(".gameboard");

    newGameButton.addEventListener("click", reset);

    const gameBoard = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];

    let currentPlayer = "X"
    let currentPlayerMark = "😎";
    let winner = "";

    function onClick(event) {
        if (event.target.innerText !== "") return;
        const [row, col] = event.target.id.split("").map((x) => parseInt(x));
        placeMove(row, col);
        event.target.innerText = currentPlayerMark;
        // nearWinCheck();
        // if(nearWinCheck()==true){
        //     return;
        // }
        computerMove();
        if (currentPlayer === "O") {
            gameBoardElement.removeEventListener("click", onClick);
            return
        }
    }

    function placeMove(row, col) {
        gameBoardElement.addEventListener("click", onClick);
        if (gameBoard[row][col] === "X" || gameBoard[row][col] === "O") return;
        gameBoard[row][col] = currentPlayer;
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        currentPlayerMark = currentPlayer === "X" ? "🤖" : "😎";
        result.innerText = winCheck();
    }

    function computerMove() {
        if (winner !== "") return;
        result.innerText = "🤖 Hmm..."
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

    function reset() {
        gameBoard.forEach((row) => row.fill(""));
        gridSquares.forEach((square) => (square.innerText = ""));
        currentPlayer = "X";
        winner = "";
        currentPlayerMark = "😎";
        result.innerText = "TIC TAC TOE";
        gameBoardElement.style.display = "grid";
        gameBoardElement.addEventListener("click", onClick);
    }


    // function nearWinCheck() {
    //     for (let row = 0; row < gameBoard.length; row++) {
    //         if (gameBoard[row][0] === gameBoard[row][1] && gameBoard[row][0] === "X"){
    //             placeMove(row, 2);
    //             let smartNum = String(row) + String(2);
    //             let smartSquare = document.getElementById(`${smartNum}`);
    //             smartSquare.innerText = currentPlayerMark;
    //             return true
    //         }
    //     }
    // }

    function winCheck() {
        for (let row = 0; row < gameBoard.length; row++) {
            if (gameBoard[row][0] === gameBoard[row][1] && gameBoard[row][1] === gameBoard[row][2] && gameBoard[row][0] !== "") {
                gameBoardElement.removeEventListener("click", onClick);
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
                gameBoardElement.removeEventListener("click", onClick);
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
            gameBoardElement.removeEventListener("click", onClick);
            if (gameBoard[0][0] === "X") {
                winner = "player"
                return "🏆 YOU WIN! 🏆";
            } else if (gameBoard[0][0] === "O") {
                winner = "computer"
                return "🤖 I WIN! 🤖";
            }
        }

        if (gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0] && gameBoard[0][2] !== "") {
            gameBoardElement.removeEventListener("click", onClick);
            if (gameBoard[0][2] === "X") {
                winner = "player"
                return "🏆 YOU WIN! 🏆";
            } else if (gameBoard[0][2] === "O") {
                winner = "computer"
                return "🤖 I WIN! 🤖";
            }
        }

        else if (gameBoard.every(row => row.every(cell => cell !== ""))) {
            gameBoardElement.removeEventListener("click", onClick);
            winner = "draw"
            return "IT'S A DRAW!";
        }

        return "YOUR TURN";
    }
})();