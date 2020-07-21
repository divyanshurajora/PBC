const $ = require("jquery");
require("jstree");
const nodePath = require("path");


$(document).ready(function(){
    let CurrPath = process.cwd();
    console.log(CurrPath);

    let data = [];
    let baseObj = {
        id: CurrPath,
        parent: "#",
        text:getname(CurrPath)
    }
    data.push(baseObj);
    
    $('#file-explorer').jstree({
        "core" : {
            "data": data
        }
    })
})

function getname(path){
    return nodePath.basename(path);
}