const fs = require('fs');

const readTxtFile = async function (filename){
    let readResult = await fs.readFileSync(filename, 'utf8')
    return readResult;
}

module.exports = { readTxtFile } 