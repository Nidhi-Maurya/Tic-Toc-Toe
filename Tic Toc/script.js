// Define variables
var player1Name = "";
var player2Name = "";
var currentPlayer = "";
var cells = document.querySelectorAll(".cell");
var player1Symbol = "";
var player2Symbol = "";
var moves = 0;
var winner = null;
var resetBTN = document.querySelector("#reseBtn");

// Function to start the game
function startGame() {
  player1Name = document.getElementById("player1").value.trim();
  player2Name = document.getElementById("player2").value.trim();

  if (player1Name === "" || player2Name === "") {
    alert("Please enter names for both players");
    return;
  }
  document.getElementById("player1").setAttribute("disabled", "true");
  document.getElementById("player2").setAttribute("disabled", "true");
  document.getElementById("chooseSymbol").style.display = "block";
}

// Function to choose symbol
function chooseSymbol(symbol) {
  player1Symbol = symbol;
  player2Symbol = symbol === "X" ? "O" : "X";
  currentPlayer = player1Name;
  document.getElementById("chooseSymbol").style.display = "none";
}

// Function to handle cell click
function handleClick(cellIndex) {
  if (!player1Symbol || !player2Symbol) return;

  // var cell = cells[cellIndex];
  var cell = document.querySelectorAll(".cell")[cellIndex];

  if (cell.textContent !== "" || winner) return;

  cell.textContent =
    currentPlayer === player1Name ? player1Symbol : player2Symbol;
  moves++;

  if (checkWinner()) {
    winner = currentPlayer;
    document.getElementById("winner").textContent =
      " Congratulations Winner is: " + winner;
    highlightWinnerCells();
  
  } else if (moves === 9) {
    document.getElementById("winner").textContent = "Draw";
 
  } else {
    currentPlayer = currentPlayer === player1Name ? player2Name : player1Name;
  }
}

// Function to check for a winner
function checkWinner() {
  var combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  for (var i = 0; i < combinations.length; i++) {
    var [a, b, c] = combinations[i];
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      return true;
    }
  }
  return false;
}

// Function to highlight winning cells
function highlightWinnerCells() {
  var combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  for (var i = 0; i < combinations.length; i++) {
    var [a, b, c] = combinations[i];
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      cells[a].style.backgroundColor =
        cells[b].style.backgroundColor =
        cells[c].style.backgroundColor =
          "lightgreen";
    }
  }
}

// Function to reset the game
function resetGame() {
  currentPlayer = player1Name;
  moves = 0;
  winner = null;
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.backgroundColor = "";
  });
  document.getElementById("winner").textContent = "";
}
