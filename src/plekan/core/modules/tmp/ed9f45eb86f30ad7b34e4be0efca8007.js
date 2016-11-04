
		;(function () {
			var modules = 	{
				plekanmodule1:require('../plekanmodule1.vue'),plekanmodule2:require('../plekanmodule2.vue'),
			}

		  if (typeof exports == "object") {
		    module.exports = modules
		  } else if (typeof define == "function" && define.amd) {
		    define([], function(){ return modules })
		  } else if (window) {
		    window.modules = modules
		  }

		})()

		