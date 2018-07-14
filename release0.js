//Release 0
"use strict"

class Sudoku {
  constructor(board_string) {
      this.string = board_string;
      this.board = [];
  }

  solve() {

    
  }

  // Returns a string representing the current state of the board
  generateBoard() {
    var box = [];
    var counter=0;
    //version 1
   
    for(var str of board_string){
      if(str==='0'){
        box.push(" ");
      }else{
        box.push(str + "");
      }
      if(box.length===9){
        this.board.push(box);
        box=[];
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

// console.log(game.board); //awalnya []
console.log(game.generateBoard());//tapi setelah digenerate
console.log(game.board);//jadi ada isi. Dan ini sudah jd property Sudoku, jd bisa diupdate datanya tanpa kena reset lagi dari awal
/* 
[ [ '1', ' ', '5', '8', ' ', '2', ' ', ' ', ' ' ],
  [ ' ', '9', ' ', ' ', '7', '6', '4', ' ', '5' ],
  [ '2', ' ', ' ', '4', ' ', ' ', '8', '1', '9' ],
  [ ' ', '1', '9', ' ', ' ', '7', '3', ' ', '6' ],
  [ '7', '6', '2', ' ', '8', '3', ' ', '9', ' ' ],
  [ ' ', ' ', ' ', ' ', '6', '1', ' ', '5', ' ' ],
  [ ' ', ' ', '7', '6', ' ', ' ', ' ', '3', ' ' ],
  [ '4', '3', ' ', ' ', '2', ' ', '5', ' ', '1' ],
  [ '6', ' ', ' ', '3', ' ', '8', '9', ' ', ' ' ] ]
*/