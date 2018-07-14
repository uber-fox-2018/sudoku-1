"use strict"

class Sudoku {
  constructor(board_string) {
    
  }

  solve() {

  }
  
  // Returns a string representing the current state of the board
  board() {
    let sudoBoard = [];
    let counter = 0;
    for(let row = 0; row < 9; row++) {
      let numPerColumn = [];
      for(let col = 0; col < 9; col++) {
        numPerColumn.push(+board_string[counter]);
        counter++;
      }
      sudoBoard.push(numPerColumn);
    }

    return sudoBoard;

  }

  
  zeroChecker() {
    let board = this.board(board_string);
    let zeroIndex = [];
    for(let row = 0; row < board.length; row++) {
      for(let col = 0; col < board.length; col++) {
        if(board[row][col] === 0) {
          zeroIndex.push([row, col]);
        }
      }
    }

    return zeroIndex;

  }
    

  checker(candidat = 1) {
    let board = this.board();
    let box = board.length/3;
    for(let row = 0; row < board.length; row++) { 
      for(let col = 0; col < board[row].length; col++) {
        let thereIs = false;
        if(board[row][col] === candidat) {
          thereIs = true;
        }
        
      }
    }

    return board

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
game.board()

// console.log(game.board())
// console.log(game.zeroChecker());
console.log(game.checker());


