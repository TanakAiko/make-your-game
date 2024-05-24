export class Game {
    constructor(board, timer, score, currentTetro, nextTetro, isPaused) {
        this.board = board
        this.timer = timer
        this.score = score
        this.currentTetro = currentTetro
        this.nextTetro = nextTetro
        this.isPaused = isPaused
    }
    /*
    The function `deleteCommonElements` filters the first array to keep only elements that are not
    present in the second array.
     */
    deletoCommonElemennt(array1, array2) {
        // Filtrer le premier tableau pour ne garder que les éléments qui ne sont pas dans le deuxième tableau
        const resultat = array1.filter(element => !array2.includes(element));
        return resultat;
    }
    // updating the tetrominoes 
    update(toUpdate) {
        let allCell = document.getElementsByClassName('cell')
        for (const addCellIndex of this.deletoCommonElemennt(toUpdate.divAdd, toUpdate.divDel)) {
            allCell[addCellIndex].classList.add(this.currentTetro.type)
            allCell[addCellIndex].classList.add("activeCell")
        }
        for (const delCellIndex of this.deletoCommonElemennt(toUpdate.divDel, toUpdate.divAdd)) {
            allCell[delCellIndex].classList.remove(this.currentTetro.type)
            allCell[delCellIndex].classList.remove("activeCell")
        }
    }

    /**
     * The function `renderNextTetroDiv`  renders the next tetromino shape. The function `renderNextTetroDiv` is responsible for
    rendering this next tetromino piece in a designated HTML element with the id `nextTetroDiv`.
     */
    renderNextTetroDiv(nextTetro) {
        var nextTetroDiv = document.getElementById('nextTetroDiv')
        nextTetroDiv.innerHTML = '';
        if (nextTetro.type === 'I') {
            nextTetroDiv.style.gridTemplateColumns = 'repeat(4, 0fr)'
            nextTetroDiv.style.gridTemplateRows = 'repeat(1, 0fr)'
        } else if (nextTetro.type === 'O') {
            nextTetroDiv.style.gridTemplateColumns = 'repeat(2, 0fr)'
            nextTetroDiv.style.gridTemplateRows = 'repeat(2, 0fr)'
        } else {
            nextTetroDiv.style.gridTemplateColumns = 'repeat(3, 0fr)'
            nextTetroDiv.style.gridTemplateRows = 'repeat(2, 0fr)'
        }

        for (let line of nextTetro.shape) {
            for (let block of line) {
                const cellule = document.createElement('div');
                cellule.classList.add('cell')
                if (block !== 'void') {cellule.classList.add(block);cellule.classList.add("activeCell");}
                nextTetroDiv.appendChild(cellule);
            }
        }
    }
/*
The `render` function clears the old blocks on the game board, creates a new game board based on the
grid data, and adds active cells for non-void blocks.
 */
    render() {
        var plateau = document.getElementById('plateau')
        plateau.innerHTML = '';

        for (let line of this.board['grid']) {
            for (let block of line) {
                const cellule = document.createElement('div');
                cellule.classList.add('cell')
                if (block !== 'void') {cellule.classList.add(block);cellule.classList.add("activeCell");}
                plateau.appendChild(cellule);
            }
        }
    }
}
