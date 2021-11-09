const path = require('path');
const express = require('express');
const fs = require('fs');
const events = require('events');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3003;
const publicPath = path.join(__dirname,'public');

app.use(cors());

const em = new events.EventEmitter();
em.on('FirstEvent', function (data) {
    console.log('First subscriber: ' + data);
});

// Raising FirstEvent
em.emit('FirstEvent', 'This is my first Node.js event emitter example.');

var myLogger = function (req, res, next) {
    const my_data = new Date();
    fs.appendFile('log.txt', my_data.toString() + '\n'  ,(err)=>{
        if(err) console.log(err);
    })
    next();
  };
  
app.use('/read_log',myLogger);
app.use(express.static(__dirname + '/public'));


app.get('/summary',(req,res) => {
    res.sendFile(path.join(__dirname, 'summary.json'));
});
app.get('/summary_brand',(req,res) => {
    res.sendFile(path.join(__dirname, 'summary_brand.json'));
});
app.get('/read_log',(req,res) => {
    fs.readFile('log.txt', 'utf8',function(err,data){
        if( err )  err;
        console.log(data);
        res.sendFile(path.join(__dirname,'log.txt'));
    });
});
    

app.get('*', (req, res) => {
    console.log(req.ip);
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {   
   
    console.log(`Server is up on port ${port}!`);
});