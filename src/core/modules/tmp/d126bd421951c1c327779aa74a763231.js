
		;(function () {
			var modules = 	{
				plekanmodule3:require('../plekanmodule3.vue'),
			}

		  if (typeof exports == "object") {
		    module.exports = modules
		  } else if (typeof define == "function" && define.amd) {
		    define([], function(){ return modules })
		  } else if (window) {
		    window.modules = modules
		  }

		})()

		