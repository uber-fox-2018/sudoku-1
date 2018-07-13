"use strict"

class Sudoku {
  constructor(board_string) {
    this.number_sudoku = board_string
    this.alpha = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    this.mainBoard = this.board()
    this.zeroData = this.checkerBoard()
    console.log(this.mainBoard)
  }

  solve() {
    // console.log(this.zeroData[0][0]);
let indexA = 0
let indexB = 0
    for(let a=0; a<this.zeroData.length; a++){
      for(let b=0; b<this.zeroData[a].length; b++){
        indexA = this.zeroData[a][0]
        indexB = this.zeroData[a][1]
      }

    }
    
  }


  checkerBoard() {
    let zeroData = []
    for (let a = 0; a < this.mainBoard.length; a++) {
      for (let b = 0; b < this.mainBoard[a].length; b++) {
        if (this.mainBoard[a][0] === ' ') zeroData.push([a, b]) // check berdasar a dinamis b statis
        // if(this.mainBoard[a][0]) temp.push([a,b])
      }
      // if(temp.length != 0) zeroData.push(temp)
    }
    return zeroData
  }

  // Returns a string representing the current state of the
  board() {
    let gameBoard = []
    let dimensiBoard = this.number_sudoku.length / 9
    let temp = []

    for (let a = 0; a < this.number_sudoku.length; a++) {
      if (this.number_sudoku[a] !== '0') temp.push(this.number_sudoku[a])
      else temp.push(' ')
      if (temp.length == dimensiBoard) {
        gameBoard.push(temp)
        temp = []
      }

    }
    return gameBoard
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
// game.board(game)

// console.log(game.board())
// console.log(this.board)
// console.log(game.board())
// console.log(game.solve())
// console.log(game.checkerBoard())
console.log(game.solve());