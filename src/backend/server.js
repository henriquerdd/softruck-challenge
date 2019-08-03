

var express = require('express');

var app = express();

const PORT = 3000;

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(PORT, function () {
    console.log("Server listening on port", PORT);
});