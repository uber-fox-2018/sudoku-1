"use strict"

class Sudoku {
  constructor(board_string) {
    this.originNumber = String(board_string)
    this.unfilledBoard = this.board()
    this.unfilledCordinate = this.cordinateChecker()
    this.updateBoard = this.board()
  }

  solve() {
    let target = this.unfilledCordinate
    let i = 0
    let value = this.updateBoard

    while (i !== this.unfilledCordinate.length) {
      let y = target[i][0]
      let x = target[i][1]
      let cordinate = [y,x]

      console.log(value)
      this.sleep(10)
      console.clear()

    //   if (value[y][x] === 9) {
    //     value[y][x] = 0
    //     i--
    //   } else {
        if (this.searchH(cordinate,value[y][x] + 1,value) && this.searchV(cordinate,value[y][x] + 1,value) && this.searchB(cordinate,value[y][x] + 1,value)) {
            if (value[y][x] < 9) {
                value[y][x] += 1
              }
          i++
        } else {
          if (value[y][x] < 9) {
            value[y][x] += 1
          }
        }
    //   }
    }
    return value
  }
     
  board() {
    let res = []
    let temp = []
    
    for (let i = 0; i <= this.originNumber.length;i++) {
      if (i >= 9 && i % 9 === 0) {
        res.push(temp)
        temp = []
      }
      if (this.originNumber[i] == 0) {
        temp.push(0)
      } else {
        temp.push(Number(this.originNumber[i]))
      }
    }
    return res
  }

  cordinateChecker() {
    let originBoard = this.board()
    let res = []
    debugger
    for (let y = 0; y < originBoard.length; y++) {
      for (let x = 0; x < originBoard[y].length; x++) {
        if (originBoard[y][x] === 0){
          res.push([y,x])
        }
      }
    }
    return res
  }

  searchH (arr,num,value) {
    let y = arr[0]
    let x = arr[1]
    for (let i = 0; i < value.length;i++) {
      if (num === value[y][i]) {
        return false
      }
    }
    return true
  }
  searchV (arr,num,value) {
    let y = arr[0]
    let x = arr[1]
    for (let i = 0; i < value.length;i++) {
      if (num === value[i][x]) {
        return false
      }
    }
    return true
  }
  searchB (arr,num,value) {
    let y = arr[0]
    let x = arr[1]
    for (let i = y-(y % 3); i < 3; i++) {
      for (let j = x-(x % 3); j < 3; j++) {
        if (value[i][j] === num) {
          return false
        }
      }
    }
    return true
  }

  sleep (milliseconds) { //create delay print
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }
  
  clearScreen () {
    // Un-comment this line if you have trouble with console.clear();
    // return process.stdout.write('\033c');
    console.clear();
  }
}

var fs = require('fs')  
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

console.log(game.solve())


