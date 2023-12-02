const fs = require('fs');

const arg = fs.readFileSync(__dirname +'/inputs.txt').toString().split('\n');

let final_one = 0;

const modifiedArr = arg.map(element=>{
    const newArr = element.split(": ");
    const newArrChild = newArr[1].split("; ");
    const finalChild = newArrChild.map(e=>e.split(", "));
    const finalLen = finalChild[finalChild.length-1].length - 1;
    finalChild[finalChild.length-1][finalLen] = finalChild[finalChild.length-1][finalLen].replace("\r","");
    newArr[1] = finalChild;
    return newArr;
})

const cubeMatches = [12,13,14];

const check = ()=>{
    modifiedArr.forEach(element=>{
        const gameNumber = Number(element[0].substring(5));
        const recordsArr = element[1];
        let qualified;
        for(let i = 0;i<recordsArr.length;i++){
            qualified = sendGamesStatus(recordsArr[i]);
            if(!qualified){
                break;
            }
        }
        if(qualified){
            final_one += gameNumber;
        }
    })
}

const sendGamesStatus = (arr) => {
    for(let i = 0;i<arr.length;i++){
        const element = arr[i];
        if(element.includes("red")){
            if(Number(element.split(" ")[0]) > cubeMatches[0]){
                return false;
            }
        }else if(String(element).includes("green")){
            if(Number(element.split(" ")[0]) > cubeMatches[1]){
                return false;
            }
        }else if(element.includes("blue")){
            if(Number(element.split(" ")[0]) > cubeMatches[2]){
                return false;
            }
        }
    }
    return true;
}

check();
module.exports = final_one;