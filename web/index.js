
const express = require('express');
const app = express();

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 5000;
var webpack = require('webpack');
var release = require('../build/webpack.release.js');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// app.use('/', express.static(__dirname + '/../dist'));

app.get('/',function (req,res) {
	res.end("xx")
	
	webpack(release, function (err, stats) {
	  if (err) throw err
	  process.stdout.write(stats.toString({
	    colors: true,
	    modules: false,
	    children: false,
	    chunks: false,
	    chunkModules: false
	  }) + '\n')
	})

})


app.listen(PORT, function () {
  console.log(`Web service is listening on ${HOST}:${PORT}!`);
});