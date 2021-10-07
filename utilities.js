const fs = require('fs');

const serveFile = (req, res, path, contentType) => {
    const filestream = fs.createReadStream(path);
    res.writeHead(200, { "Content-Type": contentType });
    filestream.pipe(res);
}

const getReqBody = (req) => {
    return new Promise((resolve) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });
        req.on('end', () => {
            body = JSON.parse(body);
            resolve(body);
        });
    })
}

module.exports = {
    getReqBody,
    serveFile
}