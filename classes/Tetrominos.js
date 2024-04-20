export class Tetromino {
    constructor(shape, position, type) {
        this.shape = shape
        this.position = position
        this.type = type
    }

    setRandomTetromino() {
        const tamp = tabTetrominos[Math.floor(Math.random() * tabTetrominos.length)];
        this.type = tamp.type
        this.shape = JSON.parse(JSON.stringify(tamp.shape))
        this.position = JSON.parse(JSON.stringify(tamp.position))
    }

    deletoTetro(board) {
        var divDel = []
        for (let i = 0; i < this.shape.length; i++) {
            const line = this.shape[i];
            for (let j = 0; j < line.length; j++) {
                if (line[j] === 'void') continue;
                board.grid[this.position[0] + i][this.position[1] + j] = 'void'
                divDel.push((this.position[0] + i) * 10 + (this.position[1] + j))
            }
        }
        return divDel
    }

    addoTetro(board) {
        var divAdd = []
        for (let i = 0; i < this.shape.length; i++) {
            const line = this.shape[i];
            for (let j = 0; j < line.length; j++) {
                const block = line[j];
                if (block === 'void') continue;
                board.grid[this.position[0] + i][this.position[1] + j] = block
                divAdd.push((this.position[0] + i) * 10 + (this.position[1] + j))
            }
        }
        return divAdd
    }

    rotate(board) {
        let divDel = this.deletoTetro(board)

        while (this.position[0] + this.shape[0].length > board.grid.length) this.position[0]--;

        while (this.position[1] + this.shape.length > board.grid[0].length) this.position[1]--;

        var newShape = []
        for (let j = 0; j < this.shape[0].length; j++) {
            var newLine = []
            for (let i = this.shape.length - 1; i >= 0; i--) {
                var block = this.shape[i][j]
                newLine.push(block)
            }
            newShape.push(newLine)
        }
        this.shape = newShape

        let divAdd = this.addoTetro(board)
        return { divAdd, divDel }
    }

    moveDown(board) {
        if (this.isColliding('down', board)) return 'goNext';

        let divDel = this.deletoTetro(board)

        this.position[0]++

        let divAdd = this.addoTetro(board)
        return { divAdd, divDel }
    }

    moveLeft(board) {
        if (this.isColliding('left', board)) return;

        let divDel = this.deletoTetro(board)

        this.position[1]--

        let divAdd = this.addoTetro(board)
        return { divAdd, divDel }
    }

    moveRight(board) {
        if (this.isColliding('right', board)) return;

        let divDel = this.deletoTetro(board)

        this.position[1]++

        let divAdd = this.addoTetro(board)
        return { divAdd, divDel }
    }

    isColliding(direction, board) {
        console.log(this.position);
        switch (direction) {
            case 'left':
                if (this.position[1] === 0) return true;

                for (let i = 0; i < this.shape.length; i++) {
                    if (this.shape[i][0] === 'void') continue
                    if (board.grid[this.position[0] + i][this.position[1] - 1] !== 'void') return true;
                }

                break;
            case 'right':
                if (this.position[1] + this.shape[0].length === board.grid[0].length) return true;
                break;
            case 'down':
                if (this.position[0] + this.shape.length === board.grid.length) return true;


                for (let j = 0; j < this.shape[0].length; j++) {
                    if (this.shape[this.shape.length-1][j] === 'void') continue
                    if (board.grid[this.position[0] + this.shape.length][this.position[1] + j] !== 'void') return true;
                }


                break;
        }
        return false
    }

}


const I = new Tetromino([
    ['I', 'I', 'I', 'I'],
], [0, 3], 'I')

const J = new Tetromino([
    ['J', 'void', 'void'],
    ['J', 'J', 'J'],
], [0, 3], 'J')

const L = new Tetromino([
    ['void', 'void', 'L'],
    ['L', 'L', 'L'],
], [0, 3], 'L')

const O = new Tetromino([
    ['O', 'O'],
    ['O', 'O'],
], [0, 4], 'O')

const S = new Tetromino([
    ['void', 'S', 'S'],
    ['S', 'S', 'void'],
], [0, 3], 'S')

const Z = new Tetromino([
    ['Z', 'Z', 'void'],
    ['void', 'Z', 'Z'],
], [0, 3], 'Z')

const T = new Tetromino([
    ['void', 'T', 'void'],
    ['T', 'T', 'T'],
], [0, 3], 'T')

export const tabTetrominos = [I, J, L, O, S, Z, T]