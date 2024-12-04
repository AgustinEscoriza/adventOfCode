const rf = require('../commons/readFile');

const map = new Map()

map.set('X', 'M')
map.set('M', 'A')
map.set('A', 'S')

async function puzzle7() {
    
    const input = await rf.readTxtFile('../puzzle7/test.txt')
    let splittedInputs = input.split('\r\n')
    splittedInputs = splittedInputs.map( element => element.split(''))
    for (let i = 0; i < splittedInputs.length; i++) {
      const currentLine = splittedInputs[i];
      for (let j = 0; j < currentLine.length; j++) {
        const currentChar = currentLine[j];
        if(currentChar == 'X'){
          let nextLine;
          let previousLine;
          if(i> 0){
            nextLine = splittedInputs[i-1]
          }
          if(i < splittedInputs.length - 1 ){
            previousLine = splittedInputs[i+1]
          }
        }
      }
    }
    return result;
}

// currentPos and previousPos like [x,y]
function checkSurroundings(letter, currentPos, previousPos) {

}

const main = async () => {

    console.log("Total result: ", await puzzle7())
}

main()
