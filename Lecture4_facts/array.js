let array = [1,
    1.1,
    "i am string",
    [1, 2, 3, 4],
    { key: "value inside array" },
    function sayhi() {
        console.log("i am function inside array");
    }]

    for(let i in array){
        console.log(i);
        console.log(array[i]);
        console.log("---------------------");
    }
    
    array[5]();
    array["5"]();
    console.log(array[85]);
    array[85]=25;
    //console.log(array);
    array.lastvalue = "i am last value";
    console.log(array);
    
