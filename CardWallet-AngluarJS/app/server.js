const express = require('express');
const app = express();
const cards = require('./mocks/cards');
const node_modules = ('./node_modules');

app.use(express.static('src'));
app.get('/', (req, res) => {
    res.sendFile('src/index.html');
});

app.get('/api', (req, res) => {
    res.json(cards);
})

app.get('/api/cards', (req, res) => {
    res.json(cards);
})

app.listen(5150, () => {
    console.log('listening on port 5150');
});
