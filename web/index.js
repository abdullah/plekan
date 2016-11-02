
var express = require('express');
var app 	= express();
var HOST 	= process.env.HOST || 'localhost';
var PORT 	= process.env.PORT || 5000;
var webpack = require('webpack');
var fs 		= require('fs');
var release = require('../build/webpack.release.js');
var bodyParser 			= require('body-parser')
var WebpackZipGenerate  = require('./WebpackZipGenerate.js')
var modulesGenerate 	= require('./modulesGenerate.js')
var archiver 			= require('archiver');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(require('connect-history-api-fallback')())
app.use(express.static('dist'));




app.post('/',function (req,res) {
	
	var listFromClient = req.body.map( e => e.name)
	console.log(listFromClient);
	if (!listFromClient.length) {
		
		res.writeHead(400, {
	        'Content-Type': 'application/json',
	    });

		res.end(JSON.stringify({status:false}))

		return
	}

	res.writeHead(200, {
        'Content-Type': 'application/zip',
        'Content-disposition': 'attachment; filename=plekan.zip'
    });
	
	var archive = archiver.create('zip', {store:true}); 
	    archive.pipe(res);
    /*
    * Generate module files for the webpack release config
    */
	var filename = modulesGenerate(listFromClient);

	release.entry["plekanmodules"] = filename
	release.plugins.push(new WebpackZipGenerate())

	webpack(release,function (stats,err) {
	
		var assets = stats.assets

		Object.keys(assets).map(function (file) {
			var asset = assets[file];
			var content = asset.source();

			if(!Buffer.isBuffer(content)){
				content = new Buffer(content, "utf-8");
			}

			archive.append( content, { name: file })
		})
		
		// archive.append( fs.createReadStream(__dirname+"/../docs/index.html"), { name: "index.html" })
		// archive.append( fs.createReadStream(__dirname+"/../node_modules/vue/dist/vue.min.js"), { name: "vue.js" })
		archive.directory( __dirname+"/../static","static")
		archive.finalize()
	})

})

app.listen(PORT, function () {
  console.log(`Web service is listening on ${HOST}:${PORT}!`);
});