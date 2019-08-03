

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var apiRoutes = require('./routes/api');
var webRoutes = require('./routes/web');

apiRoutes(app);
webRoutes(app);

app.listen(PORT, () => {
    console.log("Server listening on port", PORT);
});
