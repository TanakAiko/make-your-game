export class Tetromino {
    constructor(shape, position, type) {
        this.shape = shape
        this.position = position
        this.type = type
    }
    // getting a tetro randomly
    setRandomTetromino() {
        const tamp = tabTetrominos[Math.floor(Math.random() * tabTetrominos.length)];
        this.type = tamp.type
        this.shape = JSON.parse(JSON.stringify(tamp.shape))
        this.position = JSON.parse(JSON.stringify(tamp.position))
    }
    // function to delete a tetro
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
    // function to add a tetro
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
    // functionto rotate the current tetro
    rotate(board) {
        let divDel = this.deletoTetro(board)

        if (this.position[0] + this.shape[0].length > board.grid.length) return;

        if (this.position[1] + this.shape.length > board.grid[0].length) return;

        var newShape = []
        for (let j = 0; j < this.shape[0].length; j++) {
            var newLine = []
            for (let i = this.shape.length - 1; i >= 0; i--) {
                var block = this.shape[i][j]
                newLine.push(block)
            }
            newShape.push(newLine)
        }

        for (let i = 0; i < newShape.length; i++) {
            const line = newShape[i];
            for (let j = 0; j < line.length; j++) {
                if (line[j] === 'void') continue
                if (board.grid[this.position[0] + i][this.position[1] + j] !== 'void') {
                    this.addoTetro(board)
                    return
                }
            }
        }

        this.shape = newShape

        let divAdd = this.addoTetro(board)
        return { divAdd, divDel }
    }
    // functionto move down the current tetro
    moveDown(board) {
        if (this.isColliding('down', board)) return 'goNext';

        let divDel = this.deletoTetro(board)

        this.position[0]++

        let divAdd = this.addoTetro(board)
        return { divAdd, divDel }
    }
    // functionto move on left the current tetro
    moveLeft(board) {
        if (this.isColliding('left', board)) return;

        let divDel = this.deletoTetro(board)

        this.position[1]--

        let divAdd = this.addoTetro(board)
        return { divAdd, divDel }
    }
    // functionto move on right the current tetro
    moveRight(board) {
        if (this.isColliding('right', board)) return;

        let divDel = this.deletoTetro(board)

        this.position[1]++

        let divAdd = this.addoTetro(board)
        return { divAdd, divDel }
    }
    // checking if there is colliding with the limits of the grid or with other tetro
    isColliding(direction, board) {
        switch (direction) {
            case 'left':
                if (this.position[1] === 0) return true;

                for (let i = 0; i < this.shape.length; i++) {
                    for (let j = 0; j < this.shape[0].length; j++) {
                        if (this.shape[i][j] === 'void') continue
                        if (board.grid[this.position[0] + i][this.position[1] + j - 1] !== 'void') return true
                        break
                    }
                }

                break;
            case 'right':
                if (this.position[1] + this.shape[0].length === board.grid[0].length) return true;

                for (let i = 0; i < this.shape.length; i++) {
                    for (let j = this.shape[0].length - 1; j >= 0; j--) {
                        if (this.shape[i][j] === 'void') continue
                        if (board.grid[this.position[0] + i][this.position[1] + j + 1] !== 'void') return true
                        break
                    }
                }

                break;
            case 'down':
                if (this.position[0] + this.shape.length === board.grid.length) return true;

                for (let j = 0; j < this.shape[0].length; j++) {
                    for (let i = this.shape.length - 1; i >= 0; i--) {
                        if (this.shape[i][j] === 'void') continue
                        if (board.grid[this.position[0] + i + 1][this.position[1] + j] !== 'void') return true
                        break
                    }
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