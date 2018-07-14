"use strict"

/*  ############## WORK FLOW ###############

  - Buat class sudoku karena mengerjakan dengan OOP karena akan membantu membaca code lebih baik dan terstruktur
    karena di buat menjadi satu object 
  
  - generate data original number
    dengan export dan import 
      - export module.expor = ''
      - import require('')
  
  - Break down functin apa saja yang diperlukan untuk menyelesaikan(solve()) game sudoku ini
    1) untuk generate board -> generateBoard()
    2) untuk solve -> fungsi yang akan mengembalikan hasil board yang sudah jadi dan memanggil function2
       yang lain untuk membantu mengerjakannya  solvea()
    3) untuk status board kosong -> board kosong disini merupakan angka 0, yang kita perlukan darinya 
       adalah posisi x dan posisi y, value optional
    4) untuk mendapatkan angka yang benar kita perlu cek 3 kondisi baiknya dibuat function terpisah
        - horizontal -> untuk mengecek dari index pertama sampai terakhir pada board ada angka yang sama atau tidak horizontal()
        - vertikal -> untuk mengecek dari index pertama sampai terakhir pada board ada angka yang sama atau tidak vertikal ()
        - boxMini -> untuk mengecek dari  isi dari index box 3x3 pada board ada angka yang sama atau tidak  boxMini ()
      *** dikarenakan nilai yang benar harus memiliki kondisi benar di 3 kondisi di atas maka kita buat fungsi cekKondisi()
          yang berisikan status dari 3 kondisi di atas, jika true semua return true jika tidak false
      *** function2 cek : horizontal () , vertikal (), boxMini ()

ya gitulah ya kira kira workflownya..
KAPOK PAKE X DAN Y !!! TERAKHIR DEH INI CAPE NYARI SALAHNYA
*/


class Sudoku {
  constructor(board_string) {
    this.originalData = board_string
  }

  generateBoard () { 
    let boxSize = 9
    let cekPoint = 0
    let multiArray = []
    let data = this.originalData

    for (let i=0 ; i < boxSize ; i++){
      let array = []
      for (var j=cekPoint ; j < cekPoint+boxSize ; j++){
        array.push(Number(data[j]))
      }
      cekPoint = j 
      multiArray.push(array)
    }
    return multiArray
  }
  
  posisiTarget() {
    let board = this.generateBoard()
    let target = []

    for (let i=0 ; i < board.length ; i++){   
      for (let j=0 ; j < board[i].length ; j++){
        if (board[i][j] == 0){
          let dataTarget = {}
          dataTarget['baris'] = i
          dataTarget['kolom'] = j
          dataTarget['value'] = board[i][j]
          target.push(dataTarget)
        }
      }
    }

    return target 
  }

  solve() {
    let board = this.generateBoard()
    let targetBox = this.posisiTarget()
    console.clear()
    
    for (let i=0 ; i < targetBox.length;i++) {
      let posisiY = targetBox[i]['baris'];
      let posisiX = targetBox[i]['kolom'];
      
      let value   = board[posisiY][posisiX] +1
      let kondisi = false
      //posisiX dan posisiY yang mau disi sudah kita miliki datanya
      //value untuk diisi 1-9 maka dari itu kita buat looping ke 2 untuk mengeksekusi
      //gunakan while () dengan kondisi jika nilai belum true dengan kondisi maka value akan di tambah terus
      
      while (!kondisi && value <= 9 ){ 
        if (this.cekKondisi(board,targetBox[i],value)){
          kondisi = true     
          board[posisiY][posisiX] = value
          

          // UNTUK TAMPILAN SAJA
          console.log('############ SUDOKU ############')
          console.log('INITIAL BOARD')
          console.log(this.generateBoard())
          console.log('\n')
          console.log('PROCESS BOARD')
          console.log(board)
          console.log('############ SUDOKU ############')
          
          this.sleep(100)
          console.clear()
          //  parameter board untuk proses pengecekan dan papan
          // sudoku akan terupdate ketika value dimasukan untuk -
          //  pengecekan berikutnya
          // target box[i] untuk lokasi
          // value untuk menginputkan 1-9
        }
        else {
          value++
        }
      }
      
      if (kondisi == false) { //backtrack
        board[posisiY][posisiX] = 0
        
      }
    }

    console.log('############ SUDOKU ############')
    console.log('INITIAL BOARD')
    console.log(this.generateBoard())
    console.log('\n')
    console.log('PROCESS BOARD')
    console.log(board)
    console.log('############ SUDOKU ############')
    
    return
  }

  cekKondisi(board,target,value) {
    if (this.cekHorizontal(board,target,value) && this.cekVertikal(board,target,value) && this.cekBox(board,target,value)){
      return true
    }
    else {
      return false
    }
    
  }
  
  cekHorizontal (board,target,value){
    let posY = target['baris']
    let posX = target['kolom']

    for (let i=0 ; i < board[posY].length ; i++){ //cek seluruh baris pada board memiliki nilai value atau tidak
      if (board[posY][i] == value){ 
        return false
      }
    }
    return true
  }
//   ********* NOTE  untuk horizontal karena baris yang di loop posY tidak di looping
  cekVertikal (board,target,value){
    let posY = target['baris']
    let posX = target['kolom']

    for (let i=0 ; i < board[posY].length ; i++){
      if (board[i][posX] == value){ //cek seluruh kolom pada board memiliki nilai value atau tidak
        return false
      }
    }
    return true
  }
//   ********* NOTE  untuk horizontal karena kolom yang di loop posX tidak di looping
  cekBox (board,target,value){
    let boxSize = 3
    for (let i= target['baris'] - (target['baris']%3) ; i < boxSize ; i++){
      for (let j=target['kolom'] - (target['kolom']%3) ; j < boxSize ; j++){
        if (board[i][j] == value){
          return false
        }
      }
    }
    return true
  }
  //   ********* NOTE  untuk box gunakan baris terlebih dahulu untuk loop1 dan kolom 
  // untuk loop2, karena dari kiri ke kanan terus ke bawah dan seterusnya

  sleep (milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }
}


var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0] // proses ini mengimport nilai data original

var game = new Sudoku(board_string) //proses ini membuat game menjadi objek karen new dan ada parameter yang dimasukan
                                    // data original



console.log(game.solve())

console.log('\n')

