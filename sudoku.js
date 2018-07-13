"use strict"

class Sudoku {
  constructor(boardString) {
    this.fullBoard = this.numArr(boardString);
    this.emptyPositions = this.emptyPositions(this.fullBoard);
  }

  numArr (str){
    let mainArr = [];
    let arr = [];
    for (let i in str){
      arr.push(Number(str[i]));
      if (arr.length >= 9){
        mainArr.push(arr);
        arr = [];
      }
    }
    return mainArr;
  }

  emptyPositions (fullBoard){
    let emptyPositions = [];
    for (let i in fullBoard){
      for (let j in fullBoard[i]){
        if (fullBoard[i][j] === 0){
          emptyPositions.push([Number(i), Number(j)]);
        }
      }
    }
    return emptyPositions;
  }

  checkRow (fullBoard, row, num){
    for (let i in fullBoard[row]){
      if (fullBoard[row][i] === num){
        return false;
      }
    }
    return true;
  }

  checkCol (fullBoard, col, num){
    for (let i in fullBoard){
      if (fullBoard[i][col] === num){
        return false;
      }
    }
    return true;
  }

  checkBox (fullBoard, row, col, num){
    // nentuin titik2 batasan kotak
    let colStart = 0;
    let rowStart = 0;
    let boxSize = 3;

    // bikin titik2 batasan yg baru
    while (row >= rowStart + boxSize){
      rowStart += boxSize;
    }
    while (col >= colStart + boxSize){
      colStart += boxSize;
    }

    for (let i = rowStart; i < rowStart + boxSize; i++){
      for (let j = colStart; j < colStart + boxSize; j++){
        if(fullBoard[i][j] === num){
          return false;
        }
      }
    }
    return true;
  }

  checkAll (fullBoard, row, col, num){
    if (this.checkRow(fullBoard, row, num) && 
    this.checkCol(fullBoard, col, num) && 
    this.checkBox(fullBoard, row, col, num)){
      return true;
    }
    else {
      return false;
    }
  }

  solve() {
    let limitNum = 9;

    for(let i = 0; i < this.emptyPositions.length;){
      let row = this.emptyPositions[i][0];
      let col = this.emptyPositions[i][1];
      let isFound = false;
      // increment num2 yg mungkin dapat jadi solusi
      let solutionNum = this.fullBoard[row][col] + 1;
      // coba num sampe num mencapai limitNum (9) atau solusi dianggap ketemu (found)
      while(isFound === false && solutionNum <= limitNum){
        // kalo num dites cocok, anggap solusi ketemu(found), assign nilainya, lanjut next ke kotak kosong selanjutnya
        if(this.checkAll(this.fullBoard, row, col, solutionNum)){
          isFound = true;
          this.fullBoard[row][col] = solutionNum;
          i++;
        }
        // kalo ngga, coba num berikutnya
        else {
          solutionNum++;
        }
      }
      // kalo num2 dalam limitNum yg ditentuin (9) gbs jd solusi, kosongin lg nilai di kotak saat ini, dan balik ke kotak kosong sebelumnya; krn berarti num yg sebelumnya diassign blm jd solusi yg tepat
      if (isFound === false){
        this.fullBoard[row][col] = 0;
        i--;
      }
    }
    return this.board(this.fullBoard);
  }

  // Returns a string representing the current state of the board
  board(fullBoard) {
    let mainBoard = '-----------';
    let allRow = '';
    let rowInBox = '';
    let mainBoardRow = 0;
    for (let i in fullBoard){
      for (let j in fullBoard[i]){
        rowInBox += fullBoard[i][j];
        if (allRow.length >= 8){
          allRow += rowInBox;
          rowInBox = '';
        }
        if (rowInBox.length === 3){  
          rowInBox += '|';
          allRow += rowInBox;
          rowInBox = '';
        }
      }
      mainBoard += `\n${allRow}`;
      mainBoardRow ++;
      allRow = '';
      if (mainBoardRow === 3){
        mainBoard += '\n-----------'
        mainBoardRow = 0;
      }
    }
   return mainBoard
  }
}


// The file has newlines at the end of each line,
// so we call split to remove it (\n)
let fs = require('fs')
let boardString = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[1]

let game = new Sudoku(boardString)

// Remember: this will just fill out what it can and not "guess"
console.log(game.solve())

// console.log(game.fullboard)

