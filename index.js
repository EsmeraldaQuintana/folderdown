const showdown = require('showdown');
const fs = require('fs');
const converter = new showdown.Converter();
const readlineSync = require('readline-sync');

const fileSource = './markdownExamples/';
const destination = './dest/';

// if destination folder doesn't exist, create it.
if (!fs.existsSync(destination)){
    fs.mkdirSync(destination);
}


const files = fs.readdirSync(fileSource);

files.forEach( function(value) {
    const text = converter.makeHtml(fs.readFileSync(fileSource + value, "utf8"));
    const title = readlineSync.question('Name file? ' + value + ' ');
    console.log('named: ' + title);
    const fullPathDest = destination + title + '.html';
    fs.writeFileSync(fullPathDest, text);
    console.log(fs.readFileSync(fullPathDest, "utf8"));
    console.log('file read...====================');
    console.log();
});
console.log();
console.log('++++++++++++++++++++++++++++++++++++++++++++');
console.log('Program exited!');
