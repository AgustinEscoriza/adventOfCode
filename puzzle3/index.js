const rf = require("../commons/readFile")


const puzzle3 = async function puzzle3() {
    
    const input = await rf.readTxtFile('../puzzle3/input.txt')
    let reports = input.split('\r\n')
    reports = reports.map( r => r.split(' '))
    
    let safeReports = await reports.filter( (report) => {
        let safe = true;
        let isIncreasing = undefined;
        for (let i = 0; i < report.length; i++) {
            if( i > 0){
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
            
        }
        return safe;
    })

    return safeReports.length;
}

const main = async () => {

    console.log("Safe reports: ", await puzzle3())
}

main()