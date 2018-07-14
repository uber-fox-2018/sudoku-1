          "use strict"

const row = 9
const col = 9

class Sudoku {
  constructor(board_string) {

  }

  solve() { 
  	let papan = this.board()

  	function master (arr, row, col){
  		let numString='123456789'
  		right(arr,row,col)

      /*
      Memandingkan angka (horizontal) 'fixed'
      */

  		function right(arrRight,rowRight,colRight){
  			let tempNum = []
  			for (let a = 0 ; a < numString.length ; a++){
  				let countR=0
  				for (let b = 0 ; b < arr.length ; b++){
	  				if (numString[a] !== arr[b] ){
	  					countR++
	  				}
  				}
  				if (countR === arr.length){
  					tempNum.push(numString[a])
  				}
  			}
  			bottom(tempNum,rowRight,colRight)
  		}

      /*
      Memandingkan angka (vertical) 'fixed'
      */

  		function bottom(arrBottom,rowBottom,colBottom){
  			for (let a = 0 ; a < arrBottom.length ; a++){
  				for (let b = 0 ; b < arr.length ; b++){
  					if (arrBottom[a] === papan[b][colBottom]){
  						arrBottom.splice(a,1)
  						a-=1
  						b-=1
  					}
  				}
  			}
        
        /*
          ============================
          VERTICAL & HORIZONTAL FIXED
          ============================
        */

        console.log('\n')
        if (arrBottom.length !== 0){
          papan[rowBottom][colBottom] = arrBottom[0]
        }
        console.log(papan)

  			// square(arrBottom, rowBottom, colBottom)
  		}

  	// 	function square(arrSquare, rowSquare, colSquare){
   //      // console.log('rowSquare',rowSquare)
   //      // console.log('colSquare',colSquare)
   //      // console.log(papan)
   //      // console.log(arrSquare)
   //      // console.log('\n')
   //      for (let i = 0 ; i < papan.length ; i++){
   //        for (let j = 0 ; j < papan[i].length ; j++){
   //          for (let k = 0 ; k < k < arrSquare.length ; k++){
   //            if (arrSquare[k])
   //          }
   //        }
   //      }
  	// 	}
  	// 	return arr
  	// }
  	
  	for (let i = 0 ; i < papan.length ; i++){
  		for (let j = 0 ; j < papan[i].length ; j++){
  			if (papan[i][j] === ' '){
  				master(papan[i], i , j)

  			}	
      }
  	}
  }
  
  board() {
  	let arr=[]
  	let count =0
  	for (let i = 0 ; i < col ; i++){
  		let temp=[]
  		for (let j = 0 ; j< row ; j++){
  			// console.log(i,j)
  			if (board_string[count] === '0'){
  				temp.push(' ')
  			}else {
  				temp.push(board_string[count])
  			}
  			count++
  		}
  		arr.push(temp)
  	}
  	return arr
  }
}

var fs = require('fs')

var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]


var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve()

game.board()
