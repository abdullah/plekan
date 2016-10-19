
var md5 = require('md5');
var fs = require('fs');


function modulesGenerate(list) {
	var body = ""

	list.map(function (e) {
		body += e+":require('../"+e+".vue'),";
	});

	var writableString = `
		;(function () {
			var modules = 	{
				`+body+`
			}

		  if (typeof exports == "object") {
		    module.exports = modules
		  } else if (typeof define == "function" && define.amd) {
		    define([], function(){ return modules })
		  } else if (window) {
		    window.modules = modules
		  }

		})()

		`

	
	var filename = md5(writableString);
	var file = 'src/core/modules/tmp/'+filename+'.js';

	var exists = fs.existsSync(file);

	if (!exists) {
		var wstream = fs.createWriteStream(file);
		wstream.write(writableString);
	}

	return file
}

module.exports = modulesGenerate



