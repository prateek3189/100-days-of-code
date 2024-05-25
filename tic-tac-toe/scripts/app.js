// All Elements
const players = [
  { name: "", symbol: "X" },
  { name: "", symbol: "O" },
];
const gameData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let currentRound = 1;
let selectedPlayerId = 0;
let activePlayer = 0;
let gameIsOver = false;

const playerConfigOverlayElement = document.getElementById("config-overlay");
const backdropElement = document.getElementById("backdrop");
const cancelOverlayElement = document.getElementById("cancel-overlay");
const editPlayer1BtnElement = document.getElementById("edit-pl-1");
const editPlayer2BtnElement = document.getElementById("edit-pl-2");
const formElement = document.querySelector("form");
const formErrorElement = document.getElementById("error-msg");
const startGameBtnElement = document.getElementById("start-game");
const gameAreaElement = document.getElementById("active-game");
const gameBoardElement = document.getElementById("game-board");
const gameBoardElements = document.querySelectorAll("#game-board li");
const activePlayernameElement = document.getElementById("active-player-name");
const gameOverElement = document.getElementById("game-over");

// All Events
editPlayer1BtnElement.addEventListener("click", openPlayerConfig);
editPlayer2BtnElement.addEventListener("click", openPlayerConfig);
cancelOverlayElement.addEventListener("click", closePlayerConfig);
backdropElement.addEventListener("click", closePlayerConfig);
formElement.addEventListener("submit", savePlayerForm);
startGameBtnElement.addEventListener("click", startNewGame);

for (const gameBoardElement of gameBoardElements) {
  gameBoardElement.addEventListener("click", selectGameField);
}
