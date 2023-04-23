const express = require('express');
const router = express.Router();
var cors = require('cors')
const bodyParser = require('body-parser');
const { fetchByWeek } = require('./upload');

const app = express();
app.use(cors())
app.use(bodyParser.json());

router.post('/', async (req, res) => {
  date = req.body.date;
  console.log(date)
  urls = await fetchByWeek(date);
  console.log("urls:", urls)
  if (urls == undefined) {
    res.send([])
  }
  res.send(urls);
});

router.get('/', async (req, res) => {
  res.send({ hello: "Hello" });
});

app.use('/.netlify/functions/api', router);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});