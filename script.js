// Store the game status element and initialize game variables
const statusDisplay = document.querySelector('.gameStatus');
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

// Define messages for different game outcomes
const winningMessage = () => `Player ${currentPlayer} Has Lost 🥺`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn 😊`;

// Set initial message to indicate the current player's turn
statusDisplay.innerHTML = currentPlayerTurn();

// Function to handle a cell being played
function handleCellPlayed(clickedCell, clickedCellIndex) {
  // Update game state and interface to reflect the played move
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
  
  // Check for game result after each move
  handleResultValidation();
}

// Function to handle changing the active player
function handlePlayerChange() {
  statusDisplay.innerHTML = currentPlayerTurn();
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// Define winning conditions
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Function to handle result validation after each move
function handleResultValidation() {
  let roundWon = false;
  let roundDraw = !gameState.includes("");

  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];

    if (a === "" || b === "" || c === "") {
      continue;
    }

    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return;
  }

  if (!roundWon && roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
  }
  else{
  statusDisplay.innerHTML = currentPlayerTurn();
  }
}

// Function to handle a cell being clicked
function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute("data-cell-index"));

  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  handlePlayerChange();
  handleResultValidation();
}

// Function to handle game restart
function handleRestartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

// Add event listeners to cells and reset button
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.resetGame').addEventListener('click', handleRestartGame);
