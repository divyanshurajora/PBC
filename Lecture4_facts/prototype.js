Array.prototype.sum = function() {
    let sum = 0;
    for(let i = 0 ; i < this.length ; i++){
        sum = sum+this[i];

    }
console.log(sum);
}

let arr1 = [1,2,3,4,5];
let arr2 = [3,4,16,17];
let arr3 = [1,5,15,17];

arr1.sum();
arr2.sum();
arr3.sum();