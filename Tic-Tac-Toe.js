// Initialize variables
let board = ['', '', '', '', '', '', '', '', ''];
let player = 'X';
let computer = 'O';
let isGameOver = false;

// Get elements from the DOM
const boardElement = document.getElementById('board');
const resetButton = document.getElementById('reset');

// Add event listener to the reset button
resetButton.addEventListener('click', reset);

// Draw the initial board
drawBoard();

// Function to draw the board
function drawBoard() {
  let cells = '';
  for (let i = 0; i < board.length; i++) {
    cells += `<div class="cell" data-index="${i}">${board[i]}</div>`;
  }
  boardElement.innerHTML = cells;

  // Add event listener to each cell
  const cellElements = document.querySelectorAll('.cell');
  cellElements.forEach((cell) => {
    cell.addEventListener('click', handleClick);
  });
}

// Function to handle a click on a cell
function handleClick(event) {
  // Check if the game is over or the cell is already filled
  if (isGameOver || event.target.innerHTML !== '') {
    return;
  }

  // Update the board and draw it again
  const index = event.target.dataset.index;
  board[index] = player;
  drawBoard();

  // Check if the game is over
  if (checkWinner(player)) {
    alert(`Congratulations! You won!`);
    isGameOver = true;
    return;
  } else if (checkDraw()) {
    alert(`It's a draw!`);
    isGameOver = true;
    return;
  }

  // Let the computer make a move after a delay
  setTimeout(() => {
    computerMove();
  }, 500);
}

// Function to let the computer make a move
function computerMove() {
  // Get a random empty cell on the board
  let index;
  do {
    index = Math.floor(Math.random() * board.length);
  } while (board[index] !== '');

  //Update the board and draw it again
board[index] = computer;
drawBoard();

// Check if the game is over
if (checkWinner(computer)) {
alert('Sorry, you lost!');
isGameOver = true;
return;
} else if (checkDraw()) {
alert("It's a draw!");
isGameOver = true;
return;
}
}

// Function to check if there is a winner
function checkWinner(player) {
// Check rows
if (
(board[0] === player && board[1] === player && board[2] === player) ||
(board[3] === player && board[4] === player && board[5] === player) ||
(board[6] === player && board[7] === player && board[8] === player)
) {
return true;
}

// Check columns
if (
(board[0] === player && board[3] === player && board[6] === player) ||
(board[1] === player && board[4] === player && board[7] === player) ||
(board[2] === player && board[5] === player && board[8] === player)
) {
return true;
}

// Check diagonals
if (
(board[0] === player && board[4] === player && board[8] === player) ||
(board[2] === player && board[4] === player && board[6] === player)
) {
return true;
}

// If no winner is found, return false
return false;
}

// Function to check if the game is a draw
function checkDraw() {
return !board.includes('');
}

// Function to reset the game
function reset() {
board = ['', '', '', '', '', '', '', '', ''];
player = 'X';
isGameOver = false;
drawBoard();
}
