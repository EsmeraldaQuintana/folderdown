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

    console.log(`beforePP: srcFolder is ${srcFolder} and destFolder is ${destFolder}`);
    srcFolder = properPath(srcFolder);
    destFolder = properPath(destFolder);
    console.log(` afterPP: srcFolder is ${srcFolder} and destFolder is ${destFolder}`);

    if (!fs.existsSync(destFolder)){
        fs.mkdirSync(destFolder);
        console.log(`folderdown: ${destFolder} created.`);
    }

    let files = fs.readdirSync(srcFolder);

    // filter out non-markdown files
    files = files.filter(function(value) {
        return S(value).endsWith('.md');
    });

    // end if there are no files
    if (files == undefined || files.length === 0) {
        console.log('folderdown: Error: No markdown files found. Exiting.');
        process.exit(0);
    }

    console.log(`folderdown: files are ${files}`);

    files.forEach( function(value) {
        console.log(`folderdown: srcFolder + value is ${srcFolder + value}`);
        const text = converter.makeHtml(fs.readFileSync(srcFolder + value, "utf8"));
        const fullPathDest = `${destFolder}${S(value).left(value.length-3).s}.html`;
        fs.writeFileSync(fullPathDest, text);
        // console.log(fs.readFileSync(fullPathDest, "utf8"));
        console.log('folderdown: ' + fullPathDest + ' created.');
    });
    console.log('folderdown: exited, no errors.');
}

function properPath(str) {
    if (str == '.')
        return './';
    if (S(str).left(1).endsWith('/')) {
        str = '.' + str;
    } else {
        str = './' + str;
    }
    if (!S(str).right(1).endsWith('/'))
        str = str + '/';
    return str;
}

exports.run = run;
