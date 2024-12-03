const rf = require('../commons/readFile');

async function puzzle6() {
    
    const input = await rf.readTxtFile('../puzzle6/test.txt')
    let splittedInputs = input.split('do')
    let removedDonts =  splittedInputs.filter(element => !element.startsWith("n't()"))
    let filteredMuls = [];
    removedDonts.map( element => {
        filteredMuls.push( ...element.match(/\mul\(\d+,\d+\)/g))
    })
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

    console.log("Total result: ", await puzzle6())
}

main()


//(?<=do\(\)).*?(?=don't\(\)) medio
// antes dont inicial /^(.*?)(?=don't\(\))/
// despues do final 