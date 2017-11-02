const path = require('path');
const http = require('http');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use('/dist', express.static(__dirname + '/dist'))
app.use('/public', express.static(__dirname + '/public'))


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//base route route
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

//card collection CRUD
router.get('/api/cards/:userId', (req, res) => {
  const userId = req.params.userId || 1;
  res.json({
    'path': '/api/cards',
    userId,
  });
});

//attach router to application
app.use('/', router);
app.listen(3000, console.log('listening on port 3000'));

