
let fs = require("node:fs")


try {
    let list1 = JSON.parse(fs.readFileSync('list1.json', 'utf8'));
    let list2 = JSON.parse(fs.readFileSync('list2.json', 'utf8'));
    list1.sort((a, b) => a - b)
    list2.sort((a, b) => a - b)
    let totalDifference = 0;
    for (let i = 0; i < list1.length; i++) {
        let list1Number = list1[i];
        let list2Number = list2[i];
        distance = Math.abs(list1Number - list2Number)
        console.log("Distance: ", distance)
        totalDifference += distance
    }
    console.log("totalDifference:", totalDifference)
} catch (e) {
    console.log(e)
}
