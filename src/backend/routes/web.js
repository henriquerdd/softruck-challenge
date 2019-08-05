
module.exports = (app) => {

    app.get(/^(?!\/api.*$).*/, (req, res) => {
        res.sendFile('/var/www/public/index.html');
    });
};