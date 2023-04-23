const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');
const { fetchByWeek } = require('./upload');

const app = express();
app.use(cors())
app.use(bodyParser.json());

app.post('/', async (req, res) => {
  date = req.body.date;
  console.log(date)
  urls = await fetchByWeek(date);
  console.log("urls:", urls)
  if (urls == undefined) {
    res.send([])
  }
  res.send(urls);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});