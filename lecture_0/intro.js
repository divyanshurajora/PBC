console.log("hello!!");
let varName;
//varName = 10;
//varName = "i am a string";
//varName = true;
//varname = null;
console.log(varName);

let number = 23;
for(let div = 2; div*div <= number; div++){
    if(number%div ==0){
        console.log("number is not prime");
        return;
    }
}
console.log("number is prime");