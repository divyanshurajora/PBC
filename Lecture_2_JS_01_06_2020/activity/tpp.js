let input = process.argv.slice(2);
let viewFile = require("./commands/view");
let helpFile = require("./commands/help");
let untreefyfile = require("./commands/untreefy");
let treefyfile = require("./commands/treefy");
// console.log(input);
// [node ,tpp.js ,view ,src ,-t]
// node tpp.js view src -f
let cmd = input[0];
switch (cmd) {
    case "view":
        viewFile.view(process.argv[3], process.argv[4]);
        break;
    case "treefy":
        treefyfile.treefy(process.argv[3], process.argv[4]);
        break;
    case "untreefy":
        untreefyfile.untreefyfn(process.argv[3], process.argv[4]);
        break;
    case "help":
        helpFile.help();
        break;
    default:
        console.log("Work Command");
        break;
}