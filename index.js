var fs = require('fs'),
    path = require('path')

console.log(dirTree(`lessons`))

function updateInfo(filename, acc = {}) {
  acc.path = filename;
  acc.name = path.basename(filename);
  return acc;
}

function dirTree(filename) {

    var stats = fs.lstatSync(filename);
    var info = {}
    var extname = path.extname(filename);

    if (stats.isDirectory()) {
        updateInfo(filename, info);
        info.type = "folder";
        info.children = fs.readdirSync(filename)
                           .map(child => dirTree(filename + '/' + child));
    } else {
        if (extname === '.txt') {
          updateInfo(filename, info);
          info.type = "txt_file";
    /*      fs.readFile(filename, 'utf8', function(err, data) {
            if (err) throw err;
            console.log('OK: ' + filename);
            console.log(data)
          });*/
        }

    }

    const file_name = path.resolve('newfile.json');

    fs.writeFileSync(file_name, JSON.stringify(info, null, 2))
    return info;
}


/*

*/
