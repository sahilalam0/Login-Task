const express = require('express');
const router = express.Router();

const db = require('../dbMethods');

router.get('/', async (req, res) => {
    try {
        const users = await db.find();
        res.status(200).json(users);
        return;
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
        return;
    }
});

router.post('/', async (req, res) => {
    try {
        const body = req.body;
        console.log(body);
        const user = await db.find(body);
        if (user) {
            res.status(200).json({
                message: "User already exists with this email !"
            });
            return;
        }

        const newUser = await db.createUser(body.email);
        res.status(201).json(newUser);
        return;
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
        return;
    }
});

router.put('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        if (userId && userId.length) {
            const body = req.body;
            const updatedUser = await db.updatePasswordByUserId(userId, body.password);
            res.status(200).json(updatedUser);
            return;
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
        return;
    }
});

router.delete('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        if (userId && userId.length) {
            const data = await db.deleteUserById(userId);
            res.status(200).json(data);
            return;
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
        return;
    }
});

module.exports = router;