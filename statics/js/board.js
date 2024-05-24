export class Board {
    constructor() {
        this.grid 
    }
    // checking if there a completed line and remove it
    checkLines() {
        let state = false
        let nb = 0
        for (let y = 0; y < this.grid.length; y++) {
            if (this.grid[y].every(cell => cell !== 'void')) {
                this.grid.splice(y, 1);
                this.grid.unshift(Array(this.grid[0].length).fill('void'));
                state = true
                nb ++
            }
        }
        return {state, nb}
    }
    // placing a tetro
    placeTetro(tetro){
        for (let i = 0; i < tetro.shape.length; i++) {
            const line = tetro.shape[i];
            for (let j = 0; j < line.length; j++) {
                const block = line[j];
                this.grid[tetro.position[0] + i][tetro.position[1] + j] = block
            }
        }
    }
    // initiate a grid (the game)
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