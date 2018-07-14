"use strict"

class Sudoku {
    constructor(board_string) {
        this.board_size = 9;
        this.box_size = 3;
        this.char_empty = '0';
        this.board = [];
        this.empty_positions = [];

        this.parseStringToBoard(board_string);
    }

    solve() {
        let initNum, validNum, row, col, i = 0;
        while (i < this.empty_positions.length) {
            row = this.empty_positions[i][0];
            col = this.empty_positions[i][1];

            initNum = this.board[row][col];
            validNum = this.getValidNumber(+initNum, row, col);

            if (validNum === -1) {
                this.board[row][col] = this.char_empty;
                i--;
            }
            else {
                this.board[row][col] = validNum;
                i++;
            }
        }
    }

    // Returns a string representing the current state of the board
    printBoard() {
        let stringBoard = '-------------------------\n';
        for (let i = 0; i < this.board.length; ++i) {
            stringBoard += '| ';
            for (let j = 0; j < this.board[i].length; ++j) {
                if (this.board[i][j] === this.char_empty)
                    stringBoard += '  ';
                else
                    stringBoard += this.board[i][j] + ' ';
                if (j % this.box_size === this.box_size - 1)
                    stringBoard += '| ';

            }
            stringBoard += '\n';
            if (i % this.box_size === this.box_size - 1)
                stringBoard += '-------------------------\n'

        }
        return stringBoard;
    }

    parseStringToBoard(board_string) {
        let i = 0;
        let row;
        while (i < board_string.length - 1) {
            row = [];
            for (let j = 0; j < this.board_size; j++) {

                if (board_string[i] === this.char_empty)
                    this.empty_positions.push([Math.floor(i / this.board_size), j]);

                row.push(board_string[i]);
                i++;
            }
            this.board.push(row);
        }
    }

    getValidNumber(initNum, row, col) {
        if (initNum === 0) initNum++;
        for (let num = initNum; num <= 9; num++) {
            if (this.isNumberValid(num.toString(), row, col))
                return num.toString();
        }
        return -1;
    }

    isNumberValid(num, y, x) {

        return !this.getRow(y).includes(num) &&
            !this.getCol(x).includes(num)
        !this.getBox(y, x).includes(num);
    }

    getRow(row) {
        let result = [];
        for (let col = 0; col < this.board_size; col++) {
            if (this.board[row][col] !== this.char_empty)
                result.push(this.board[row][col]);
        }
        return result;
    }

    getCol(col) {
        let result = [];
        for (let row = 0; row < this.board_size; row++) {
            if (this.board[row][col] !== this.char_empty)
                result.push(this.board[row][col]);
        }
        return result;
    }

    initBoxPos(num) {
        return num - (num % this.box_size);
    }

    getBox(row, col) {
        let result = [];
        let initSectionY = this.initBoxPos(row);
        let initSectionX = this.initBoxPos(col);

        for (let y = initSectionY; y < this.box_size + initSectionY; y++) {
            for (let x = initSectionX; x < this.box_size + initSectionX; x++) {
                if (this.board[y][x] !== this.char_empty)
                    result.push(this.board[y][x]);
            }
        }
        return result;
    }

}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
    .toString()
    .split("\n")[0];

var game = new Sudoku(board_string);

// Remember: this will just fill out what it can and not "guess"
game.solve();

console.log(game.printBoard())
