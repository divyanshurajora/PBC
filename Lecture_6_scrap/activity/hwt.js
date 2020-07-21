let request = require("request");
let fs = require("fs");
let cheerio = require("cheerio");
console.log("sending request");
let url = "https://www.espncricinfo.com/series/19322/scorecard/1187684/new-zealand-vs-india-3rd-odi-india-in-new-zealand-2019-20"

request (url,cb);

function cb(err,response,html){
    console.log("received response");
    if(err==null && response.statusCode==200){
        fs.writeFileSync("match.html", html);
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
    console.log("------------------------------");
    let players = $('.table.bowler tbody tr');
    fs.writeFileSync("players.html", players);
    for(let i=0; i<players.length; i++){
        //get name
        letAllColOfaPlayer = $(players[i]).find("td");
        let cPlayername = $(letAllColOfaPlayer[0]).text();
        let wickets = $(letAllColOfaPlayer[4]).text();
        console.log(cPlayername + " " + wickets);
    }
    console.log("------------------------------");

}