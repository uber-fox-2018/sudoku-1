"use strict"

class Sudoku {
  constructor(board_string) {
    this.string = board_string
    this.rows = 9
    this.cols = 9
    this.board = []
    this.zeroPos = []
  }

  // Returns a string representing the current state of the board
  generateBoard() {
    // let mainBoard = []
    // console.log(this.board.length);
    let count = 0
    for(let i = 0; i < this.rows; i++) {
      let subBoard = []
      for(let j = 0; j < this.cols; j++) {
        subBoard.push(this.string[count])
        count++
      }
      this.board.push(subBoard)
    }
    //return this.board
  }

  checkZeroPos() {
    // let board = this.generateBoard()
    // let containZeroPos = []
    for(let i = 0; i < this.board.length; i++) {
      var subContain = []
      for(let j = 0; j < this.board[i].length; j++) {
        if(this.board[i][j] === '0') {
          subContain.push(i, j)
          this.zeroPos.push(subContain)
        }
        if(subContain.length === 2) {
          subContain = []
        }
      }
    }
    //return this.zeroPos
  }

  insertNumber() {
    let number = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
    for(let i = 0; i < this.zeroPos.length; i++) {
      let x = this.zeroPos[i][0]
      let y = this.zeroPos[i][1]
      // console.log(x, y);
        // console.log(unsolvedBoard[x][y]==='0');
      let search = true
      while(search === true) {
        for(let j = 0; j < number.length; j++) {
          if(this.checkCol(this.board, y, number[j]) === true && this.checkRow(this.board, x, number[j]) === true && this.check3x3(this.board, x, y, number[j]) === true) {
            // console.log('Row Ok!');
            // this.board[x][y] = number[j]
            console.log('cek Col : ',this.checkCol(this.board, y, number[j]) === true);
            console.log('cek Row : ',this.checkRow(this.board, x, number[j]) === true);
            console.log('cek 3x3 : ',this.check3x3(this.board, x, y, number[j]) === true)
            search = false;
            j = number.length-1
            return true
          }
        }
      }
    }
  }
  // bikin looping coordinat V
  // while 
  check3x3(board, x, y, number_i) {
    let coorX = Math.floor(x / 3) * 3;
    let coorY = Math.floor(y / 3) * 3;
    for (let i = coorX; i < coorX + 3; i++) {
      for (let j = coorY; j < coorY + 3; j++) {
        if (number_i === board[i][j]) {
          return false;
        }
      }
    }
    return true;
  }

  checkRow(board, x, number_i) {
    for(let i = 0; i < board.length; i++) {
      if(board[x][i] === number_i) {
        return false
      }
    }
    return true
  }

  checkCol(board, y, number_i) {
    let arr = []
    for(let i = 0; i < board.length; i++) {
      if(board[i][y] === number_i) {
        arr.push('1')
      }
    }
    if(arr.length === 0) {
      return true
    } else {
      return false
    }
  }

  // solve() {
  //   let number = 0;
  //   // let board = this.board;
  //   let blanks = this.zeroPos;
  //   let isSolved = false;
  //   let i = 0;
  //   while (i < blanks.length) {
  //     isSolved = false;
  //     let x = blanks[i][0];
  //     let y = blanks[i][1];
  //     number = this.board[x][y];
  //     while (isSolved === false && number <= 9) {
  //       if (this.checkCol(this.board, y, number[j]) === true && this.checkRow(this.board, x, number[j]) === true && this.check3x3(this.board, x, y, number[j]) === true) {
  //         isSolved = true;
  //         this.board[x][y] = number;
  //       } else {
  //         number++;
  //       }
  //     }
  //     if (isSolved === false) {
  //       this.board[x][y] = 0;
  //       i--;
  //     } else {
  //       i++;
  //     }
  //   }
  // }
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

// game.generateBoard()// this generate board from txt to arr multi
// game.checkZeroPos() // this for check pos zero in board
// game.insertNumber() //
console.log(game.board);
// console.log(game.zeroPos);