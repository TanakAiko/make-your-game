export class Game {
    constructor(board, timer, score, currentTetro, nextTetro, isPaused) {
        this.board = board
        this.timer = timer
        this.score = score
        this.currentTetro = currentTetro
        this.nextTetro = nextTetro
        this.isPaused = isPaused
    }

    start() {

    }

    pause() {

    }

    resume() {

    }

    restart() {

    }

    deletoCommonElemennt(array1, array2) {
        // Filtrer le premier tableau pour ne garder que les éléments qui ne sont pas dans le deuxième tableau
        const resultat = array1.filter(element => !array2.includes(element));
        return resultat;
    }

    update(toUpdate) {
        console.log('toUpdate', toUpdate);
        let allCell = document.getElementsByClassName('cell')
        for (const addCellIndex of this.deletoCommonElemennt(toUpdate.divAdd, toUpdate.divDel)) {
            allCell[addCellIndex].classList.add(this.currentTetro.type)
        }
        for (const delCellIndex of this.deletoCommonElemennt(toUpdate.divDel, toUpdate.divAdd)) {
            allCell[delCellIndex].classList.remove(this.currentTetro.type)
        }
    }

    render() {
        //Supprimer les anciens blocs
        var plateau = document.getElementById('plateau')
        //plateau.innerHTML = '';

        // Créer le plateau de jeu
        for (let line of this.board['grid']) {
            for (let block of line) {
                const cellule = document.createElement('div');
                cellule.classList.add('cell')
                if (block !== 'void') cellule.classList.add(block)
                plateau.appendChild(cellule);
            }
        }
        //Afficher le Tetromino actuel
        //afficherTetromino(tetromino, position);
    }
}
