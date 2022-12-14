(() => {
  const RESULT = document.querySelector('.result');
  const NEW_GAME_BTN = document.querySelector('.newGame');
  const REMATCH_BTN = document.querySelector('.rematch');
  const GRID_SQUARES = document.querySelectorAll('span');
  const GAME_BOARD_ELEMENT = document.querySelector('.gameboard');
  const DROPDOWN = document.querySelectorAll('select');
  const P1_DISPLAY = document.querySelector('.p1');
  const P2_DISPLAY = document.querySelector('.p2');
  const INFO = document.querySelector('.info');

  const gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  const player1 = {
    id: 1,
    score: 0,
  };
  const player2 = {
    id: 2,
    score: 0,
  };

  let gameInProgress = false;
  let player1turn = true;
  let winner;

  const human = (player) => {
    player.mark = (player.id === 1) ? '😎' : '🤓';
    const handleClick = (event) => {
      if (event.target.innerText !== '' || gameInProgress === false) return;
      const [row, col] = event.target.id.split('').map((x) => parseInt(x));
      if (gameInProgress == false) return;
      const player = player1turn ? player1 : player2;
      functionDict[player.algorithm](player);
      if (row == undefined) return;
      gameBoard[row][col] = player.mark;
      const coordinates = `${row}${col}`;
      document.getElementById(coordinates).innerText = player.mark;
      winCheck(player);
      player1turn = !player1turn;
      const otherPlayer = player1turn ? player1 : player2;
      functionDict[otherPlayer.algorithm](otherPlayer);
      gameInProgress===false;
    };
    GAME_BOARD_ELEMENT.addEventListener('click', handleClick);
  };

  const ai1 = (player) => {
    if (player.mark === undefined) {
      player.mark = (player.id === 1) ? '🙈' : '🤪';
    }
    if (player !== (player1turn ? player1 : player2) || !gameInProgress) return;
    setTimeout(() => {
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
      winCheck(player);
      player1turn = !player1turn;
      player = player1turn ? player1 : player2;
      functionDict[player.algorithm](player);
    }, 50);
  };

  const ai2 = (player) => {
    if (player.mark === undefined) {
      player.mark = (player.id === 1) ? '💀' : '👽';
    }
    if (player !== (player1turn ? player1 : player2) || !gameInProgress) return;
    setTimeout(() => {
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
      winCheck(player);
      player1turn = !player1turn;
      player = player1turn ? player1 : player2;

      functionDict[player.algorithm](player);
    }, 50);
  };

  const ai3 = (player) => {
    player.mark = (player.id === 1) ? '🤖' : '👾';
    ai2(player);
  };

  // Enable function calling using fuction name in string format
  const functionDict = {
    human,
    ai1,
    ai2,
    ai3,
  };

  function winCheck(player) {
    if (gameBoard.some((row) => row.every((cell) => cell === player.mark))) {
      RESULT.innerText = `${player.mark} WINS!`;
      gameInProgress = false;
      winner = player;
      player.score++;
      P1_DISPLAY.innerText = `${player1.mark}: ${player1.score}`;
      P2_DISPLAY.innerText = `${player2.mark}: ${player2.score}`;
      return;
    }
    for (let col = 0; col < gameBoard.length; col++) {
      if (gameBoard.every((row) => row[col] === player.mark)) {
        RESULT.innerText = `${player.mark} WINS!`;
        gameInProgress = false;
        winner = player;
        player.score++;
        P1_DISPLAY.innerText = `${player1.mark}: ${player1.score}`;
        P2_DISPLAY.innerText = `${player2.mark}: ${player2.score}`;
        return;
      }
    }
    if (gameBoard.every((row, index) => row[index] === player.mark) ||
        gameBoard.every((row, index) => row[gameBoard.length - 1 - index]=== player.mark)) {
      RESULT.innerText = `${player.mark} WINS!`;
      gameInProgress = false;
      winner = player;
      player.score++;
      P1_DISPLAY.innerText = `${player1.mark}: ${player1.score}`;
      P2_DISPLAY.innerText = `${player2.mark}: ${player2.score}`;
      return;
    }
    if (gameBoard.every((row) => row.every((cell) => cell !== ''))) {
      RESULT.innerText = 'IT\'S A DRAW!';
      gameInProgress = false;
      winner = 'draw';
    }
  }

  const newGame = () => {
    player1.algorithm = document.getElementById('choosePlayer1').value;
    player2.algorithm = document.getElementById('choosePlayer2').value;
    if (gameInProgress === true || winner !== undefined) {
      P1_DISPLAY.innerText = ('PLAYER 1:');
      P2_DISPLAY.innerText = ('PLAYER 2:');
      DROPDOWN.forEach((menu) => menu.style.display = 'flex');
      GAME_BOARD_ELEMENT.style.display = 'none';
      INFO.style.visibility = 'visible';
      INFO.style.display = 'grid';
      RESULT.innerText = 'TIC TAC TOE';
      gameInProgress = false;
      winner = undefined;
      return;
    }
    player1turn = true;
    gameBoard.forEach((row) => row.fill(''));
    GRID_SQUARES.forEach((square) => (square.innerText = ''));
    RESULT.innerText = 'TIC TAC TOE';

    DROPDOWN.forEach((menu) => menu.style.display = 'none');
    gameInProgress = true;
    player1.mark = undefined;
    player2.mark = undefined;
    functionDict[player1.algorithm](player1);
    functionDict[player2.algorithm](player2);
    player1.score = 0;
    player2.score = 0;
    P1_DISPLAY.innerText = `${player1.mark}: 0`;
    P2_DISPLAY.innerText = `${player2.mark}: 0`;
    GAME_BOARD_ELEMENT.style.display = 'grid';
    INFO.style.visibility = 'hidden';
    INFO.style.display = 'none';
  };
  NEW_GAME_BTN.addEventListener('click', newGame);

  const rematch = () => {
    if (GAME_BOARD_ELEMENT.style.display !== 'grid') return;
    gameBoard.forEach((row) => row.fill(''));
    GRID_SQUARES.forEach((square) => (square.innerText = ''));
    RESULT.innerText = 'TIC TAC TOE';
    player1turn = true;
    gameInProgress = true;
    functionDict[player1.algorithm](player1);
    functionDict[player2.algorithm](player2);
  };
  REMATCH_BTN.addEventListener('click', rematch);
  console.log('alright');
})();
