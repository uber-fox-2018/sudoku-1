"use strict"

class Sudoku {
  constructor(board_string) {
    this.string = Number(board_string)
    this.sudokuBoard = this.boardArray(board_string)
    this.emptyCoordinate = this.emptyCoordinate(this.sudokuBoard)
  }

  boardArray(string) {
    let outputBoard = [] 
    let filledBoard = []

    for (let i in string) {
      filledBoard.push(string[i])
      if (filledBoard.length == 9) {
        outputBoard.push(filledBoard)
        filledBoard = []
      }
    }
    return outputBoard
  }

  emptyCoordinate(sudokuBoard) {
    let emptyPosition = []
    for (let i in sudokuBoard) {
      for (let j in sudokuBoard[i]) { 
        if (sudokuBoard[i][j] == 0) {
          emptyPosition.push([i,j])
        }
      }
    }
    return emptyPosition
  }

  checkRow(sudokuBoard, row, value) { // value = number in the same row
    for (let i in sudokuBoard[row]) { // i = column
      if (sudokuBoard[row][i] === value) {
        return false
      }
    }
    return true
  }

  checkColumn (sudokuBoard, col, value) {
    for (let i in sudokuBoard) {
      if (sudokuBoard[i][col] === value) { // i = row
        return false
      }
    }
    return true
  }

  check3x3Box(sudokuBoard, row, col, value) {
    let boxRow = Math.floor(row/3) * 3
    let boxCol = Math.floor(col/3) * 3

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (sudokuBoard[i+boxRow][j+boxCol] === value) {
          return false
        }
      }
    }
    return true
  }

  checkAllCondition(sudokuBoard, row, col, value) {
    if (this.checkRow(sudokuBoard, row, value) && 
    this.checkColumn(sudokuBoard, col, value) &&
    this.check3x3Box(sudokuBoard, row, col, value)) {
      return true
    } else {
      return false
    }
  }

  solve() {
    
  }

  // Returns a string representing the current state of the board
  board() {

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

console.log(`===================Sudoku board==========`)
console.log(game.boardArray(board_string))
console.log(`=========+Empty Coordinates================`)
console.log(game.emptyCoordinate)
console.log(game.checkRow(board_string, 0, 1))
//console.log(game.sudokuBoard)
//console.log(game.board())
