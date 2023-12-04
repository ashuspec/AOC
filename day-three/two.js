const fs = require('fs');

const arg = fs.readFileSync(__dirname + "/inputs.txt").toString().split('\n');

let modifiedArg = [];

for(let i = 0;i<arg.length;i++){
    const current = arg[i];
    if(i === 0){
        const newArr = ['',current.replace('\r',''),arg[i + 1].replace('\r','')];
        modifiedArg.push(newArr);
    }else if(i === arg.length - 1){
        const newArr = [arg[i - 1].replace('\r',''),current.replace('\r',''),''];
        modifiedArg.push(newArr);
    }
    if(i > 0 && i < arg.length - 1){
        const newArr = [arg[i - 1].replace('\r',''),current.replace('\r',''),arg[i + 1].replace('\r','')];
        modifiedArg.push(newArr);
    }
}

const getValidString = (arr,index)=>{
    const len = arr[1].length;
    const lowerBound = index - 3 < 0 ? index - 2 < 0 ? index - 1 < 0 ? index : index - 1 : index - 2 : index - 3;
    const upperBound = index + 3 > len ? index + 2 > len ? index + 1 > len ? index : index + 1 : index + 2 : index + 3;
    return [arr[0].substring(lowerBound,upperBound+1),arr[1].substring(lowerBound,upperBound+1),arr[2].substring(lowerBound,upperBound+1)];
}

let final_two = 0;

const validStrings = [];
modifiedArg.forEach(arr=>{
    const elementToCheck = String(arr[1]);
    let i = 0;
    while(i<elementToCheck.length){
        const current = elementToCheck[i];
        if(current !== '.' && isNaN(Number(current))){
            if(current === '*'){
                validStrings.push(getValidString(arr,i));
            }
        }
        i++;
    }
});

const check = ()=>{
    for(let i = 0;i<validStrings.length;i++){
        const current = validStrings[i];
        const prodVal = validate(current);
        final_two += prodVal;
    }
}

const validate = (arr)=>{
    let mul1 = 0;
    let mul2 = 0;
    let i = 0;
    while(i<3){
        if(arr[i].length > 0){
            if(arr[i].charAt(2) === '0' || (arr[i].charAt(1) === '0' && Number(arr[i].charAt(2))) || Number(arr[i].charAt(2)) || Number(arr[i].charAt(3)) || Number(arr[i].charAt(4))){
                const oneVerified =  stringLoop(arr[i]);
                if(oneVerified[0] > 0 && oneVerified[1] > 0){
                    return oneVerified[0]*oneVerified[1];
                }else if(oneVerified[0] > 0 && oneVerified[1] === 0){
                    if(mul1 > 0 && mul2 === 0) mul2 = oneVerified[0];
                    if(mul1 === 0) mul1 = oneVerified[0];
                }
            }
        }
        i += 2;
    }
    if(Number(arr[1].charAt(2)) || arr[1].charAt(2) === '0'){
        const twoVerified1 = recurring(arr[1],0,'',0);
        if(mul1 > 0 && mul2 === 0) mul2 = twoVerified1[0];
        if(mul1 === 0) mul1 = twoVerified1[0];
    }
    if(Number(arr[1].charAt(4))){
        const twoVerified2 = recurring(arr[1],4,'',0);
        if(mul1 > 0 && mul2 === 0) mul2 = twoVerified2[0];
        if(mul1 === 0) mul1 = twoVerified2[0];
    }
    return mul1*mul2;
}

const stringLoop = (str)=>{
    let fNum = 0;
    let sNum = 0;
    let i = 0;
    while(i<5){
        if(str.charAt(i) !== '.' && Number(str.charAt(i))){
            const reccResult = recurring(str,i,'',0);
            if(i+reccResult[1] > 2){ 
                if(fNum === 0) {
                    fNum = reccResult[0];
                }else if(fNum > 0 && sNum === 0){
                    sNum = reccResult[0];
                }    
                i = i+reccResult[1] -1;
            }else if((i === 3 || i === 4) && Number(str.charAt(i))){
                const reccResult = recurring(str,i,'',0);
                if(fNum === 0) {
                    fNum = reccResult[0];
                }else if(fNum > 0 && sNum === 0){
                    sNum = reccResult[0];
                } 
                i = i+reccResult[1] -1;  
            }
        }
        i++;
    }
    return [fNum,sNum];
}

const recurring = (str,startIndex,toAdd,indexToAdd)=>{
    if(str.charAt(startIndex) === '.' && indexToAdd === 0){
        return recurring(str,startIndex+1,toAdd,indexToAdd);
    }else if(str.charAt(startIndex) === '0' || Number(str.charAt(startIndex))){
        return recurring(str,startIndex+1,toAdd.concat(str.charAt(startIndex)),1+indexToAdd);
    }
    return [toAdd,indexToAdd];
}

check();

module.exports = final_two;