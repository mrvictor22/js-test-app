const express = require('express');
const app = express();

app.get('/random-users', (req, res) => {
    fetch('https://randomuser.me/api?results=10')
        .then(response => response.json())
        .then(data => {
            res.send(data);
        });
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});