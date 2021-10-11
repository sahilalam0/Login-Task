const express = require('express');
const app = express();

const path = require('path');

const db = require('./dbMethods');
const homeRoute = require('./Routes/home');
const userRoute = require('./Routes/user');

const PORT = process.env.PORT || 5000;

const frontendPath = path.join(__dirname, 'Frontend');

app.use(express.static(frontendPath));
app.use(express.json());
app.use('/home', homeRoute);
app.use('/user', userRoute);

app.listen(PORT, () => {
    console.log("Server Started");
    console.log("http://localhost:" + PORT);
    db.initializeConnection().then((data) => {
        console.log(data);
    }).catch((err) => {
        console.log(err);
    })
});
