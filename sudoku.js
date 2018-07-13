"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string
  }

  solve() {}

  // Returns a string representing the current state of the board
    board() {
      var board = []
      var temp = []
      var counter = 0
        for(var i = 0; i < 9; i++){
            for(var j = 0; j < 9; j++){
                temp.push(Number(board_string[counter]))
                counter++
            }
            board.push(temp)
            temp = []
        }
        
        
      return board
    }


    coordinateToFill(){
      var board = this.board()
    
      var coordinate = []
      for(var i = 0; i < board.length; i++){
        for(var j = 0; j < board[i].length; j++){
          if(board[i][j] === 0){
            coordinate.push([Number(i),Number(j)])
          }
        }
      }
      
      return coordinate

    }

    tesBoard(){

        var board = this.board()
        // console.log(board);
        var candidate = [1,2,3,4,5,6,7,8,9]
        var coordinate = this.coordinateToFill()
        for(var i = 0; i < coordinate.length;i++){
            
            var counter = 0
            var x = coordinate[i][0]
            var y = coordinate[i][1]
            var condition = false
          
            while(condition === false){
                    if(this.cekColumn(board,x,y,candidate[counter]) && this.cekRow(board,x,y,candidate[counter]) && this.cekBox(board,x,y,candidate[counter])){
                        condition = true
                        board[x][y] = candidate[counter]
                        counter = 0
                    }else{
                        counter++
                    }            
                }

                if (condition === false){
                    board[x][y] = 0;
                    i--;
                  }

        }
        console.log(board);
        
        // loop 1..9 do c
        // if( validRow(board, x, y, c) && validColumn(board, x,y,c) && validBox())
        // end

        // validRow(board, x,y,c){
        //   loop 0..9 do YCor 
        //     board[x][y+Ycor] == c
        //   end

        //   if gak ada sampe ujung 
        //     board[x][y+YCor] = c
        // }


    }

    cekColumn(board,x,y,candidate){
        
        for(var i = 0; i < board[x].length;i++){
            if(board[x][i] === candidate){
                return false
            }
        }
        return true
    }

    cekRow(board,x,y,candidate){
        
        for(var i = 0; i < board.length;i++){
            if(board[i][y] === candidate){
                // console.log('masuk false row');
                
                return false
            }
        }
        return true
    }

    cekBox(board,x,y,candidate){
        var newX = Math.floor(x/3)*3
        var newY = Math.floor(y/3)*3
        
        for(var i = newX; i < newX+3; i++){
            for(var j = newY; j < newY+3; j++){
                if(board[i][j] === candidate){
                    return false
                }
                
            }
        }
        return true

    }


    cekBoard(selectedBoard, candidate){
        //cek column
      var notNull = []
      // console.log(candidate);
      
      
      for(var i = 0; i < selectedBoard.length; i++){
        
        if(selectedBoard[i] !== '0'){
          notNull.push(Number(selectedBoard[i]))
        
        }
      }
    //   console.log(notNull);
    //   console.log(candidate);
      
      
      if(notNull.indexOf(candidate) !== -1){
        return false
      }else{
        return true
      }
      
      // console.log(notNull);
      

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

// console.log(board_string);

// console.log(game.board())
// console.log(game.coordinateToFill());
console.log(game.tesBoard());




