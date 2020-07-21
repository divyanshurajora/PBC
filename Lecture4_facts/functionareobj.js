function fn(){
console.log("i am function");
}

fn.myprop = "i am property of function";

fn.myfn = function(){
    console.log("i am the method of the object that can be called");
}
console.log(fn.myprop);
fn.myfn();