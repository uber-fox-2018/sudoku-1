"use strict"

class Sudoku {
  constructor(board_string) {
    this.number_sudoku = board_string
    this.record = []
    this.zeroData = []
    this.IndexToFix = []
  }

  solve(boards) {
    var solveBoard = boards;
    var targetIndx = 0;
    var lastmove = this.IndexToFix[0];
    var startRow = 0;
    var startCol = 0;
    var startValue =0;

    
    //console.log(this.zeroData)  
    if(lastmove === undefined){
      console.log('LAST MOVE : Masih kosong');
    }
    if(lastmove !== undefined){
      console.log('LAST MOVE : Sudah ada') 
            };
            
            for(let a=0; a<solveBoard.length; a++){
              for(let b=0; b<solveBoard[a].length; b++){
                if(solveBoard[a][b]==0){
                  if(a < startRow && b < startCol){
                    continue;
                  }
                  for(let c=1; c<= 9; c++){
                    if(c <= startValue){
                      continue;
                    }
                    var counterTrue = 0
                    var rowBox = this.findBoxRowCol(a);
                    var colBox = this.findBoxRowCol(b);
              //if group true false;
              
              if(this.clearHorizontal(a, solveBoard, c)){
                counterTrue += 1; 
              }//end if clearHorizontal
              
              if(this.clearVertical(b, solveBoard, c)){
                counterTrue += 1;
              }//end if
              
              if(this.clearBox(rowBox, colBox, solveBoard, c)){
                counterTrue += 1;
              }//end if clear box;
              
              if(counterTrue === 3){
                solveBoard[a][b]= c;
                this.record.push([a,b,c]);
              }
              
              }//end for c for number 1-9
            }
            if(solveBoard[a][b]===0){
              this.zeroData.push([a,b])
              targetIndx = this.findBackTrack(a, b)
              this.IndexToFix.push(targetIndx);
              console.log(targetIndx); 
              
            }   
          }//end for b
        }//end for a
        return solveBoard;
    
  }


  checkerBoard() {
    let zeroData = []
    for (let a = 0; a < this.mainBoard.length; a++) {
      for (let b = 0; b < this.mainBoard[a].length; b++) {
        if (this.mainBoard[a][0] === ' ') zeroData.push([a, b]) // check berdasar a dinamis b statis
        // if(this.mainBoard[a][0]) temp.push([a,b])
      }
      // if(temp.length != 0) zeroData.push(temp)
    }
    return zeroData
  }

  // Returns a string representing the current state of the
  board() {
    var blankBoard = [];
    var board = board_string.split('')
    var ctrFill = 0
    
      for(let a = 0; a < 9; a++ ){
      blankBoard.push([]);
      for(let b = 0; b < 9; b++){
        blankBoard[a].push(Number(board[ctrFill]));
        ctrFill += 1;
      }
    }
    return blankBoard;
}
findBoxRowCol(spot){
  var newSpot = 0;
  if(spot >=0 && spot <=2){ newSpot = 1 };
  if(spot >=3 && spot <=5 ){ newSpot = 4 };
  if(spot >=6 && spot <=8 ){ newSpot = 7 };
  return newSpot;
}

clearBox(row, col, board, numGuest){
    
  if(board[row-1][col]   ===numGuest){return false}
else if(board[row-1][col-1] ===numGuest){return false}
else if(board[row-1][col+1] ===numGuest){return false}
else if(board[row][col]     ===numGuest){return false}
else if(board[row][col-1]   ===numGuest){return false}
else if(board[row][col+1]   ===numGuest){return false}
else if(board[row+1][col-1] ===numGuest){return false}
else if(board[row+1][col]   ===numGuest){return false}
else if(board[row+1][col+1] ===numGuest){return false};
return true;
}

clearHorizontal(row, board, numGuest){
  let boardSize = 9;
  
  for(let a=0; a<boardSize; a++){
      if(board[row][a]===numGuest){
        return false;
      }
  }
 return true;
}//end function clearHorizontal

clearVertical(col, board, numGuest){
  let boardSize = 9;
  
  for(let a=0; a<boardSize; a++){
      if(board[a][col]===numGuest){
        return false;
      }
  }
 return true;
}
findBackTrack(key1, key2){
  var theIndex = 0
  
  
  for(let a = 0; a < this.record.length; a++){
    var rowRecord = this.record[a][0];
    var colRecord = this.record[a][1];
    if(rowRecord === key1 && colRecord === (key2-1) ){
      return a;
      }else if(rowRecord == (key1-1)){
        return a;
      }
    }
    return 'not found'
  }

}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
.toString()
.split("\n")[5]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
console.log(game.solve(game.board()))



console.log(game);

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
// game.solve()
// game.board(game)

// console.log(game.board())
// console.log(this.board)
// console.log(game.board())
// console.log(game.solve())
// console.log(game.checkerBoard())
console.log(game.solve(game.board()));