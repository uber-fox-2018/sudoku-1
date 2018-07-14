"use strict"

class Sudoku {
  constructor(board_string) {
     this.displayboard = this.board()
    
  }

  solve() {
    let initBoard = this.board()
    let posisiKosong = this.koordinatBoardKosong()
    
    for(let i = 0; i < posisiKosong.length; i++){
      let posX = posisiKosong[i][0]
      let posY = posisiKosong[i][1]
      let value = 1

      let trigger = false
      
      while(!trigger && value <=9){
        if(this.checkHorizontal(posisiKosong[i],value,initBoard) && this.checkVertikal(posisiKosong[i],value,initBoard)){
          initBoard[posX][posY] = value
          trigger = true
        } else{
          value++
        }
      }

    }

    return initBoard

  }


  checkHorizontal(posisi,value,initBoard){

    for(let i = 0; i < initBoard.length; i++){
      if (initBoard[posisi[0]][i] === value){
        return false
      }
    }
    return true

  }

  checkVertikal(posisi,value,initBoard){
    for(let i = 0; i < initBoard.length; i++){
      if (initBoard[i][posisi[1]] === value){
        return false
      }
    }
    return true
  }

  allMatchNumber(){

  }


  // Returns a string representing the current state of the board
  board() {
    let boardArena = []
    let rulesPoint = 0
    for(let i = 0; i < 9; i++){
      let temp = []
      for(let j = 0; j < 9; j++){
        temp.push(Number(board_string[rulesPoint]))
        rulesPoint++
      }
      boardArena.push(temp)
    }
    return boardArena
  }

  // check empty koordinat 
  koordinatBoardKosong(){
    let resultKoordinat = []
    
    for(let i = 0; i < this.displayboard.length; i++){
      for(let j = 0; j < this.displayboard.length; j++){
        if(this.displayboard[i][j] === 0){
          let temp = []
          temp.push(i)
          temp.push(j)
          resultKoordinat.push(temp)
        }
      }
      
    }
    return resultKoordinat
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
// game.solve()
console.log(game.solve())
// console.log(game.board())
