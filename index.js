let grid = ["", "", "", "", "", "", "", "", ""];

const winCon = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 7],
];

const boxes = document.querySelectorAll(".box");
const startButton = document.querySelector(".js-start-button");
const playerTurnElement = document.querySelector(".player-turn");
let running = false;
let turn = "X";

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (running) {
      updateTurn(box, index);
      checkDraw();
    }
  });
});

startButton.addEventListener("click", startGame);

function startGame() {
  if (!running) {
    running = true;
    startButton.innerHTML = "Reset";
    playerTurnElement.innerHTML = `${turn}'s turn`;
    startButton.removeEventListener("click", startGame);
    startButton.addEventListener("click", resetGame);
  }
}

function updateTurn(box, index) {
  if (box.innerHTML === "") {
    saveTurn(index);
    box.innerHTML = turn;

    playerTurnElement.innerHTML = `${turn}'s turn`;
    checkWinner();
    turn = turn === "X" ? "O" : "X";
  }
}

function saveTurn(index) {
  grid[index] = turn;
}
function checkWinner() {
  for (let i = 0; i < winCon.length; i++) {
    const win = winCon[i];
    const win1 = win[0];
    const win2 = win[1];
    const win3 = win[2];
    if (
      grid[win1] === grid[win2] &&
      grid[win2] === grid[win3] &&
      grid[win1] !== ""
    ) {
      playerTurnElement.innerHTML = `${turn} won`;
      running = false;
      return;
    }
  }
}

function resetGame() {
  turn = "X";
  running = false;

  grid = ["", "", "", "", "", "", "", "", ""];
  playerTurnElement.innerHTML = "";

  boxes.forEach((box) => {
    box.innerHTML = "";
  });
  startButton.innerHTML = "Start";
  startButton.removeEventListener("click", resetGame);
  startButton.addEventListener("click", startGame);
}

function checkDraw() {
  for (let i = 0; i < grid.length; i++) {
    const element = grid[i];
    if (element === "") {
      return;
    }
  }

  playerTurnElement.innerHTML = "Draw!";
}
