
// Webpack plugin
function WebpackZipGenerate(gcb) {
}

WebpackZipGenerate.prototype.apply = function (compiler) {
	compiler.plugin('emit', (compilation, cb, res) => {
		cb(compilation)
	});
}


module.exports = WebpackZipGenerate;