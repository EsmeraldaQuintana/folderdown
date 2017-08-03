const fs = require('fs');
const readlineSync = require('readline-sync');
const S = require('string');
const showdown = require('showdown');
const converter = new showdown.Converter();

console.log('folderdown: starting process.');

/**
 * Begins the folderdown process.
 * @param  {string} srcFolder  The folder holding the markdown files.
 * @param  {string} destFolder The destination folder for converted files.
 */
function run(srcFolder, destFolder) {
    let tries = 0;
    while (!fs.existsSync(srcFolder) && tries<3){
        tries++;
        if (tries === 3) {
            console.log(`folderdown: Error! Source folder not found after
                three tries.`);
            process.exit(0);
        }
        console.log(`Folder not found! Try again. `);
        srcFolder = readlineSync.question(`Path of folder with markdown files?: `);
    }
    console.log(`folderdown: ${srcFolder} found.`);

    if (!fs.existsSync(destFolder)){
        fs.mkdirSync(destFolder);
        console.log(`folderdown: ${destFolder} created.`);
    }
    console.log(`folderdown: ${destFolder} found.`);

    const files = fs.readdirSync(srcFolder);
    if (files.length === 0) {
        console.log('Error: No markdown files seen.');
        process.exit(0);
    }

    files.forEach( function(value) {
        const text = converter.makeHtml(
            fs.readFileSync(srcFolder + value, "utf8"));
        const fullPathDest = `${destFolder}${S(value).left(value.length-3).s}.html`;
        fs.writeFileSync(fullPathDest, text);
        // console.log(fs.readFileSync(fullPathDest, "utf8"));
        console.log('folderdown: ' + fullPathDest + ' created.');
    });
    console.log('folderdown: exited, no errors.');
}

exports.run = run;
