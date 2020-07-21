let request = require("request");
let fs = require("fs");
let cheerio = require("cheerio");
console.log("sending request");
//let url = "https://www.espncricinfo.com/scores/series/19322/india-in-new-zealand-2019-20?view=results"
let url = "https://www.espncricinfo.com/series/19322/commentary/1187684/new-zealand-vs-india-3rd-odi-india-in-new-zealand-2019-20"

request (url,cb);

function cb(err,response,html){
    console.log("received response");
    if(err==null && response.statusCode==200){
        fs.writeFileSync("index.html", html);
        parseHtml(html);
        console.log("file saved");
    }else if(response.statusCode == 404){
        console.log("page not found");
    }else{
        console.log(err);
        console.log(response.statusCode);
    }
}

function parseHtml(html){
    console.log("parsing html");
    let $ = cheerio.load(html);

    //let title = $('.header-title.label');
    //bring all the selected elements
    let elemArr = $('.match-comment-wrapper');
    //let ans = elemArr.text();
    //console.log(ans);
    //ans = $('.match-comment-wrapper').text();
    //console.log(ans);

    //print html of first element
    //console.log(element.html());

    //print text of all selected element
    //console.log(element.tect());

    console.log("------------------------------");
    //console.log(title.text());
    //1.generic
    let lbc = $(elemArr[0]).text();
    console.log(lbc);
    //2.first element text
    //let ans = $(elemArr.html()).text();
    //console.log(ans);
    
    console.log("------------------------------");

}


