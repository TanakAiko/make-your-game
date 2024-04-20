import { Tetromino } from './classes/Tetrominos.js';
import { Board } from './classes/board.js'
import { Game } from './classes/gamePanel.js';

var board = new Board()
board.initGrid()

var gameChanger = new Game(board)
console.log(gameChanger.board);

var currentTetro = new Tetromino()
var nextTetro = new Tetromino()
nextTetro.setRandomTetromino()
currentTetro.setRandomTetromino()

gameChanger.currentTetro = currentTetro
gameChanger.nextTetro = nextTetro
console.log('currentTetro: ', gameChanger.currentTetro);
console.log('nextTetro: ', gameChanger.nextTetro);

const startButton = document.getElementById('startButton');
startButton.addEventListener('click', () => {
    console.log('Le bouton a été cliqué !');
    board.placeTetro(gameChanger.currentTetro)
    gameChanger.render()
});

document.addEventListener('keydown', (event) => {
    var toUpdate
    switch (event.key) {
        case 'ArrowLeft':
            toUpdate = gameChanger.currentTetro.moveLeft(board)
            break
        case 'ArrowRight':
            toUpdate = gameChanger.currentTetro.moveRight(board)
            break
        case 'ArrowDown':
            toUpdate = gameChanger.currentTetro.moveDown(board)
            if (toUpdate === 'goNext') {
                gameChanger.currentTetro = gameChanger.nextTetro
                board.placeTetro(gameChanger.currentTetro)

                var nextT = new Tetromino()
                nextT.setRandomTetromino()

                gameChanger.nextTetro = nextT
                console.log(gameChanger.nextTetro, '*********');
                
                toUpdate = {
                    divDel: [],
                    divAdd: gameChanger.currentTetro.addoTetro(board)
                }
            }
            break
        case 'ArrowUp':
            toUpdate = gameChanger.currentTetro.rotate(board)
            break
    }
    if (toUpdate !== undefined) gameChanger.update(toUpdate)
});

