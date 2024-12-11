const rf = require('../commons/readFile');

async function main () {
  const map = new Map()
  map.set('X', 'M')
  map.set('M', 'A')
  map.set('A', 'S')

  function getNextPos(currentPos, previousPos){
    let nextPos = {};
    if(currentPos.x > previousPos.x){
      nextPos.x = currentPos.x +1
    } else{
      if(currentPos.x < previousPos.x){
        nextPos.x = currentPos.x -1
      } else {
        if (currentPos.x == previousPos.x) nextPos.x = currentPos.x
      }
    }
    if(currentPos.y > previousPos.y){
      nextPos.y = currentPos.y + 1
    } else{
      if(currentPos.y < previousPos.y){
        nextPos.y = currentPos.y -1
      } else {
        if (currentPos.y == previousPos.y) nextPos.y = currentPos.y
      }
    }
    return nextPos;
  }
  async function puzzle7() {
    const input = await rf.readTxtFile('../puzzle7/test.txt')
    let splittedInputs = input.split('\r\n')
    splittedInputs = splittedInputs.map( element => element.split(''))
    let counter = 0;
    for (let i = 0; i < splittedInputs.length; i++) {
      const currentLine = splittedInputs[i];
      for (let j = 0; j < currentLine.length; j++) {
        const currentChar = currentLine[j];
        if(currentChar == 'X'){
          let xmasCounter = checkSurroundings('X', { x: j, y:i }, { x:-1, y:-1}, splittedInputs, counter)
          counter += xmasCounter
        }
      }
    }
    return counter;
  }

  // currentPos and previousPos like [x,y]
  function checkSurroundings(letter, currentPos, previousPos, splittedInputs, counter) {
    let currentChar = splittedInputs[currentPos.y][currentPos.x]
    if(letter == 'S'){
      return counter += 1;
    }
    
    if(previousPos){
      if( previousPos.x < 0|| previousPos.y < 0){
        let nextLine;
        let previousLine;
        if(currentPos.y > 0){
          previousLine = splittedInputs[currentPos.y-1]
        }
        if(currentPos.y < splittedInputs.length - 1 ){
          nextLine = splittedInputs[currentPos.y +1]
        }
        let nextChar = splittedInputs[currentPos.y][currentPos.x+1]
        let previousChar = splittedInputs[currentPos.y][currentPos.x-1]
        
        if(map.get(currentChar) == nextChar){  //checking same line, next char
          let nextPos = { y:currentPos.y, x: currentPos.x+1 }
          checkSurroundings(nextChar,nextPos , currentPos, splittedInputs, counter)
        }
        if(map.get(currentChar) == previousChar ){  //checking same line, previous char
          let nextPos = { y:currentPos.y, x: currentPos.x-1 }
          checkSurroundings(previousChar ,nextPos , currentPos, splittedInputs, counter)
        }
        
        if(previousLine){
          let nextCharPreviousLine = splittedInputs[currentPos.y-1][currentPos.x+1]
          let previousCharPreviousLine = splittedInputs[currentPos.y-1][currentPos.x-1]

          if(map.get(currentChar) == nextCharPreviousLine ){  //checking prev line, next char
            let nextPos = { y:currentPos.y-1, x: currentPos.x+1 }
            checkSurroundings(nextCharPreviousLine ,nextPos , currentPos, splittedInputs, counter)
          }
          if(map.get(currentChar) == previousCharPreviousLine ){  //checking next line, prev char
            let nextPos = { y:currentPos.y-1, x: currentPos.x-1 }
            checkSurroundings(previousCharPreviousLine ,nextPos , currentPos, splittedInputs, counter)
          }
        }
        if(nextLine){
          let nextCharNextLine = splittedInputs[currentPos.y+1][currentPos.x+1]
          let previousCharNextLine = splittedInputs[currentPos.y+1][currentPos.x-1]

          if(map.get(currentChar) == previousCharNextLine ){  //checking next line, previous char
            let nextPos = { y:currentPos.y+1, x: currentPos.x-1 }
            checkSurroundings(previousCharNextLine ,nextPos , currentPos, splittedInputs, counter)
          }
          if(map.get(currentChar) == nextCharNextLine ){  //checking next line, next char
            let nextPos = { y:currentPos.y+1, x: currentPos.x+1 }
            checkSurroundings(nextCharNextLine ,nextPos , currentPos, splittedInputs, counter)
          }
        }
      } else{
        let nextPos = getNextPos(currentPos, previousPos);
        let nextChar
        if(nextPos.y <= splittedInputs.length - 1 && nextPos.y >= 0){
          nextChar = splittedInputs[nextPos.y][nextPos.x]
        }
        if( nextChar && map.get(currentChar) == nextChar){
          checkSurroundings(nextChar, nextPos, currentPos, splittedInputs, counter)
        } else{
          checkSurroundings(nextChar, nextPos, undefined, splittedInputs, counter)
        }
      }
    } else{
      return 0;
    }
  }  
  console.log("Total result: ", await puzzle7())
}

main()
