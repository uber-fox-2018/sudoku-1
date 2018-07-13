"use strict"

class Sudoku {
  constructor(board_string) {
    this.sudoku_board = board_string
  }

  convertToArray(){
    let output = []
    let arrMid = []
    let size = 9

    for (let i = 0; i < size*size; i++) {
      // console.log(this.sudoku_board[i]);
      arrMid.push(Number(this.sudoku_board[i]))
      if (arrMid.length === size) {
        output.push(arrMid)
        arrMid = []
      }
    }
    return output
  }

  createBoard(){
    let board = this.convertToArray()
    let pembatas = '-----------------------------'
    let boardOutput = ''

    for (let i = 0; i < board.length; i++) {
      if (i === 0 || i === 3 || i === 6) {
        boardOutput += `${pembatas} \n`
      }
      for (let j = 0; j < board.length; j++) {
        if (j === 2 || j === 5) {
          boardOutput += ` ${board[i][j]} |`
        }else {
          boardOutput += ` ${board[i][j]} `
        }
      }
      boardOutput += '\n'
    }
    boardOutput += `${pembatas}`
    return boardOutput
  }

  check0value(){
    let board = this.convertToArray()
    let array0 = []
  
    for (let i = 0; i < board.length; i++) {
      let newArr = []
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] == '0') {
          newArr.push(i,j)
          array0.push(newArr)
          newArr = []
        }
      }
    }
    return array0
  }

  checkHorizontal(row,col,value){
    // let zero_value = this.check0value()
    let board = this.convertToArray()
    board[row][col] = value

    for (let i = 0; i < board.length; i++) {
      debugger;
        if (i !== col) {
          if (board[row][col] == board[row][i]) {
            return false
          }
        }
    }
    return true 
  }

  checkVertical(row,col,value){
    let board = this.convertToArray()
    board[row][col] = value

    for (let i = 0; i < board.length; i++) {
      if (i !== row) {
        if (board[row][col] == board[i][col]) {
          return false
        }
      }
    }
    return true
  }

  check3x3(row,col,value){
    let board = this.convertToArray()

    let boxRow = 0
    let boxCol = 0

    if (row <= 2 && row >= 0 && col <= 2 && col >= 0) {
      boxRow = 0
      boxCol = 0
    }else if (row <= 2 && col <= 5) {
      boxRow = 0
      boxCol = 3
    }else if (row <= 2 && col <= 8) {
      boxRow = 0
      boxCol = 6
    }else if (row <= 5 && col <= 2) {
      boxRow = 3
      boxCol = 0
    }else if (row <= 5 && col <= 5) {
      boxRow = 3
      boxCol = 3
    }else if (row <= 5 && col <= 8) {
      boxRow = 3
      boxCol = 6
    }else if (row <= 8 && col <= 2) {
      boxRow = 6
      boxCol = 0
    }else if (row <= 8 && col <= 5) {
      boxRow = 6
      boxCol = 3
    }else if (row <= 8 && col <= 8) {
      boxRow = 6
      boxCol = 6
    }

    for (let i = boxRow; i < boxRow+3; i++) {
      for (let j = boxCol; j < boxCol+3; j++) {
        if (i !== row) {
          if (j !== col) {
            if (board[i][j] === value) {
              return false
            }
          }
        }
      }
    }
    return true
  }

  combinationCheck(row,col,value){
    if (this.checkVertical(row,col,value) === true && this.checkHorizontal(row,col,value) === true && this.check3x3(row,col,value) === true) {
      return true
    }else {
      return false
    }
  }

  solve() {}

  // Returns a string representing the current state of the board
  board() {}
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)
console.log(game.createBoard());
console.log(game.convertToArray());
console.log(game.checkHorizontal(0,1,1));
console.log(game.checkVertical(1,0,3));
console.log(game.check3x3(5,1,1));




// Remember: this will just fill out what it can and not "guess"
// game.solve()

// console.log(game.board())


