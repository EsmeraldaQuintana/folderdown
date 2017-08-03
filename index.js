const showdown = require('showdown');
const fs = require('fs');
const converter = new showdown.Converter();
const readlineSync = require('readline-sync');

let folderName = readlineSync.question('Name of folder with markdown files?: ');
const filesSrc = './' + folderName + '/';

let folderDestName = readlineSync.question('Desired name for destiation folder?: ');
const destination = './' + folderDestName + '/';

// if destination folder doesn't exist, create it.
if (!fs.existsSync(destination)){
    fs.mkdirSync(destination);
}


const files = fs.readdirSync(filesSrc);

files.forEach( function(value) {
    const text = converter.makeHtml(fs.readFileSync(filesSrc + value, "utf8"));
    const title = readlineSync.question('Name file? ' + value + ' ');
    const fullPathDest = destination + title + '.html';
    fs.writeFileSync(fullPathDest, text);
    // console.log(fs.readFileSync(fullPathDest, "utf8"));
    console.log(fullPathDest + ' created!');
});
console.log();
console.log('++++++++++++++++++++++++++++++++++++++++++++');
console.log('Program exited!');
