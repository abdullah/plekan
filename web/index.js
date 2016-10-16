
const express = require('express');
const app = express();

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 5000;
var webpack = require('webpack');
var fs = require('fs');
var release = require('../build/webpack.release.js');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


var archiver = require('archiver');



// app.use('/', express.static(__dirname + '/../dist'));

var archive = archiver.create('zip', {store:true}); 


function closeEmit(cc) {
	this.cc = cc
}

closeEmit.prototype.apply = function (compiler) {
	compiler.plugin('emit', (compilation, cb, res) => {
		this.cc(compilation.assets)
	});
}




app.get('/',function (req,res) {

	res.writeHead(200, {
        'Content-Type': 'application/zip',
        'Content-disposition': 'attachment; filename=myFile.zip'
    });

    // var zip = Archiver('zip');
	


    // Send the file to the page output.
    archive.pipe(res);

    // Create archive with some files. Two dynamic, one static. Put #2 in a sub folder.
    

	release.plugins.push(new closeEmit(function (e) {
		Object.keys(e).map(function (f) {
			archive.append( e[f].toString(), { name: f })
		})

		archive.finalize()

	}))

	webpack(release,function (err,stats) {
		// console.log(stats)
	})


})


app.listen(PORT, function () {
  console.log(`Web service is listening on ${HOST}:${PORT}!`);
});