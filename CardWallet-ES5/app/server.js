const express = require('express');
const app = express();
const cards = require('./mocks/cards')

app.use('/', express.static(__dirname + '/dist'));

app.get('/', (req, res) => {
    res.sendFile('dist/index.html');
});

app.get('/api', (req, res) => {
    res.json(cards);
})

app.listen(3000, () => {
    console.log('listening on port 3000');
});
