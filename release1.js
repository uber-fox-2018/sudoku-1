var board=
[ [ '1', ' ', '5', '8', ' ', '2', ' ', ' ', ' ' ],
  [ ' ', '9', ' ', ' ', '7', '6', '4', ' ', '5' ],
  [ '2', ' ', ' ', '4', ' ', ' ', '8', '1', '9' ],
  [ ' ', '1', '9', ' ', ' ', '7', '3', ' ', '6' ],
  [ '7', '6', '2', ' ', '8', '3', ' ', '9', ' ' ],
  [ ' ', ' ', ' ', ' ', '6', '1', ' ', '5', ' ' ],
  [ ' ', ' ', '7', '6', ' ', ' ', ' ', '3', ' ' ],
  [ '4', '3', ' ', ' ', '2', ' ', '5', ' ', '1' ],
  [ '6', ' ', ' ', '3', ' ', '8', '9', ' ', ' ' ] ];



/* NOTE
TOP     => i=0,3,6      LEFT   => j=0,1,2
MIDDLE  => i=1,4,7      CENTER => j=3,4,5
BOTTOM  => i=2,5,8      RIGHT  => j=6,7,8
      LEFT          CENTER           RIGHT
    0     1    2    3    4    5   6     7    8
 0 [ '1', ' ', '5'| '8', ' ', '2'| ' ', ' ', ' ' ] TOP        
 1 [ ' ', '9', ' '| ' ', '7', '6'| '4', ' ', ' ' ] MIDDLE -- TOP RACK
 2 [ '5', '2', ' '| ' ', '4', ' '| ' ', '8', '1' ] BOTTOM
 3 [ '9', ' ', '1'| '9', ' ', ' '| '7', '3', ' ' ] TOP
 4 [ '6', '7', '6'| '2', ' ', '8'| '3', ' ', '9' ] MIDDLE -- MIDDLE RACK
 5 [ ' ', ' ', ' '| ' ', '6', '1'| ' ', '5', ' ' ] BOTTOM
 6 [ ' ', ' ', '7'| '6', ' ', ' '| ' ', '3', ' ' ] TOP
 7 [ '4', '3', ' '| ' ', '2', ' '| '5', ' ', '1' ] MIDDLE -- BOTTOM RACK
 8 [ '6', ' ', ' '| '3', ' ', '8'| '9', ' ', ' ' ] BOTTOM

1. The board is divided into 3 racks: top rack, middle rack, and bottom rack. 

2. Start looking for a target number (1-9). Always start from '1' onward in each rack.

3. Find out the positions of the target number in each rack to help determine the direction of searching. Store the positions in whereIsIt. 
e.g. we find out that '1' is located at 
topRack: [ 'left-top', 'right-bottom' ],
midRack: [ 'left-top', 'center-bottom' ],
bottomRack: [ 'right-middle' ] 

4. In each rack, the total of the target num should be three. Each target num is at one of the rows and cols
rows = [left,center,right]
cols = [top,middle,center]

From whereIsIt, we know that the target num of '1' is:
in the topRack: we found two in total, so the 3rd '1' must be at 'center - middle'. 
    4.a. go to step 5.a.  

in the midRack: we found two in total, so the 3rd '1 must be at 'right - middle'
    4.b. go to step 5.b

in the bottomRack: we found one in total, so the 2nd and 3rd '1' must be at 'center' and 'left' - 'top' and 'bottom'
    4.c. go to step 5.c

5. check the empty spot(s) based on direction from step no.4 by referring to positionMap
  a. topRack : 'center - middle' is [[1,3],[1,4],[1,5]]
     From 3 - 5, check the number of empty spot.
     (i)If the empty spot is only 1, fill it with target num. e.g emptySpots: [3], then fill [1,3] with '1'.
     Update whereIsIt by pushing 'center-middle' to topRack.
     (ii)If the empty spot is more than 1, check the position of target num in midRack and bottomRack from whereIsIt.
  b. midRack: 'right - middle' is [[4,6],[4,7],[4,8]]
     From 6 - 8, check the empty spot and fill it.
     (i)If the empty spot is only 1, fill it with target num.
     (ii)If the empty spot more than 1, check the position of target num in bottomRack from whereIsIt.
     e.g. emptySpots: [6,8], then check bottomRack
     bottomRack: [ 'right-middle' ] is [[7,6],[7,7],[7,8]]. From row 6-8, '1' is in [8], so eliminated 8 from [6,8] and fill in [6].

  c. bottomRack:'center' and 'left' - 'top' and 'bottom'
    

 */

