const http = require('http');
const url = require('url');
const path = require('path');
const db = require('./dbMethods');
const homeRoute = require('./Routes/home');
const userRoute = require('./Routes/user');


const { serveFile } = require('./utilities');

const PORT = process.env.PORT || 5000;

const frontendPath = __dirname + '/Frontend';

const server = http.createServer(async (req, res) => {

    const URL = url.parse(req.url, true);

    if (path.extname(URL.pathname) === '.js') {
        serveFile(req, res, `${frontendPath}/${URL.pathname}`, "text/javascript");
        return;
    }

    if (URL.pathname === '/') {
        homeRoute.main(req, res, URL, frontendPath);
        return;
    }

    if (URL.pathname.startsWith('/user')) {
        userRoute.main(req, res);
        return;
    }

    res.writeHead(404).end(JSON.stringify({
        message: "Invalid Url !"
    }));
});
//test comment
server.listen(PORT, () => {
    console.log("Server Started");
    console.log("http://localhost:" + PORT);
    db.initializeConnection().then((data) => {
        console.log(data);
    }).catch((err) => {
        console.log(err);
    })
})
