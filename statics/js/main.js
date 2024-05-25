import { Tetromino } from "./Tetrominos.js";
import { Board } from "./board.js";
import { Game } from "./gamePanel.js";
import { ScoreManager } from "./scoreManager.js";
import { TimeManager } from "./timeManager.js";

var ongoingGame = false;
var isPaused = false;
var durationInSecond = 180;
var lastNamePlayer = ""
var lastScorePlayer  = 0
var indexPage = 0
var maxPage = 0

/*  up event listeners for each color in the `colorsList` array. When a color
button with an id in the format `#apply_color` is clicked, it will change the CSS styles dynamically
by updating the `headStyle` element's text content. */
const colorsList = ["orange", "red", "green", "violet", "blue", "cyan"];

let ws = new WebSocket("ws://localhost:8080/ws");
ws.onopen = function () {
  console.log("Connection is open...");
};

colorsList.forEach((c) => {
  document.querySelector("#apply_" + c).addEventListener("click", (e) => {
    e.preventDefault();

    let headStyle = document.getElementById("Style");
    headStyle.textContent = `
        .cell {
            background-color: black;
            background-image: none !important;
            box-shadow: none !important;
        }
        .activeCell {
            background-color: ${c} !important;
            background-image: linear-gradient(45deg, ${c}, 0.75) !important;
            box-shadow: 0 0 20px ${c} !important;
        }`;
    document.head.appendChild(headStyle);
  });
});

/*  control all the actions we have to do when a button is clicked */
var reStartButton = document.getElementById("reStartButton");
reStartButton.addEventListener("click", (event) => {
  if (!ongoingGame || (ongoingGame && isPaused)) {
    let scoreD = document.getElementById("scoreValue");
    scoreD.textContent = 0;
    isPaused = false;
    handleOneGame();
  }

  pauseButton.style.display = "block";
  resumeButton.style.display = "none";
  reStartButton.style.display = "none";
});
function rRListener() {
  return function (event) {
    if (event.key === "R" || event.key === "r") {
      reStartButton.click();
    }
  }
}
var rRHandle = rRListener()


var pauseButton = document.getElementById("pauseButton");
pauseButton.addEventListener("click", () => {
  resumeButton.style.display = "block";
  reStartButton.style.display = "block";
  pauseButton.style.display = "none";
  startButton.style.display = "none";
  if (!isPaused) {
    gameChanger.timer.pauseCountdown();
    stopGravityInterval(gravityInterval);
    document.removeEventListener("keydown", keydownHandler);
    isPaused = true;
  }
});
function pPListener() {
  return function (event) {
    if (event.key === "P" || event.key === "p") {
      pauseButton.click();
    }
  }
}
var pPHandle = pPListener()

var resumeButton = document.getElementById("resumeButton");
resumeButton.addEventListener("click", () => {
  if (isPaused && ongoingGame) {
    gameChanger.timer.resumeCountdown(endGame);
    document.addEventListener("keydown", keydownHandler);
    gravityInterval = requestAnimationFrame(moveTetro);
    isPaused = false;
  }
  pauseButton.style.display = "block";
  reStartButton.style.display = "none";
  resumeButton.style.display = "none";
});
function mMListener() {
  return function (event) {
    if (event.key === "M" || event.key === "m") {
      resumeButton.click();
    }
  }
}
var mMHandle = mMListener()

const percentilMess = document.getElementById("percentilMess")
const tableOfRanks = document.getElementById("showRank")
tableOfRanks.addEventListener("click", () => {
  ws.send("ToR")
  ws.onmessage = (event) => {
    displayTOR(event.data)
  }
})

document.getElementById("nextPage").addEventListener('click', (event => {
  if (indexPage === maxPage) return
    indexPage ++
    tableOfRanks.click()
}))

document.getElementById("prevPage").addEventListener('click', (event => {
  if (indexPage === 0) return
    indexPage --
    tableOfRanks.click()
}))