let positionMap={
  topRack:{
    left  :{
      top   : [[0,0],[0,1],[0,2]],
      middle: [[1,0],[1,1],[1,2]],
      bottom: [[2,0],[2,1],[2,2]]
    },
    center:{
      top   : [[0,3],[0,4],[0,5]],
      middle: [[1,3],[1,4],[1,5]],
      bottom: [[2,3],[2,4],[2,5]]
    },
    right :{
      top   : [[0,6],[0,7],[0,8]],
      middle: [[1,6],[1,7],[1,8]],
      bottom: [[2,6],[2,7],[2,8]]
    }
  },
  midRack:{
    left  :{
      top   : [[3,0],[3,1],[3,2]],
      middle: [[4,0],[4,1],[4,2]],
      bottom: [[5,0],[5,1],[5,2]]
    },
    center:{
      top   : [[3,3],[3,4],[3,5]],
      middle: [[4,3],[4,4],[4,5]],
      bottom: [[5,3],[5,4],[5,5]]
    },
    right :{
      top   : [[3,6],[3,7],[3,8]],
      middle: [[4,6],[4,7],[4,8]],
      bottom: [[5,6],[5,7],[5,8]]
    }
  },
  bottomRack:{
    left  :{
      top   : [[6,0],[6,1],[6,2]],
      middle: [[7,0],[7,1],[7,2]],
      bottom: [[8,0],[8,1],[8,2]]
    },
    center:{
      top   : [[6,3],[6,4],[6,5]],
      middle: [[7,3],[7,4],[7,5]],
      bottom: [[8,3],[8,4],[8,5]]
    },
    right :{
      top   : [[6,6],[6,7],[6,8]],
      middle: [[7,6],[7,7],[7,8]],
      bottom: [[8,6],[8,7],[8,8]]
    }
  }
}
// console.log(JSON.stringify(positionMap.bottomRacks, null, 2));
// console.log(positionMap.bottomRack.right.middle);
/* [ [ 7, 6 ], [ 7, 7 ], [ 7, 8 ] ] */


let whereIsIt={
    topRack:[],
    midRack:[],
    bottomRack:[]
};

let racks =['topRack', 'midRack', 'bottomRack'];
let counter=1;
let currentRack=racks[counter];
let rackPos=[];
let rowPos=[];
let positionOfNum;
var targetNum=1;//cari angka 1 - 9 di tiap blok
let rows = ['left','center','right'];
let cols = ['top','middle','bottom'];

function detectPositionOf(num){
  var stringNum = String(num);
  let i=0;
  let arrPos=[];
  for(var row of board){
    if(row.includes(stringNum)){
      arrPos.push([i,row.indexOf(stringNum)]);
    }
   i++;
  }
  return arrPos;
  /*  [ [ 0, 0 ], [ 2, 7 ], [ 3, 1 ], [ 5, 5 ], [ 7, 8 ] ]  */
}

