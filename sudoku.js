"use strict"
const Table = require('cli-table')

class Sudoku {
  constructor(board_string) {
    this.unsolved = board_string
  }

  solve() {
    const board = this.board()
    const table = new Table()
    const valueZero = this.findZero()
    const maxNum = 9
    debugger
    
    
    for (let i = 0; i < valueZero.length;) {
      let row = valueZero[i][0]
      debugger
      let col = valueZero[i][1]
      let number = board[row][col] + 1
      let isBoolean = false
      while (!isBoolean && number <= maxNum) {
        if (this.checkAll(number, valueZero[i], board)) {
          isBoolean = true
          board[row][col] = number
          i++
        } else {
          number++
        }
      }
      if (isBoolean === false) {
        board[row][col] = 0
        i--
      }
    }

    board.forEach(board => {
      table.push(board)
    })
    return table.toString()
  }

  
  board() {
    const strNum = this.unsolved
    let boardSudoku = []
    let index = 0
    var table = new Table();

    for (let i = 0; i < 9; i++) {
      var isiBoard = []
      for (let j = 0; j < 9; j++) {
        isiBoard.push(Number(strNum[index]))
        index++
      }
      boardSudoku.push(isiBoard)
    }

    return boardSudoku
  } 

  findZero() {
    const board = this.board()
    let zeroArr = []
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === 0) {
          zeroArr.push([i, j])
        }
      }
    }
    return zeroArr
  }

  checkAll (num, zeroIndex, board) {
    const horizontal = this.checkHorizontal(num, zeroIndex, board)
    const vertical = this.checkVertical(num, zeroIndex, board)
    const check3x3 = this.checkBox(num, zeroIndex, board)

    if (horizontal && vertical && check3x3) {
      return true
    }
    return false
  }

  checkHorizontal (num, zeroIndex, board) {
    for (let i = 0; i < board.length; i++) {
      if (board[zeroIndex[0]][i] === num) {
        return false
      }
    }
    return true
  }

  checkVertical (num, zeroIndex, board) {
    for (let i = 0; i < board.length; i++) {
      if (board[i][zeroIndex[1]] === num) {
        return false
      }
    }
    return true
  }

  checkBox(num, zeroIndex, board) {
    const col3x3 = Math.floor(zeroIndex[0] / 3) * 3
    const row3x3 = Math.floor(zeroIndex[1] / 3) * 3
    const size = 3

    for (let i = col3x3; i < size; i++) {
      for (let j = row3x3; j < size; j++) {
        if (board[i][j] === num) {
          return false
        }
      }
    }
    return true
  }

}

var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[5]

var game = new Sudoku(board_string)

// game.solve()

console.log(game.solve())
