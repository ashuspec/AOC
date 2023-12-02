const fs = require('fs');

const arg = fs.readFileSync(__dirname+"/inputs.txt").toString().split("\n");

let final_two = 0;

const modifiedArr = arg.map(element=>{
    const newArr = element.split(": ");
    const newArrChild = newArr[1].split("; ");
    const finalChild = newArrChild.map(e=>e.split(", "));
    const finalLen = finalChild[finalChild.length-1].length - 1;
    finalChild[finalChild.length-1][finalLen] = finalChild[finalChild.length-1][finalLen].replace("\r","");
    newArr[1] = finalChild;
    return newArr;
})

const sendCubes = (arr)=>{
    const cubes = [0,0,0];
    for(let i = 0;i<arr.length;i++){
        const element = arr[i];
        if(element.includes("red")){
            cubes[0] = Number(element.split(" ")[0]);
        }else if(element.includes("green")){
            cubes[1] = Number(element.split(" ")[0]);
        }else if(element.includes("blue")){
            cubes[2] = Number(element.split(" ")[0]);
        }
    }
    return cubes;
}


modifiedArr.forEach(element => {
    const recordsArr = element[1];
    const leastCubes = [1,1,1];
    for(let i = 0;i<recordsArr.length;i++){
        const noOfCubes = sendCubes(recordsArr[i]);
        if(noOfCubes[0] !== 0 && noOfCubes[0]>leastCubes[0]){
            leastCubes[0] = noOfCubes[0];
        }
        if(noOfCubes[1] !== 0 && noOfCubes[1]>leastCubes[1]){
            leastCubes[1] = noOfCubes[1];
        }
        if(noOfCubes[2] !== 0 && noOfCubes[2]>leastCubes[2]){
            leastCubes[2] = noOfCubes[2];
        }
    }
    final_two += leastCubes[0]*leastCubes[1]*leastCubes[2];
});

module.exports = final_two;