function whereIs(target){
  let array = detectPositionOf(target);
  let positions = [];
  
  for(var elem of array){
    if(elem[0]===0 || elem[0]===1 || elem[0]===2){//top rack
      if(elem[0]===0){//top
        if(elem[1]===0 || elem[1]===1 || elem[1]===2){
          whereIsIt.topRack.push('left-top');
        }else if(elem[1]===3 || elem[1]===4 || elem[1]===5){
           whereIsIt.topRack.push('center-top');
        }else{
          whereIsIt.topRack.push('right-top');
        }
      }else if(elem[0]===1){//middle
        if(elem[1]===0 || elem[1]===1 || elem[1]===2){
          whereIsIt.topRack.push('left-middle');
        }else if(elem[1]===3 || elem[1]===4 || elem[1]===5){
           whereIsIt.topRack.push('center-middle');
        }else{
          whereIsIt.topRack.push('right-middle');
        }
      }else{//bottom
        if(elem[1]===0 || elem[1]===1 || elem[1]===2){
          whereIsIt.topRack.push('left-bottom');
        }else if(elem[1]===3 || elem[1]===4 || elem[1]===5){
           whereIsIt.topRack.push('center-bottom');
        }else{
          whereIsIt.topRack.push('right-bottom');
        }
      }
    }else if(elem[0]===3 || elem[0]===4 || elem[0]===5){//middle Rack
      if(elem[0]===3){//top
        if(elem[1]===0 || elem[1]===1 || elem[1]===2){
          whereIsIt.midRack.push('left-top');
        }else if(elem[1]===3 || elem[1]===4 || elem[1]===5){
          whereIsIt.midRack.push('center-top');
        }else{
          whereIsIt.midRack.push('right-top');
        }
      }else if(elem[0]===4){//middle
        if(elem[1]===0 || elem[1]===1 || elem[1]===2){
          whereIsIt.midRack.push('left-middle');
        }else if(elem[1]===3 || elem[1]===4 || elem[1]===5){
           whereIsIt.midRack.push('center-middle');
        }else{
          whereIsIt.midRack.push('right-middle');
        }
      }else{//bottom
        if(elem[1]===0 || elem[1]===1 || elem[0]===2){
          whereIsIt.midRack.push('left-bottom');
        }else if(elem[1]===3 || elem[1]===4 || elem[1]===5){
           whereIsIt.midRack.push('center-bottom');
        }else{
          whereIsIt.midRack.push('right-bottom');
        }
      }
    }else if(elem[0]===6 || elem[0]===7 || elem[0]===8){//bottom rack
    
      if(elem[0]===6){//top
        if(elem[1]===0 || elem[1]===1 || elem[1]===2){
          whereIsIt.bottomRack.push('left-top');
        }else if(elem[1]===3 || elem[1]===4 || elem[1]===5){
          whereIsIt.bottomRack.push('center-top');
        }else{
          whereIsIt.bottomRack.push('right-top');
        }
      }else if(elem[0]===7){//middle
        if(elem[1]===0 || elem[1]===1 || elem[1]===2){
          whereIsIt.bottomRack.push('left-middle');
        }else if(elem[1]===3 || elem[1]===4 || elem[1]===5){
          whereIsIt.bottomRack.push('center-middle');
        }else{ //6||7||8
          whereIsIt.bottomRack.push('right-middle');
        }
      }else{//bottom
        if(elem[1]===0 || elem[1]===1 || elem[0]===2){
          whereIsIt.bottomRack.push('left-bottom');
        }else if(elem[1]===3 || elem[1]===4 || elem[1]===5){
          whereIsIt.bottomRack.push('center-bottom');
        }else{
          whereIsIt.bottomRack.push('right-bottom');
        }
      }
    }
  }
  // return whereIsIt;
}
console.log(whereIs(targetNum)); 
/* Output for targetNum = 1
{ topRack: [ 'left-top', 'right-bottom' ],
  midRack: [ 'left-top', 'center-bottom' ],
  bottomRack: [ 'right-middle' ] }
*/

