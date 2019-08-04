
module.exports = (app) => {

    app.get('*', (req, res) => {
        res.sendFile('/var/www/index.html');
    });
};