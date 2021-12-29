const path = require('path');
const express = require('express');
const fs = require('fs');
const events = require('events');
const rateLimit = require("express-rate-limit");
const app = express();
const cors = require('cors');
const userController = require("./controllers/users");
const port = process.env.PORT || 3003;
const publicPath = path.join(__dirname,'public');

app.use(cors());

// const limiter = rateLimit({
//     windowMs: 2000 * 60 * 1000, // 15 minutes
//     max: 100, // limit each IP to 100 requests per windowMs
//     message: "Too many requests from this IP, please try again after a minute"
// });
// app.use(limiter);
const em = new events.EventEmitter();
em.on('FirstEvent', function (data) {
    console.log('First subscriber: ' + data);
});

// Raising FirstEvent
em.emit('FirstEvent', 'This is my first Node.js event emitter example.');

var myLogger = function (req, res, next) {
    const my_data = new Date();
    
    fs.appendFile('log.txt', req.originalUrl + ',' + my_data.toString() + '\n'  ,(err)=>{
        if(err) console.log(err);
    })
    next();
  };
  

// app.get("/users", userController.create); 
 
app.use(express.static(__dirname + '/public'));
app.get('/send', (req,res) =>{
  res.status(201).send({ error: 'something blew up' });
})
app.get('/summary',(req,res) => {
    res.sendFile(path.join(__dirname, 'summary.json'));
});
app.get('/*', function (req,res) {  
    res.status(200).sendFile(path.join(__dirname + '/public', 'index.html'));
  });
// app.use(myLogger);


// app.get('/summary_brand',(req,res) => {
//     res.sendFile(path.join(__dirname, 'summary_brand.json'));
// });
// app.get('/read_log',(req,res) => {
//     fs.readFile('log.txt', 'utf8',function(err,data){
//         if( err )  err;        
//         res.sendFile(path.join(__dirname,'log.txt'));
//     });
// });
    

// app.get('*', (req, res) => {
//     console.log(req.ip);
//     res.write('<h1>Something broke!</h1>');
// });
// app.use(function(err, req, res, next) {
//     console.error(err.stack);
//     res.status(404).send('<h1>Something broke!</h1>');
// });
app.listen(port, () => {   
    console.log(`Server is up on port ${port}!`);
});