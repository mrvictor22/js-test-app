const express = require("express");
const { faker } = require('@faker-js/faker');
const bodyParser = require('body-parser');
const serverless = require("serverless-http");
const app = express();
const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        hello: "hi!"
    });
});

router.get('/random-users', (req, res) => {
    fetch('https://randomuser.me/api?results=10')
        .then(response => response.json())
        .then(data => {
            res.send(data);
        });
});


app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);