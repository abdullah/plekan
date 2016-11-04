
		;(function () {
			var modules = 	{
				plekanmodule4:require('../plekanmodule4.vue'),plekanmodule5:require('../plekanmodule5.vue'),plekanmodule6:require('../plekanmodule6.vue'),
			}

		  if (typeof exports == "object") {
		    module.exports = modules
		  } else if (typeof define == "function" && define.amd) {
		    define([], function(){ return modules })
		  } else if (window) {
		    window.modules = modules
		  }

		})()

		