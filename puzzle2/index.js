
let fs = require("node:fs")

try {
    let list1 = JSON.parse(fs.readFileSync('list1.json', 'utf8'));
    let list2 = JSON.parse(fs.readFileSync('list2.json', 'utf8'));
    list1.sort((a, b) => a - b)
    list2.sort((a, b) => a - b)
    let similarityScore = 0;
    for (let i = 0; i < list1.length; i++) {
        let list1Number = list1[i];
        let matchedNumbers = list2.filter((list2Number) => list2Number == list1Number)
        console.log(`${list1Number} * ${matchedNumbers.length}`, list1Number * matchedNumbers.length)
        similarityScore += list1Number * matchedNumbers.length
    }
    console.log("similarityScore:", similarityScore)
} catch (e) {
    console.log(e)
}
