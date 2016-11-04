
		;(function () {
			var modules = 	{
				plekanmodule3:require('../plekanmodule3.vue'),plekanmodule4:require('../plekanmodule4.vue'),plekanmodule5:require('../plekanmodule5.vue'),
			}

		  if (typeof exports == "object") {
		    module.exports = modules
		  } else if (typeof define == "function" && define.amd) {
		    define([], function(){ return modules })
		  } else if (window) {
		    window.modules = modules
		  }

		})()

		