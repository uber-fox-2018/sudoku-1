"use strict"

class Sudoku {
  constructor(board_string) {
    this.string = board_string
    this.sudokuBoard = this.sudokuBoard(board_string)
    this.emptyCoordinate = this.emptyCoordinate(this.sudokuBoard)
  }

  sudokuBoard(string) {
    let outputBoard = [] 
    let counter = 0

    for (let i = 0; i < 9; i++) {
      let filledBoard = []
      for (let j = 0; j < 9 ; j++) {
        filledBoard.push(Number(string[counter]))
        counter+=1
      }
      outputBoard.push(filledBoard)
    }
    return outputBoard
  }

  emptyCoordinate() {
    let emptyPosition = []
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if(this.sudokuBoard[i][j] === 0) {
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

    for (let i = 0; i < boxRow + 3; i++) {
      for (let j = 0; j < boxCol + 3; j++) {
        if (sudokuBoard[boxRow][boxCol] === value) {
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
    for (let i = 0; i < this.emptyCoordinate.length;) {
      let row = this.emptyCoordinate[i][0]
      let col = this.emptyCoordinate[i][1]
      let isSolved = false
      let value = this.sudokuBoard[row][col]
      while (isSolved === false && value <= 9) {
        if(this.checkAllCondition(this.sudokuBoard, row, col, value)) {
          this.sleep(100)
          this.boardReset()
          console.log(this.sudokuBoard)
          isSolved = true
          this.sudokuBoard[row][col] = value
          i++
        } else {
          value++
        }
      }

      // Backtrack
      if (isSolved === false) {
        this.sudokuBoard[row][col] = 0
        i--
      }
    }
    console.log(`========================================`)
    console.log(this.sudokuBoard)
    console.log(`========================================`)
    console.log(`Sudoku is solved`)
    return ''
  }

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

// console.log(`===================Sudoku board==========`)
//console.log(game.boardArray(board_string))
// console.log(`=========+Empty Coordinates================`)
// onsole.log(game.blank)
// console.log(game.checkRow(board_string, 0, 1))
// console.log(game.sudokuBoard)

