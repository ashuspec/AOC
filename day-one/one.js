const fs = require('fs');

const arg = fs.readFileSync(__dirname +'/inputs.txt').toString().split('\n');

let final_one = 0;

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
    final_one += Number(String(first)+String(last));
}
for(const element of arg){
    fun(element);
}
module.exports = final_one;
