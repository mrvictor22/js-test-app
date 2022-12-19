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
let ramusers;

axios.get('https://randomuser.me/api?results=10')
    .then(function (response) {
        ramusers = response.data.results;
    })
    .catch(function (error) {
        console.log(error);
    });

function getUsers() {
    return ramusers;
}

router.get('/random-users', (req, res) => {

    res.send(getUsers());


});


app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);

// start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
