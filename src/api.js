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

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

let users = [];
router.get('/random-users', (req, res) => {
    fetch('https://randomuser.me/api?results=10')
        .then(response => response.json())
        .then(data => {
            res.json(data);
        });
});


app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);