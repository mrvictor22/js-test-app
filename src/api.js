const express = require("express");
const { faker } = require('@faker-js/faker');
const bodyParser = require('body-parser');
const serverless = require("serverless-http");
const app = express();
const router = express.Router()
const cors = require("cors");;
const axios = require('axios');
router.get("/", (req, res) => {
    res.json({
        hello: "hi!"
    });
});
app.use(cors())
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

// POST /users
router.post('/users', (req, res) => {
    // create a new user from the request body
    const user = req.body;

    // save the user in the database or in-memory store
    users.push(user);

    // return the saved user
    res.json(user);
});


// GET /users
router.get('/users', (req, res) => {
    // fetch saved users and mix them with random users
    const mixedUsers = [...users, ...fetchRandomUsers()];

    // return the mixed users
    res.json({user: mixedUsers});
});


function fetchRandomUsers() {
    const numUsers = Math.floor(Math.random() * 10) + 1;
    const users = [];
    for (let i = 0; i < numUsers; i++) {
        const user = {
            id: faker.datatype.uuid(),
            name: faker.internet.userName(),
            email: faker.internet.email(),
            avatar: faker.image.avatar()
        };
        users.push(user);
    }
    return users;
}

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);

// start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
