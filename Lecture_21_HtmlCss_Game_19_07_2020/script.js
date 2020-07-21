const d = document;

const bar1 = d.querySelector("#one");
const bar2 = d.querySelector("#two");
const ball = d.querySelector("#ball");
const body = d.querySelector("body");

body.addEventListener("keydown", function(event){
    let bound = body.clientHeight;
    console.log(bound);
    let b1top = Number((bar1.style.top.slice(0,-2))); //slice-> 10px -> 10
    console.log(b1top);
    if(event.key=="w" && b1top > 10){
        bar1.style.top = (b1top - 50) + "px";
    }
    if(event.key=="s" && b1top < (bound - 170)){
        bar1.style.top = (b1top + 50) + "px";
    }

    let b2top = Number((bar2.style.top.slice(0,-2))); //slice-> 10px -> 10
    if(event.key=="ArrowUp" && b2top > 10){
        bar2.style.top = (b2top - 50) + "px";
    }
    if(event.key=="ArrowDown" && b2top < (bound - 170)){
        bar2.style.top = (b2top + 50) + "px";
    }
     
})

xd = true;
yd = true;
paddle = true;

function ballmover(){
    let bodyheight = body.clientHeight;
    let bodywidth = body.clientWidth;

    let ballleft = Number(ball.style.left.slice(0,-2))
    let balltop = Number(ball.style.top.slice(0,-2));
    let ballbottom = Number(ball.style.top.slice(0,-2)) + 100;
    let ballright = Number(ball.style.left.slice(0,-2)) + 100;
    paddle1right = Number(bar1.style.left.slice(0,-2)) + 30;
    //paddle2left = Number(bar2.style.left.slice(0,-2));

    if(ballleft == 0 || ballright == bodywidth){
         xd = !xd;
    }
    if(balltop == 0 || ballbottom == bodyheight){
        yd = !yd;
    }
    if(ballleft == paddle1right){
        ball.style.left = xd = (ballleft + 1) + "px";
    }
    if(ballright == paddle2left){
        ball.style.left = xd = (ballleft - 1) + "px";
    }
    
    ball.style.left = newxd = xd == true ? (ballleft - 1) + "px" : (ballleft + 1) + "px";
    ball.style.top = newyd = yd == true ? (balltop - 1) + "px" : (balltop + 1) + "px";
    
}
setInterval(ballmover, 1);