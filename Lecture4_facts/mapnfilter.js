let arr = [3, 6, 14, 16, 22];
function ID(elem) {

    if (elem % 2 == 0) {
        return elem + 1;
    } else {
        return elem - 1;
    }

}

function test(elem){
    for(let i = 2; i*i<=elem; i++){
        if(elem%i==0){
            return false;
        }
    }
    return true;
}
let newArray = arr.map(ID);
console.log(newArray);
console.log("''''''''''''''''''''");
console.log(arr);
console.log("---------------------------")
let fArr = newArray.filter(test);
console.log(fArr);
console.log("''''''''''''''''''''");
console.log(arr);