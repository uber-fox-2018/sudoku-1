"use strict"

class Sudoku {
  constructor(board_string) {
    this.number = board_string;
    this.papan = this.board()
  }

  solve() {
    // this.papan= this.board();
    let addNumber = 1;
    let hitung = 0;
    for (let i = 0; i < this.papan.length; i++) {
      for (let j = 0; j < this.papan[i].length; j++) {
        if (Number(this.papan[i][j]) === 0) {
          for (let tebakan = 1; tebakan <= 9; tebakan++) {
            if (this.checkRow(tebakan, i, j, hitung) === true) {
              this.papan[i][j] = tebakan;
              break;
            }
          }

          // this.papan[i][j] = String(addNumber);
          // while (this.checkRow(Number(this.papan[i][j]), i, j) === false) {
          //   addNumber += 1;
          //   this.papan[i][j] = String(addNumber);
          // }
        }
      }
    }
    // console.log(hitung);
    return this.papan;
  }

  // Returns a string representing the current state of the board
  board() {
    let data = this.number;
    let sudokuBoard = [];
    let idxData = 0;
    for (let i = 1; i <= 9; i++) {
      let line = [];
      for (let j = 1; j <= 9; j++) {
        line.push(data[idxData])
        idxData += 1;
        if (j % 3 === 0 && j !== 9) {
          // line.push('|')
        }
      }
      sudokuBoard.push(line);
      if (i % 3 === 0 && i !== 9) {
        // sudokuBoard.push(' ')
      }
    }
    return sudokuBoard;
  }

  checkRow(angka, posisiX, posisiY, hitung) {
    // console.log(this.papan[posisiX][1])
    // let count = hitung;
    let container = null;
    for (let i = 0; i < 9; i++) {
      if (angka === Number(this.papan[posisiX][i]) && posisiY !== i) {
        console.log('angka proses ===>', angka, ' === ', this.papan[posisiX][i]);
        // break;
        return false;
      } else {
        if (container = null) {
          container = angka;
        }
      }
      // hitung += 1;
      // console.log(this.papan[posisiX][i], 'ini hitung ==>', hitung, 'ini i ==>', i);

      console.log('angka benar ===>', angka, this.papan[posisiX][i]);
      return true;
    }

    // let data = this.number;
    // for (let i = 0; i < data.length; i++) {
    //   for (let j = 0; j < data[i].length; j++) {
    //     return data[i][j]
    //   }
    // }
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
console.log(game.papan);
// console.log(game.checkRow())
//
// console.log(game.board())
// console.log(game.solve())
