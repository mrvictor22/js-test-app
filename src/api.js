const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
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
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Get the response data
            const response = JSON.parse(this.responseText);
            // Access the values from the response object
            const values = response.results;
            console.log(values);
        }
    };
    xhr.open("GET", "https://randomuser.me/api?results=10", true);
    xhr.send();
    res.json({
        data: values
    });
});


app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);

// start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});