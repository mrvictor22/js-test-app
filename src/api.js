import fetch from "node-fetch";
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
const dt = fetch('https://randomuser.me/api?results=10')
    .then(response => response.json())
    .then(data => {
        res.json(data);
    });
router.get('/random-users', (req, res) => {

    res.json({
        data: dt
    });
});


app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);

// start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});