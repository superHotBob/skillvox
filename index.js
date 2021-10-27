const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3003;
const publicPath = path.join(__dirname,'public');

app.use(cors());

app.use(express.static(__dirname + '/public'));

app.get('/summary',(req,res) => {
    res.sendFile(path.join(__dirname, 'summary.json'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});