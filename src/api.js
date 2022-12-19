const express = require("express");
const { faker } = require('@faker-js/faker');
const bodyParser = require('body-parser');
const serverless = require("serverless-http");
const app = express();
const router = express.Router();
const axios = require('axios');
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

function generateUsers() {
    axios.get('https://randomuser.me/api?results=10')
        .then(response => {
            // Access the values from the response object
            const values = response.data.results;
            console.log(values);
            return values;
        })
        .catch(error => {
            console.log(error);
        });
}

router.get('/values', (req, res) => {
    axios.get('https://randomuser.me/api?results=10')
        .then(response => {
            // Access the values from the response object
            const values = response.data.results;
            res.send(values);
        })
        .catch(error => {
            res.send(error);
        });
});


router.get('/random-users', (req, res) => {


    res.json({
        data: generateUsers()
    });


});


app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);

// start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
