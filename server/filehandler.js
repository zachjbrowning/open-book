const fs = require('fs');


exports.commit = function(notes) {
    fs.writeFile('./server/notebook.json', JSON.stringify(notes), err => {if (err) console.log(err); else console.log("saved");})

}

exports.load = function() {
    let rawdata = fs.readFileSync('./server/notebook.json');
    return JSON.parse(rawdata);
}