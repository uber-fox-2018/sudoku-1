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
    let i = 0
    // console.log(zeroCoord)
    while (i < zeroCoord.length){
      status = false;
      let coordX = zeroCoord[i][0]
      // console.log(coordX)
      let coordY = zeroCoord[i][1]
      // console.log(coordY)
      let number = board[coordX][coordY];
      while(!status && number<=9){
        // console.log(` coord x,y di solve----->${coordX},${coordY} `)
        if(this.checkRow(board,coordX,number) && this.checkCol(board,coordY,number) && this.checkBox(board,coordX,coordY,number)){
        // && this.checkCol(board,coordY,number) && this.checkBox(board,coordX,coordY,number))){
          status = true
          // console.log('---ini number di solve',number)
          // console.log('---ini board di solve',board[coordX][coordY])
          board[coordX][coordY] = number;
          // number = 1
        }else{
          number++
          // console.log('---ini number di solve yg di ++',number)
        }
      }
      if(status == false){
        board[coordX][coordY] = 0
        i--
      }else{
        i++
      }
    }
    console.log(board)
    return ''   
  }

  checkRow(board,coordX,number){
    // console.log(number);
    
    for(let i = 0; i<9; i++){
      if(number === board[coordX][i] ){
        // console.log(`coord x,y di row ----> ${coordX},${i}`);
        // console.log('ini nilai dari coord board di checkrow ',board[coordX][i]);
        
        return false
      }
    }
    return true
  }

  checkCol(board,coordY,number){
    for(let i = 0; i<9 ; i++){
      if( number === board[i][coordY]){
        // console.log(`coord x,y di col ----> ${i},${coordY}`);
        // console.log('ini nilai dari coord board di checkcol ',board[i][coordY]);
        return false
      }
    }
    return true
  }

  checkBox(board,coordX,coordY,number){
    for(let i = coordX; i<coordX+3; i++){
      for(let j = coordY; j<coordY+3; j++){
        if(board[coordX][coordY] === number){
          // console.log(`coord x,y di box ===----> ${coordX},${coordY}`);
        // console.log('ini nilai dari coord board di  === checkbox ',board[coordX][coordY]);
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
    // let str =''
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
console.log(game.board())
console.log('=====================================')
game.solve()
// game.checkCoord()
// game.checkRow()

