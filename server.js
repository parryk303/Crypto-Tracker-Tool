const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

const formatEnd = (date, format) => {
  const map = {
    mm: date.getMonth() + 1,
    dd: date.getDate(),
    yy: date.getFullYear().toString().slice(-2),
  }
  if (date.getMonth() <= 9) {
    map.mm = '0' + map.mm;
  }
  if (date.getDate() <= 9) {
    map.dd = '0' + map.dd;
  }
  return format.replace(/mm|dd|yy/gi, matched => map[matched])
}
const now = new Date();
const end = formatEnd(now, '20yy-mm-dd')

const formatStart = (date, format) => {
  const map = {
    mm: date.getMonth() + 1,
    dd: date.getDate(),
    yy: date.getFullYear().toString().slice(-2) -1,
  }
  if (date.getMonth() <= 9) {
    map.mm = '0' + map.mm;
  }
  if (date.getDate() <= 9) {
    map.dd = '0' + map.dd;
  }
  return format.replace(/mm|dd|yy/gi, matched => map[matched])
}

const start = formatStart(now, '20yy-mm-dd' )

console.log(start)

app.get("/btc", (req, res) => {
  axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`)
    .then(function (response) {
      console.log(response.data);
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      console.log(error);
      res.sendStatus(500);
    })
    .finally(function () {
      console.log("done");
    });
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
