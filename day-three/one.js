const fs = require('fs');

const arg = fs.readFileSync(__dirname+"/inputs.txt").toString().split("\n");

let modifiedArg = [];

let final_one = 0;

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

const check = ()=>{
    for(let i = 0;i<modifiedArg.length;i++){
        if(i === 25){
            setTimeout(()=>{},1000);
        }
        validate(modifiedArg[i]);
    }
}

const validate = (arr)=>{
    const elementToCheck = String(arr[1]);
    let i = 0;
    while(i<elementToCheck.length){
        const current = elementToCheck[i];
        if(current !== '.'){
            if(Number(current)){
                const tA = recurring(elementToCheck,i,'',0);
                const validity = validateUpperLower(arr,[i-1,i+tA[1]]);
                if(validity) {
                    final_one += Number(tA[0])
                }
                i += tA[1] - 1;
            }
            if(!Number(current)){
                if(Number(elementToCheck[i+1])){
                    const tA = recurring(elementToCheck,i+1,'',0);
                    const validity = validateUpperLower(arr,[i-1,i+tA[1]]);
                    if(validity) {
                        final_one += Number(tA[0])
                    }
                    i += tA[1] -1;
                }
            }
        }
        i++;
    }
    
}
const recurring = (str,i,tA,iTA)=>{
    let numberToAdd = tA;
    let indexToCheck = iTA;
    if(str.charAt(i) === '0' || Number(str.charAt(i))){
        return [...recurring(str,i+1,numberToAdd.concat(str.charAt(i)),iTA + 1)];
    }else{
        if(String(str).charAt(i)){
            return [numberToAdd,indexToCheck+1];
        }else{
            return [numberToAdd,indexToCheck]
        }
    }
}

const validateUpperLower = (arr,indexBound)=>{
   
    const lowerBound = indexBound[0] < 0?0:indexBound[0];
    if(arr[0].length > 0){
        const toCheck =  String(arr[0]).substring(lowerBound,indexBound[1]);
        for(let i =0;i<toCheck.length;i++){
            if(toCheck.charAt(i) !== '.' && !Number(toCheck.charAt(i))){
                return true;
            }
        }
    }
    if(arr[2].length > 0){
        const toCheck =  String(arr[2]).substring(lowerBound,indexBound[1]);
        for(let i =0;i<toCheck.length;i++){
            if(toCheck.charAt(i) !== '.' && Number(toCheck.charAt(i)) !== 0 && !Number(toCheck.charAt(i))){
                return true;
            }
        }
    }
    const toCheck =  String(arr[1]).substring(lowerBound,indexBound[1]);
        for(let i = 0;i<toCheck.length;i++){
            if(toCheck.charAt(i) !== '.' && !Number(toCheck.charAt(i)) && toCheck.charAt(i) !== '0'){
                return true;
            }
        }
    return false;
}
check();

module.exports = final_one;