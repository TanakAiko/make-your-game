export class Board {
    constructor() {
        this.grid 
    }

    checkLines() {
        for (let y = plateau.length - 1; y >= 0; y--) {
            if (plateau[y].every(cell => cell === 1)) {
                plateau.splice(y, 1);
                plateau.unshift(Array(plateau[0].length).fill(0));
            }
        }
    }

    placeTetro(tetro){
        for (let i = 0; i < tetro.shape.length; i++) {
            const line = tetro.shape[i];
            for (let j = 0; j < line.length; j++) {
                const block = line[j];
                this.grid[tetro.position[0] + i][tetro.position[1] + j] = block
            }
        }
    }

    initGrid() {
        var matrix = []
        for (let i = 0; i < 20; i++) {
            var line = []
            for (let i = 0; i < 10; i++) {
                line.push('void')
            }
            matrix.push(line)
        }
        this.grid = matrix
    }

}