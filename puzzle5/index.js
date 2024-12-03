const rf = require('../commons/readFile');

async function puzzle4() {
    
    const input = await rf.readTxtFile('../puzzle5/input.txt')
    let filteredMuls = input.match(/\mul\(\d+,\d+\)/g)
    filteredMuls = filteredMuls.map( element => element.replaceAll('mul(', ''))
    filteredMuls = filteredMuls.map( element => element.replaceAll(')', ''))
    let result = 0
    for (const mul of filteredMuls) {
        numbers = mul.split(',')
        result += (parseInt(numbers[0]) * parseInt(numbers[1]))
    }
    return result
}

const main = async () => {

    console.log("Total result: ", await puzzle4())
}

main()