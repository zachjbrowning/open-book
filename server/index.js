var filehandler = require('./filehandler');


const express = require('express');
const path = require('path'); 
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const DIST_DIR = path.join(__dirname, '../dist');
const APP_ENTRY = path.join(DIST_DIR, 'index.html');

//Setting up static file access
app.use(express.static(DIST_DIR));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.get('/load', (req, res) => {
    let data = filehandler.load();
    res.send(data);
})

app.post('/commit', (req, res) => {
    filehandler.commit(req.body);
    
    res.send({msg : "Success"});
})

//Routing, default sends all urls 
app.get('/*', (req,res) => {
    res.sendFile(APP_ENTRY);
});

//Listening for requests
app.listen(port, () => {
    console.log('Listening on port ' + port);
})