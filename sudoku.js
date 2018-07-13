"use strict"

class Sudoku {
  constructor(board_string) {
    this.number = board_string
    this.board = this.board(this.number)
    this.check = this.checkZero(this.board)
  }

  board(number) {
    //Makes Board
    // let num = this.number
    let board = []
    let counter = 0
    for (let i = 0; i < 9; i++) {
      let arr = []
      for (let j = 0; j < 9; j++) {
        arr.push(Number(number[counter]))
        counter += 1
      }
      board.push(arr)
    }
    return board
  }

  checkZero() {
    //Checks space to be input later
    let index = []
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (this.board[i][j] === 0) {
          index.push([i, j])
        }
      }
    }
    return index
  }

  checkRow(board, row, value) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === value) {
        return false
      }
    }
    return true
  }

  checkCol(board, col, value) {
    for (let row = 0; row < board.length; row++) {
      if (board[row][col] === value) {
        return false
      }
    }
    return true
  }

  checkBox(board, col, row, value) {
    let boxRow = Math.floor(row / 3) * 3;
    let boxCol = Math.floor(col / 3) * 3;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i + boxRow][j + boxCol] == value) {
          return false;
        }
      }
    }
    return true;
  }

  checkValue(board, col, row, value) {
    return this.checkRow(board, row, value) && this.checkCol(board, col, value) && this.checkBox(board, col, row, value)
  }

  solve() {
    let input = this.checkZero()
    for (let i = 0; i < input.length;) {
      let row = input[i][0]
      let col = input[i][1]
      let value = this.board[row][col]
      let boolean = false
      while (boolean !== true && value <= 9) {
        if (this.checkValue(this.board, col, row, value)) {
          this.sleep(100)
          this.boardReset()
          console.log(this.board);
          boolean = true
          this.board[row][col] = value
          i++
        }
        else {
          value++
        }
      }
      //Backtracking trigger
      if (boolean === false) {
        this.board[row][col] = 0
        i--
      }
    }
    console.log(`#####################################`);
    console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
    console.log(this.board);
    console.log(`-----------Sudoku Solved!!!----------`);
    console.log(`#####################################`);

    return ''
  }

  // Returns a string representing the current state of the board
  boardReset() {
    console.log("\x1B[2J");
  }

  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
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

// console.log(game.board)
// console.log(game.check);


