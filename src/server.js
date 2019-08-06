

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

var apiRoutes = require('./backend/routes/api');
var webRoutes = require('./backend/routes/web');

apiRoutes(app);
webRoutes(app);

app.listen(PORT, () => {
    console.log("Server listening on port", PORT);
});