//repeat all processes from here to finish for each stack
function findPositionOfNumFrom(rack){
  let leftCenterRight=[];
  let topMiddleBottom=[]
  
  for(let position of rack){
    let pos = position.split("-");
    leftCenterRight.push(pos[0]);
    topMiddleBottom.push(pos[1]);
  }
  // console.log(leftCenterRight);
  // console.log(topMiddleBottom);
  for(let row of rows){
    if(!leftCenterRight.includes(row)){
      rackPos.push(row);
    }
  }
  
  for(let col of cols){
    if(!topMiddleBottom.includes(col)){
      rowPos.push(col);
    }
  }
  let result=[];
  if(rowPos.length===1 && rackPos.length===1){
    for(let i=0;i<rackPos.length;i++){
      for(let j=0;j<rowPos.length;j++){
        result.push(rackPos[i] + "-" + rowPos[i]);
      }
    }
    return result;
  }else{
    
    //not finish
    /* 
      rowPos : [ 'top', 'bottom' ]
      rackPos: [ 'left', 'center' ]
     */
  }
  
   //[ 'right-middle' ]
}
// console.log(findPositionOfNumFrom(whereIsIt[currentRack]));

function emptySpots(rack){
  let positionArr = findPositionOfNumFrom(whereIsIt[rack])//[ 'right-middle' ]
  positionOfNum=positionArr.join();//right-middle
  let index;
  if(positionOfNum === 'left-top' || positionOfNum === 'left-middle' || positionOfNum === 'left-bottom'){
    index= positionMap[rack].center.middle[0][0];
    return left1(index,board," ");
  }else if(positionOfNum === "right-top"|| positionOfNum === 'right-middle' || positionOfNum === 'right-bottom'){
    index= positionMap[rack].right.middle[0][0];
    return right1(index,board," ");
  }else if(positionOfNum === "center-top" || positionOfNum === 'center-middle' || positionOfNum === 'center-bottom'){
    index= positionMap[rack].left.middle[0][0];
    return center1(index,board," ");
  }
}
// console.log(emptySpots(currentRack));//[6,8]

function fillInEmptySpot(emptyRack){
  let empty_spots = emptySpots(emptyRack);
  // console.log(empty_spots);//[ 6, 8 ]
  let rack = rackPos[0];
  // console.log(rack);//right
  let row = rowPos[0];
  // console.log(row);//middle
  let length = empty_spots.length;
  // console.log(length);//2
  let index;
  let i= positionMap[emptyRack][rack][row][0][0];
  let j;
  if(length===1){
    j=empty_spots[0];
    
  }else{
    let checkThis="";
    for(let rack in whereIsIt){
      if(rack!==currentRack){
        for(let posisi of whereIsIt[rack]){
             if(positionOfNum===posisi){
               checkThis+=rack;
             }
        }
      }
    }
    index=positionMap[checkThis][rack][row][0][0];
    let same=[]
    if(rack === "left"){
    same= left1(index,board,targetNum);
    }else if(rack === "right"){
    same= right1(index,board,targetNum);
    }else if(rack === "center"){
    same= center1(index,board,targetNum);
    }
    for(var num of same){
      for(var spot of empty_spots){
          if(num!==spot){
            j=spot;
          }
      }
    }
  }
  board[i][j]=targetNum;
  whereIsIt[emptyRack].push(positionOfNum);
  return board;
}
// console.log(fillInEmptySpot(currentRack));

//LEFT 
function left1(currentIndex,board,target){
  let result=[];
  for(let i=currentIndex;i>currentIndex-1;i--){
    for(let j=0;j<=2;j++){
      if(board[i][j]==target){     
        result.push(j);
      }
    }
  }
  return result;
}

//CENTER
function center1(currentIndex,board,target){
  let result=[];
  for(let i=currentIndex;i>currentIndex-1;i--){
    for(let j=3;j<=5;j++){
      if(board[i][j]==target){
        result.push(j);
      }
    }
  }
  return result;
}

//RIGHT 
function right1(currentIndex,board,target){
  let result = [];
  for(let i=currentIndex;i>currentIndex-1;i--){
    for(let j=6;j<=8;j++){
      if(board[i][j]==target){
        result.push(j);
      }
    }
  }
  return result;
}

function solve(count){
  currentRack = racks[count];
  if(count===1){
    return board;
  }
  fillInEmptySpot(currentRack);
  return solve(count+1);
}
console.log(solve(counter));