function displayTOR(data) {
  var tOr = document.getElementById("TOR")
  
  tOr.innerHTML = `
  <caption>Table of Ranks</caption>
  <tr>
  <th>Rank</th>
  <th>Name</th>
  <th>Score</th>
  <th>Time</th>
  </tr>`
  
  const tabPlayer = JSON.parse(data)
  const tabPage = chunk(tabPlayer, 5)
  maxPage = tabPage.length - 1
  const jsonData = tabPage[indexPage]

  jsonData.forEach(score => {
    tOr.innerHTML += `
    <tr>
    <th>${score.rank}</th>
    <th>${score.name}</th>
    <th>${score.score}</th>
    <th>${formatTime(score.time)}</th>
    </tr>
    `
  });
  document.getElementById("numPage").innerHTML = `
    <p>${indexPage+1}/${maxPage+1}</p>
  `
  setPersentilMess(lastNamePlayer, lastScorePlayer, tabPlayer)
  openScoreModal()
}

function setPersentilMess(name, score, tab) {
  const player = tab.filter(element => element.name === name && element.score === score )
  var percentil = Math.floor((player[0]?.rank/tab.length)*100)
  percentilMess.innerHTML = `
    <p>Congrats ${player[0]?.name}, you are in the top ${percentil}%, you're the number ${player[0]?.rank}.</p>
  `
}

function chunk(tab, size) {
  const subTab = [];
  for (let i = 0; i < tab.length; i += size) {
    subTab.push(tab.slice(i, i + size));
  }
  return subTab;
}

document.getElementById("scoreBack").addEventListener('click', (event) => {
  indexPage = 0
  percentilMess.style.display = "none"
  closeScoreModal()
})

function formatTime(time) {
  const minute = Math.floor(time / 60)
  const second = time % 60
  return `${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`
}

const startButton = document.getElementById("startButton");
startButton.addEventListener("click", () => {
  if (!ongoingGame) {
    handleOneGame();
  }
  pauseButton.style.display = "block";
  startButton.style.display = "none";
  tableOfRanks.style.display = "none"
});


/* document.addEventListener("keydown", function (event) {
  if (event.key === " ") {
    // Vérifie si la touche pressée est espace
    if (!isPaused) {
      startButton.click(); // Simule un clic sur le bouton de pause
    }
  }
}); */

var board = new Board();
var gameChanger = new Game(board);
var gravityInterval = null;
var lastMoveTime = performance.now();
var keydownHandler = listenKeyboard(gameChanger, board);
/* function which  starts the game  */
function handleOneGame() {
  ongoingGame = true;
  board.initGrid();

  var score = new ScoreManager(0, 0);
  var countdown = new TimeManager(1000 * durationInSecond);

  gameChanger.score = score;
  gameChanger.timer = countdown;
  gameChanger.timer.updateCountdown(endGame);

  var currentTetro = new Tetromino();
  var nextTetro = new Tetromino();
  nextTetro.setRandomTetromino();
  currentTetro.setRandomTetromino();

  gameChanger.currentTetro = currentTetro;
  gameChanger.nextTetro = nextTetro;

  board.placeTetro(gameChanger.currentTetro);
  gameChanger.render();
  gameChanger.renderNextTetroDiv(gameChanger.nextTetro);

  // Start the animation loop
  gravityInterval = requestAnimationFrame(moveTetro);

  document.addEventListener("keydown", keydownHandler);
  document.addEventListener("keydown", rRHandle);
  document.addEventListener("keydown", pPHandle);
  document.addEventListener("keydown", mMHandle);
}

