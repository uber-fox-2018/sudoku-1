"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string=board_string      // list number awal
    this.board=[]                       // papan/board disiapkan
    this.coordXY=[]
    this.X
    this.Y
  }


  // Buat board & 'lempar' ke properties
  generateBoard() { 
    var idxString=0
    for (let i=0; i<9; i++) {
      var line= []
        for (let j=0; j<9; j++) {
          line.push(Number(board_string[idxString]))
          idxString++          
        }
      this.board.push(line)  
    }
  }


  solve() {
    console.clear()
    this.generateBoard()
    console.log('Initial Layout:')
    console.log(this.board)
    this.sleep(10000)
    console.clear()
    
    for (let i=0; i<this.board.length; i++) {
      for (let j=0; j<this.board.length; j++) {

        if (this.board[i][j]==0) {
          var coord={}
          coord.X= i
          coord.Y= j
          this.coordXY.push(coord)
          this.X= i
          this.Y= j

          
          for (var num=1; num<=9; num++ ) {
            let check1= this.checkHor(num)
            let check2= this.checkVer(num)
            let check3= this.checkBox(num)

            if (check1===true && check2===true && check3=== true) {
              this.board[i][j]=num
              console.log(this.board)
              this.sleep(400)
              console.clear()
            }
          }
        }
      }
    } 
    console.log(this.board)
  }


  checkHor(num){
    for (let i=0; i<this.board.length; i++) {
      if (this.board[this.X][i] === num) {
        return false
      }
    }
    return true
  }
  
  checkVer(num){
    for (let i=0; i<this.board.length; i++) {
      if (this.board[i][this.Y] === num) {
        return false
      }
    }
    return true
  }

  checkBox(num){
    var startX = 0
    var startY=0

    if(this.X>=3 && this.X <=5){
      startX = 3
    }
    else if (this.X>5) {
      startX = 6
    }

    if(this.Y>=3 && this.Y <=5){
      startY = 3
    }
    else if (this.Y>5) {
      startY = 6
    }

    for(let i=startX ;i<startX+3 ;i++){
      for(let j=startY ;j<startY+3 ;j++){ 
        if(this.board[i][j] === num){
          return false;
        }
      }
    }
    return true;
  }


  sleep (milliseconds) {
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

// EXECUTION //
game.solve()