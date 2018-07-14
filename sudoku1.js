"use strict"

const row = 9
const col = 9

class Sudoku {
  constructor(board_string) {

  	// this.board = board(arr)
  }

  solve() { 
  	let papan = this.board()

  	function master (arr, row, col){
  		let numString='123456789'
  		right(arr,row,col)
  		function right(arrRight,rowRight,colRight){
  			// console.log(papan)

  			let tempNum = []
  			for (let a = 0 ; a < numString.length ; a++){
  				let countR=0
  				for (let b = 0 ; b < arr.length ; b++){
  					// console.log(a,b)
	  				if (numString[a] !== arr[b] ){
	  					countR++
	  				}
  				}
  				if (countR === arr.length){
  					tempNum.push(numString[a])
  				}

  				// break
  			}
  			// console.log('temp',tempNum)

  			bottom(tempNum,rowRight,colRight)
  		}

  		function bottom(arrBottom,rowBottom,colBottom){

  			for (let a = 0 ; a < arrBottom.length ; a++){
  				for (let b = 0 ; b < arr.length ; b++){
  					if (arrBottom[a] === papan[b][colBottom]){
  						arrBottom.splice(a,1)
  						a-=1
  						b-=1
  						// console.log('arrBottom',arrBottom)
  					}
  			
  				}
  				// for (let b = 0 ; b < )
  				
  			}
  			// console.log('arrBottom',arrBottom)
  			// console.log(papan)
  			square(arrBottom, rowBottom, colBottom)
  		}

  		function square(arrSquare, rowSquare, colSquare){
  			// for (let a = 0 ; a < )
  			// console.log('row',rowSquare)
  			// console.log('col',rowSquare)

  			// console.log(papan)
  			// console.log(papan[0][0])
  			// console.log(papan[0][1])
  			// console.log(papan[0][2])
  			// console.log(papan[1][0])
  			// console.log(papan[1][1])
  			// console.log(papan[1][2])
  			// console.log(papan[2][0])
  			// console.log(papan[2][1])
  			// console.log(papan[2][2])
  			// console.log(papan.join(' '))
  			// let countS=0


  		}


  		// return arr
  	}
  	
  	

  	
  	let batasRow = 0
	let batasCol = 0

  	for (let i = 0 ; i < papan.length ; i++){
  		
  		for (let j = 0 ; j < papan[i].length ; j++){
  			if (papan[i][j] === ' '){
  			console.log('i,j:',i,j)

  				if (i >= 0 && i < 3 && j >= 0 && j < 3){
  					batasRow = 2
  					batasCol = 2
  				}else if (i >= 3 && i < 6 && j >= 3 && j < 6){
  					batasRow = 5
  					batasCol = 5
  				}else if (i >= 6 && i < 9 && j >= 3 && j < 9){
  					batasRow = 8
  					batasCol = 8
  				}
  				console.log('batasRow:',batasRow)
  				console.log('batasCol:',batasCol)
  				master(papan[i], batasRow , batasCol)
  			}
  			
  		}
  		// break
  	}
  	// break
  	// return

  }
  

  // Returns a string representing the current state of the board
  board() {
  	let arr=[]
  	let count =0
  	// console.log(papan)
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
  		console.log('\n')
  		arr.push(temp)
  		// console.log(arr)
  	}
  	return arr
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

game.board()