/* function which controls the tetro's moving with requestAnimationFrame() */
function moveTetro() {
  const currentTime = performance.now();
  const deltaTime = currentTime - lastMoveTime;

  if (deltaTime >= 1000) {
    // Execute the action every second
    lastMoveTime = currentTime;
    const toUpdate = moveTetroDown(gameChanger, board);
    if (toUpdate !== undefined) gameChanger.update(toUpdate);
  }

  if (
    gameChanger.currentTetro.position[0] === 0 &&
    gameChanger.currentTetro.isColliding("down", board)
  ) {
    endGame();
    return; // stop the animation loop
  }

  gravityInterval = requestAnimationFrame(moveTetro);
}
/* function which ends the game when the time is over or we can't place a new tetro */
// var SCORE  = gameChanger.score.score;
// var TIME = gameChanger.countdown
function endGame() {
  stopGravityInterval(gravityInterval);
  ongoingGame = false;
  document.removeEventListener("keydown", keydownHandler);
  document.removeEventListener("keydown", rRHandle)
  document.removeEventListener("keydown", pPHandle)
  document.removeEventListener("keydown", mMHandle)
  openModal();
  pauseButton.style.display = "none";
  startButton.style.display = "block";
  tableOfRanks.style.display = "block"
  gameChanger.timer.stopCountdown();
  let scoreFinal = document.getElementById("myScore");
  scoreFinal.textContent = gameChanger.score.score;

  let name = document.getElementById("playerName");

  function sendData() {
    let SCORE = gameChanger.score.score
    let TIME = durationInSecond - gameChanger.timer.remainingSeconds

    lastNamePlayer = name.value
    lastScorePlayer = SCORE

    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ name: name.value, score: +SCORE, time: +TIME, rank: 0 }));
    } else {
      console.log("WebSocket is not open. ReadyState: ", ws.readyState);
    }
  }

  var buttonOk = document.getElementById('submit');
  buttonOk.addEventListener("click", (event) => {
    if (name.value === "") return
    sendData();
    closeModal();
    name.value = ""
    percentilMess.style.display = "block"
    tableOfRanks.click()
  });
}

/* function which controls the keydown et execute an action for each key*/
function listenKeyboard(gameChanger, board) {
  return (event) => {
    var toUpdate;
    switch (event.key) {
      case "ArrowLeft":
      case "a":
      case "A":
        toUpdate = gameChanger.currentTetro.moveLeft(board);
        break;
      case "ArrowRight":
      case "d":
      case "D":
        toUpdate = gameChanger.currentTetro.moveRight(board);
        break;
      case "ArrowDown":
      case "s":
      case "S":
        toUpdate = moveTetroDown(gameChanger, board);
        break;
      case "ArrowUp":
      case "w":
      case "W":
        toUpdate = gameChanger.currentTetro.rotate(board);
        break;
    }
    if (toUpdate !== undefined) gameChanger.update(toUpdate);
  };
}

// stop the animation loop
function stopGravityInterval(gravityInterval) {
  cancelAnimationFrame(gravityInterval);
}
/* to move the tetro down if there is no colliding*/
function moveTetroDown(gameChanger, board) {
  var toUpdate = gameChanger.currentTetro.moveDown(board);
  if (toUpdate === "goNext") {
    let checkLine = board.checkLines();
    if (checkLine.state) gameChanger.render();
    gameChanger.score.addScore(checkLine.nb);
    gameChanger.currentTetro = gameChanger.nextTetro;
    board.placeTetro(gameChanger.currentTetro);
    var nextT = new Tetromino();
    nextT.setRandomTetromino();

    gameChanger.nextTetro = nextT;
    gameChanger.renderNextTetroDiv(gameChanger.nextTetro);

    toUpdate = {
      divDel: [],
      divAdd: gameChanger.currentTetro.addoTetro(board),
    };
    gameChanger.score.updateDisplay();
  }
  return toUpdate;
}

// open the modal
function openModal() {
  document.getElementById("myModal").style.display = "flex";
}

// close modal
function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

function openScoreModal() {
  document.getElementById("scoreModal").style.display = "flex";
}

// close modal
function closeScoreModal() {
  document.getElementById("scoreModal").style.display = "none";
}

// close modal id the user clicks out of it
/* window.onclick = function (event) {
  var modal = document.getElementById("myModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
 */