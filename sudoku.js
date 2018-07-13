"use strict"

class Sudoku {
  constructor(board_string) {
    this.board = this.board(board_string);
    this.zeroPos = this.getZero(this.board);

  }
  // Returns a string representing the current state of the board
  board(board_string) {
    let mainBoard = [];
    let index = 0;
    for (let i = 0; i < 9; i++) {
      let innerBoard = [];
      for (let j = 0; j < 9; j++) {
        innerBoard.push(parseInt(board_string[index]));
        index++;
      }
      mainBoard.push(innerBoard);
    }
    return mainBoard; //array of unsolved board
  }

  getZero(board) {
    let position = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === 0) {
          position.push([i, j]);
        }
      }
    }
    // console.log(position);
    return position;
  }

  checkRow(board, num, row) {
    for (let i = 0; i < 9; i++) {
      if (num === board[row][i]) {
        return false;
      }
    }
    return true;
  }

  checkCol(board, num, col) {
    for (let i = 0; i < 9; i++) {
      if (num === board[i][col]) {
        return false;
      }
    }
    return true;
  }

  checkGrid(board, num, row, col) {
    let horizontal = Math.floor(row / 3) * 3;
    let vertical = Math.floor(col / 3) * 3;
    for (let i = horizontal; i < horizontal + 3; i++) {
      for (let j = vertical; j < vertical + 3; j++) {
        if (num === board[i][j]) {
          return false;
        }
      }
    }
    return true;
  }

  checkBoard(board, num, row, col) {
    if (this.checkGrid(board, num, row, col) === true &&
      this.checkRow(board, num, row) === true &&
      this.checkCol(board, num, col) === true) {
      return true;
    }
    return false;
  }

  solve() {
    let num = 0; //limit is 9
    let board = this.board;
    let unsolved = this.zeroPos; //coordinates of 0
    // console.log(unsolved[0]);
    let completedStatus = false;
    let i = 0;

    while (i < unsolved.length) {
      completedStatus = false;
      let rowPos = unsolved[i][0];
      let colPos = unsolved[i][1];
      num = board[rowPos][colPos];
      while (completedStatus === false && num <= 9) {
        if (this.checkBoard(board, num, rowPos, colPos) === true) {
          completedStatus = true;
          board[rowPos][colPos] = num;
        } else {
          num++; //move on to next number
        }
      }
      if (completedStatus === false) {
        board[rowPos][colPos] = 0;
        i--;
      } else {
        i++;
      }
    }
  }
}
// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve()

console.log(game.board)
// console.log(game.getZero);

