let board = [];
let currentPlayer = 'X';
let gameMode = null;
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');

function startGame(mode) {
    board = Array(9).fill('');
    currentPlayer = 'X';
    gameMode = mode;
    message.textContent = "";

    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleClick);
    });
}

function handleClick(event) {
    const index = event.target.dataset.index;
    if (board[index] === '') {
        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        if (checkWin()) {
            message.textContent = `${currentPlayer} wins!`;
            endGame();
            return;
        }
        if (checkTie()) {
            message.textContent = "It's a tie!";
            endGame();
            return;
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (gameMode.startsWith('ai') && currentPlayer === 'O') {
            aiMove();
        }
    }
}

function aiMove() {
    let move;
    if (gameMode === 'ai-easy') {
        move = board.indexOf('');
    } else if (gameMode === 'ai-random') {
        const availableMoves = board.reduce((acc, val, index) => val === '' ? [...acc, index] : acc, []);
        move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    } else if (gameMode === 'ai-minimax') {
        move = minimax(board, 'O').index;
    }
    if (move !== -1) {
        board[move] = 'O';
        cells[move].textContent = 'O';

        if (checkWin()) {
            message.textContent = "O wins!";
            endGame();
            return;
        }
        if (checkTie()) {
            message.textContent = "It's a tie!";
            endGame();
            return;
        }
        currentPlayer = 'X';
    }
}

function minimax(newBoard, player) {
    let availableSpots = newBoard.reduce((acc, val, index) => val === '' ? [...acc, index] : acc, []);

    if (checkWinFor(newBoard, 'X')) {
        return { score: -10 };
    } else if (checkWinFor(newBoard, 'O')) {
        return { score: 10 };
    } else if (availableSpots.length === 0) {
        return { score: 0 };
    }

    let moves = [];
    for (let index of availableSpots) {
        let move = {};
        move.index = index;
        newBoard[index] = player;

        if (player == 'O') {
            let result = minimax(newBoard, 'X');
            move.score = result.score;
        } else {
            let result = minimax(newBoard, 'O');
            move.score = result.score;
        }

        newBoard[index] = '';
        moves.push(move);
    }

    let bestMove;
    if (player === 'O') {
        let bestScore = -10000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        let bestScore = 10000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
}

function checkWin() {
    return checkWinFor(board, currentPlayer);
}

function checkWinFor(boardToCheck, player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(pattern =>
        pattern.every(index => boardToCheck[index] === player)
    );
}

function checkTie() {
    return board.every(cell => cell !== '');
}

function endGame() {
    cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

startGame('player');
