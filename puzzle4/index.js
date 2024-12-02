const rf = require("../commons/readFile")

function checkLevels(report) {
    let safe = true;
    let isIncreasing = undefined;
    for (let i = 1; i < report.length; i++) {
        let level = report[i];
        let previousLevel = report[i-1];
        let difference = Math.abs(parseInt(level) - parseInt(previousLevel))
        if( difference > 0 && difference <= 3){
            if(isIncreasing != undefined){
                if(isIncreasing){
                    if(parseInt(level) <  parseInt(previousLevel)){
                        safe = false
                    }
                } else{
                    if(parseInt(level) >  parseInt(previousLevel)){
                        safe = false
                    }
                }
            } else{
                if(parseInt(level) >  parseInt(previousLevel)){
                    isIncreasing = true
                } else {
                    isIncreasing = false
                }
            }
        } else {
            safe = false
        }
        
    }
    return safe;
}

async function puzzle3() {
    
    const input = await rf.readTxtFile('../puzzle3/input.txt')
    let reports = input.split('\r\n')
    reports = reports.map( r => r.split(' '))
    
    let safeReports = await reports.filter( (report) => {
        let isReportSafe = checkLevels(report)
        if( !isReportSafe){
            for (let i = 0; i < report.length ; i++) {
                let dampenReport = report.slice(0, i).concat(report.slice(i+1))
                let isSafe = checkLevels(dampenReport)
                if(isSafe) {
                    isReportSafe = true
                }
            }
        }
        return isReportSafe
    })

    return safeReports.length;
}

const main = async () => {

    console.log("Safe reports: ", await puzzle3())
}

main()