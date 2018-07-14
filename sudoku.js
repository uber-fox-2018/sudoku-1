"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_size = 9;
    this.box_size = 3;
    this.char_empty = '0';
    this.board = [];

    this.parseStringToBoard(board_string);
  }

  solve() {
    // let initNum, validNum, row, col, i = 0;
    while (true) {
      let leastRows = this.searchLeastEmptyRows(),
        leastCols = this.searchLeastEmptyCols(),
        leastBoxes = this.searchLeastEmptyBoxes();

      //TO DO


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
        row.push(board_string[i]);
        i++;
      }
      this.board.push(row);
    }
  }

  getRandomInts(max) {
    let ints = [];
    let int;
    while (ints.length < max) {
      int = this.getRandomInt(max);
      if (!ints.includes(int))
        ints.push(int);
    }
    return ints;
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  searchLeastEmptyArray(arrays) {
    let count, array, i,
      indexes = [];
    let min = this.board_size - 1;
    for (i = 0; i < arrays.length; i++) {
      array = arrays[i];
      count = this.countEmptyCell(array);
      if (count === 0) {
        continue;
      }
      else if (count < min) {
        min = count;
        indexes = [];
        indexes.push(i);
      }
      else if (count === min) {
        indexes.push(i);
      }
    }
    return [min, indexes];
  }

  searchLeastEmptyRows() {
    return this.searchLeastEmptyArray(this.board);
  }

  searchLeastEmptyCols() {
    let columns = [];
    for (let i = 0; i < this.board_size; i++) {
      columns.push(this.getCol(i));
    }
    return this.searchLeastEmptyArray(columns);
  }

  searchLeastEmptyBoxes() {
    let boxes = [];
    for (let x = 0; x < this.board_size; x += this.box_size) {
      for (let y = 0; y < this.board_size; y += this.box_size) {
        boxes.push(this.getBox(y, x));
      }
    }
    return this.searchLeastEmptyArray(boxes);
  }

  countEmptyCell(arr) {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === this.char_empty)
        count++;
    }
    return count;
  }

  isNumberValid(num, y, x) {
    return !this.getRow(y).includes(num) &&
      !this.getCol(x).includes(num)
    !this.getBox(y, x).includes(num);
  }

  getRow(row) {
    let result = [];
    for (let col = 0; col < this.board_size; col++) {
      result.push(this.board[row][col]);
    }
    return result;
  }

  getCol(col) {
    let result = [];
    for (let row = 0; row < this.board_size; row++) {
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
//var hrstart = process.hrtime();

// Remember: this will just fill out what it can and not "guess"
//game.solve();
//var hrend = process.hrtime(hrstart);

//console.info("Execution time (hr): %ds %dms", hrend[0], hrend[1] / 1000000);

console.log(game.board)
// console.log('least row:', game.searchLeastEmptyRow());
// console.log('least col:', game.searchLeastEmptyCol());
// console.log('least box:', game.searchLeastEmptyBox());
console.log(game.searchLeastEmptyBoxes());

