const db = require('../dbMethods');
const { getReqBody } = require('../utilities');

async function post(req, res) {
    try {
        const body = await getReqBody(req);
        const user = await db.find(body);
        if (user !== undefined) {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            }).end(JSON.stringify({
                message: "User already exists with this email !"
            }));
            return;
        }

        const newUser = await db.createUser(body.email);
        res.writeHead(201, {
            'Content-Type': 'application/json'
        }).end(JSON.stringify(newUser));
        return;
    }
    catch (err) {
        res.writeHead(500, {
            'Content-Type': 'application/json'
        }).end(JSON.stringify(err));
        return;
    }
}

async function get(req, res) {
    try {
        const users = await db.find();
        res.writeHead(200, {
            'Content-Type': 'application/json'
        }).end(JSON.stringify(users));
        return;
    }
    catch (err) {
        res.writeHead(500, {
            'Content-Type': 'application/json'
        }).end(JSON.stringify(err));
        return;
    }
}

async function put(req, res) {
    try {
        const params = req.url.split('/');
        const [, , userId] = params;

        if (userId && userId.length) {
            const body = await getReqBody(req);
            const updatedUser = await db.updatePasswordByUserId(userId, body.password);
            res.writeHead(200, {
                'Content-Type': 'application/json'
            }).end(JSON.stringify(updatedUser));
            return;
        }
    }
    catch (err) {
        res.writeHead(500, {
            'Content-Type': 'application/json'
        }).end(JSON.stringify(err));
        return;
    }
}

async function del(req, res) {
    try {
        const params = req.url.split('/');
        const [, , userId] = params;

        if (userId && userId.length) {
            const data = await db.deleteUserById(userId)
            res.writeHead(200, {
                'Content-Type': 'application/json'
            }).end(JSON.stringify(data));
            return;
        }
    }
    catch (err) {
        res.writeHead(500, {
            'Content-Type': 'application/json'
        }).end(JSON.stringify(err));
        return;
    }
}

function main(req, res) {
    if (req.method === 'GET') {
        get(req, res);
        return;
    }
    if (req.method === 'POST') {
        post(req, res);
        return;
    }
    if (req.method === 'PUT') {
        put(req, res);
        return;
    }
    if (req.method === 'DELETE') {
        del(req, res);
        return;
    }
    res.writeHead(404).end(JSON.stringify({
        message: "Invalid Url !"
    }));
}

module.exports = {
    main
}