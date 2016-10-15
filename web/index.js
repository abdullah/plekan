
const express = require('express');
const app = express();

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 5000;


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use('/', express.static(__dirname + '/../dist'));

app.listen(PORT, function () {
  console.log(`Web service is listening on ${HOST}:${PORT}!`);
});