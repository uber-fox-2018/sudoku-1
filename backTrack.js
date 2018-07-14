"use strict"

class Sudoku {
	
	/**
	 * 
	 * @param {string} boardString 
	 */
	constructor(boardString) {
		this.str = boardString;
		this.board = this.arrayForBoard(boardString);
		this.empty = this.zeroInBoard(this.board);
	}

	/**
	 * 
	 * @param {string} str 
	 */
	arrayForBoard(str) {
		let boardArray = [];
		let rowArray = [];
		for (let i = 0; i < str.length; i++) {
			rowArray.push(Number(str[i]));
			if (rowArray.length >= 9) {
				boardArray.push(rowArray);
				rowArray = [];
			}
		}
		return boardArray;
	}

	/**
	 * 
	 * @param {array} board 
	 */
	zeroInBoard(board) {
		var zero = [];
		for (let i = 0; i < board.length; i++) {
			for (let j = 0; j < board[i].length; j++) {
				if (board[i][j] === 0) {
					zero.push([Number(i), Number(j)]);
				}
			}
		}
		return zero;
	}

	/**
	 * 
	 * @param {array} board 
	 * @param {integer} row 
	 * @param {integer} num 
	 */
	checkHorizontal(board, row, num) {
		for(let i = 0; i < board[row].length; i++) {
			if(board[row][i] == num) {
				return false;
			}
		} 
		return true;
	}

	/**
	 * 
	 * @param {array} board 
	 * @param {integer} col 
	 * @param {integer} num 
	 */
	checkVertical(board, col, num) {
		for(let i = 0; i < board[col].length; i++) {
			if(board[i][col] == num) {
				return false;
			}
		} 
		return true;
	}

	/**
	 * 
	 * @param {array} board 
	 * @param {integer} row 
	 * @param {integer} col 
	 * @param {integer} num 
	 */
	checkGroup(board, row, col, num) {
		let colFirst = 0;
		let rowFirst = 0;
		let boxSize = 3;

		debugger;
		while (row >= rowFirst + boxSize) {
			rowFirst = rowFirst + boxSize;
		}

		while (col >= colFirst + boxSize) {
			colFirst = colFirst + boxSize;
		}

		debugger;
		for (let i = rowFirst; i < rowFirst + boxSize; i++) {
			for (let j = colFirst; j < colFirst + boxSize; j++) {
				if(board[i][j] === num) {
					return false;
				}
			}
		}
		return true;
	}

	/**
	 * 
	 * @param {array} board 
	 * @param {integer} row 
	 * @param {integer} col 
	 * @param {integer} num
	 */
	checkHVG(board, row, col, num) {
		if (this.checkHorizontal(board, row, num) && 
			this.checkVertical(board, col, num) && 
			this.checkGroup(board, row, col, num)) {
			return true;
		} else {
			return false;
		}
	}

	solve() {
		var limit = 9;

		for(let i = 0; i < this.empty.length;) {
			let row = this.empty[i][0];
			let col = this.empty[i][1];
			let isSame = false;
		
			let num = this.board[row][col] + 1;
			
			while(isSame === false && num <= limit){
				if(this.checkHVG(this.board, row, col, num)){
					isSame = true;
					this.board[row][col] = num;
					i = i + 1;
				} else {
					num++;
				}
			}

			if (isSame === false){
				this.board[row][col] = 0;
				i = i - 1;
			}
			
		}
		return this.board.join('\n');
	}
}


// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var boardString = fs.readFileSync('set-01_sample.unsolved.txt')
	.toString()
	.split("\n")[0]

var game = new Sudoku(boardString)

// Remember: this will just fill out what it can and not "guess"
console.log(game.solve())

// console.log(game)