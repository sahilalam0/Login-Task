const db = require('../dbMethods');
const { serveFile } = require('../utilities');

async function getWithQuery(req, res, URL) {
    try {
        if (URL.query?.email.length && URL.query?.password.length) {
            const result = await db.login(URL.query.email, URL.query.password);
            res.writeHead(result ? 200 : 401, {
                'Content-Type': 'application/json'
            }).end(JSON.stringify({
                message: result ? "Login Successful !" : "Login Failed"
            }));
            return;
        }

        res.writeHead(400, {
            'Content-Type': 'application/json'
        }).end(JSON.stringify({
            message: "Please provide valid email and password !"
        }))
        return;
    }
    catch (err) {
        res.writeHead(500, {
            'Content-Type': 'application/json'
        }).end(JSON.stringify(err));
        return;
    }

}



function get(req, res, URL, frontendPath) {
    if (URL.query.email && URL.query.password) {
        getWithQuery(req, res, URL);
        return;
    }
    serveFile(req, res, `${frontendPath}/index.html`, 'text/html');
}

function main(req, res, URL, frontendPath) {
    if (req.method === 'GET') {
        get(req, res, URL, frontendPath);
        return;
    }
    res.writeHead(404).end(JSON.stringify({
        message: "Invalid Url !"
    }));
}

module.exports = {
    main
}