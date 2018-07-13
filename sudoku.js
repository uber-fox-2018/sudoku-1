"use strict"

class Sudoku {
  constructor(board_string){
    this.dataSample = board_string;
  }

  coordZero(){
    let result = []
    let board = this.board();
    // console.log(mainBoard)
    for(let i = 0; i<board.length; i++){
      // let row = [];
      for(let j = 0; j<board[i].length; j++){
        let coord = []
        if(board[i][j] === 0){
          coord.push(i)
          coord.push(j)
          // row.push(coord)
          result.push(coord)
        }
      }
    }
    // console.log(result)
    return result
  }

  solve(){
    let board = this.board()
    let zeroCoord = this.coordZero()
    let status = false
    for(let i = 0; i < zeroCoord.length; i++){
      status = false;
      let coordX = zeroCoord[i][0]
      // console.log(coordX)
      let coordY = zeroCoord[i][1]
      // console.log(coordY)
      let number = 1;
      while(!status && number<=9){
        if(this.checkRow(board,coordX,coordY,number && this.checkCol(board,coordY,number) && this.checkBox(board,coordX,coordY,number))){
        // && this.checkCol(board,coordY,number) && this.checkBox(board,coordX,coordY,number))){
          status = true
          console.log('ini board',board[coordX][coordY])
          console.log('ini number',number)
          board[coordX][coordY] = number;
          number = 1
        }else{
          number++
        }
      }
      
    }
    console.log(board)
    return ''   
  }

  checkRow(board,coordX,number){
    for(let i = 0; i<board[coordX].length; i++){
      if(board[coordX][i] === number ){
        // console.log('ini boardcoord', board[coordX][i])
        // console.log('ini number', number)
        return false
      }
    }
    return true
  }

  checkCol(board,coordY,number){
    for(let i = 0; i<board.length ; i++){
      if(board[i][coordY] === number){
        return false
      }
    }
    return true
  }

  checkBox(board,coordX,coordY,number){
    let rowBox = Math.floor(coordX/3)*3;
    let colBox = Math.floor(coordY/3)*3;
    for(let i = rowBox; i<rowBox+3; i++){
      for(let j = colBox; j<colBox+3; j++){
        if(board[i][j] === number){
          return false
        }
      }
    }
    return true
  }



  // Returns a string representing the current state of the board
  board(){
    let mainBoard = []
    let dataNumber = this.dataSample
    let indexData = 0
    // console.log(this.dataSample)
    for(let i = 0; i<9; i++ ){
      let row =[];
      mainBoard.push(row);
      for(let j = 0; j<9; j++){
        row.push(Number(dataNumber[indexData]))
        indexData++
      }
    }
    return mainBoard
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
// console.log(game.board())
// game.checkCoord()
// game.checkRow()

