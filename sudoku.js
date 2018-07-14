"use strict"

class Sudoku {
  constructor(board_string) {
    this.board = this.generateBoard(board_string)
    this.pos = this.savePosition(this.board)
  }

  // Returns a string representing the current state of the board
  generateBoard(board_string) {
    
    var res = []
    var generator = 0
    for(let i = 0 ; i < 9; i++){
      let arr = []
      for(let j = 0 ; j < 9 ; j++){
        arr.push(Number(board_string[generator]))
        generator++
      }
      
      res.push(arr)
    }
    return res
  }
  savePosition(board){
    var papan = this.board
    var result = []
    for(let i = 0 ; i < papan.length ; i++){
      for(let j = 0 ; j < papan.length ; j++){
        let arr = []
        if(Number(papan[i][j]) === 0){
          arr.push(i,j)
          result.push(arr)
        }
      }
    }
    return result
  }
  checkV(board, num, row){
    for(let i = 0 ; i < 9 ; i++){
      if(num === board[row][i]){
        return false
      }
    }
    return true
  }
  checkH(board,num,col){
    for(let i = 0 ; i < 9 ; i++){
      if(num === board[i][col]){
        return false
      }
    }
    return true
  }
  check9x9(board,num,row,col){
    var h = Math.floor(row / 3) * 3
    var v = Math.floor(col / 3) * 3
    for(let i = h ; i < h+3 ;i++){
      for(let j = v ; j < v+3 ; j++){
        if(num === board[i][j]){
          return false
        }
      }
    }
    return true
  }
  checkPapan(board,num,row,col){
    if(this.checkH(board,num,row) === true && this.checkV(board,num,col) && this.check9x9(board, num,row,col) === true){
      return true
    }
    return false
  }
  solve() {
    let num = 0; 
    let board = this.board;
    let unsolved = this.pos;
    let inserted = false;
    let i = 0;
    
    while (i < unsolved.length) {
      inserted = false;
      let vPos = unsolved[i][0];
      let hPos = unsolved[i][1];
      num = board[vPos][hPos];
      while (inserted === false && num <= 9) {
        if (this.check9x9(board, num, vPos, hPos) === true) {
          inserted = true;
          board[vPos][hPos] = num;
        } else {
          num++;
        }
      }
      if (inserted === false) {
        board[vPos][hPos] = 0;
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