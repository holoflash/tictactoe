import { gameBoard } from "./script.js";

export function firstBest(player) {
    let placed = false;
    for (let row = 0; row < gameBoard.length; row++) {
        for (let col = 0; col < gameBoard[row].length; col++) {
            if (gameBoard[row][col] === '') {
                gameBoard[row][col] = player.mark;
                document.getElementById(`${row}${col}`).innerText = player.mark;
                placed = true;
                break;
            }
        }
        if (placed) break;
    }
}

export function anyEmpty(player) {
    const emptySpots = [];
    gameBoard.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            if (gameBoard[rowIndex][colIndex] === '') {
                emptySpots.push([rowIndex, colIndex]);
            }
        });
    });
    const randomIndex = Math.floor(Math.random() * emptySpots.length);
    const [cRow, cCol] = emptySpots[randomIndex];
    gameBoard[cRow][cCol] = player.mark;
    document.getElementById(`${cRow}${cCol}`).innerText = player.mark;
}
