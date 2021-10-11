const express = require('express');
const router = express.Router();

const db = require('../dbMethods');

router.get('/', async (req, res) => {
    try {
        if (req.query?.email.length && req.query?.password.length) {
            const result = await db.login(req.query.email, req.query.password);
            res.status(result ? 200 : 401).json({
                message: result ? "Login Successful !" : "Login Failed"
            });
            return;
        }
        res.status(400).json({
            message: "Please provide valid email and password !"
        });
        return;
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
        return;
    }

});

module.exports = router;