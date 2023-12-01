const fs = require("fs");

const arg = fs.readFileSync(__dirname +"/inputs.txt").toString().split("\n");

let final_two = 0;

const numberArray = [
    {key:"one",value:"1"},
    {key:"two",value:"2"},
    {key:"three",value:"3"},
    {key:"four",value:"4"},
    {key:"five",value:"5"},
    {key:"six",value:"6"},
    {key:"seven",value:"7"},
    {key:"eight",value:"8"},
    {key:"nine",value:"9"},
];

const changeValues = ()=>{
    for(let i = 0;i<arg.length;i++){
        const currentElement = arg[i];
        let finalString = '';
        let j = 0;
        while(j<currentElement.length){
            let currentString = currentElement.substring(j);
            const check = rec(currentString);
            if(check.val === "none"){
                finalString = finalString.concat(currentString[0]);
            }else{
                finalString = finalString.concat(check.val);
            }
            if(check.len === 1){
                j += 1;
            }else{
                j += check.len;
            }
        }
        arg[i] = finalString;
    }
}


function rec(e){
    for(let i = 0;i<numberArray.length;i++){
        const element = numberArray[i];
        if(e.startsWith(element.key)){
            return {val:element.value,len:element.key.length};
        }
    }
    return {val:"none",len:1};
}

const fun = (string)=>{
    const strArr = [];
    for(let i = 0;i <string.length;i++){
        strArr.push(string.charAt(i));
    }
    let first;
    let last;
    strArr.forEach(ele=>{
        if(Number(ele)){
            if(!first){
                first = ele; 
                last = ele;
                return;
            }
            last = ele;
        }
    })
    final_two += Number(first+last);
}


changeValues();
for(const element of arg){
    fun(element);
}

module.exports = final_two;