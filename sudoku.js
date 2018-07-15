// "use strict"

class Sudoku {
  constructor(board_string) {
    this.number = board_string
    this.board = this.board(this.number)
    this.check = this.checkBack(this.board)

  }

  solve() {
    let index = this.checkBack()
    for (let i = 0; i < index.length;) {
      let row = index[i][0]
      let col = index[i][1]
      let value = this.board[row][col]
      let boolean = false
      while (boolean !== true && value <= 9) {
        if (this.checkValue(this.board, col, row, value)) {
           this.board
          boolean = true
          this.board[row][col] = value
          i++
        }
        else {
          value++
        }
      }
      
      if (boolean === false) {
        this.board[row][col] = 0
        i--
      }
    }

  }


    // Returns a string representing the current state of the board
    board(number) {
      let createBoard = []
      let countBoard = 0
      for (let i = 0; i < 9; i++) {
        let arrBoard = []
        for (let j = 0; j < 9; j++) {
          arrBoard.push(Number(number[countBoard]))
          countBoard += 1
        }
        createBoard.push(arrBoard)
      }
      return createBoard
    }
    // console.log(board())
  
    //Pengecekan angka 0 
    checkBack() { 
      let arrIndex = []
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (this.board[i][j] === 0) {
            arrIndex.push([i, j])
          }
        }
      }
      return arrIndex
    }
  
    //penggecekan untuk perbaris
    cekBaris(board, row, value) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === value) {
          return false
        }
      }
      return true
    }
    //pengecekan dalam per-Kolom
    cekKolom(board, col, value) {
      for (let row = 0; row < board.length; row++) {
        if (board[row][col] === value) {
          return false
        }
      }
      return true
    }
  
    // pengecekan untuk baris dan kolom, dan per-box 3x3
    cekAll(board, col, row, value) {
      let boxCol = Math.floor(col / 3) * 3;
      let boxRow = Math.floor(row / 3) * 3;

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
      return this.cekBaris(board, row, value) && this.cekKolom(board, col, value) && this.cekAll(board, col, row, value)
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
// game.board()
// console.log(game.board())


