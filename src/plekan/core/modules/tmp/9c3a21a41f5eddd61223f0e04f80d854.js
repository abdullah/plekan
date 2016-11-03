
		;(function () {
			var modules = 	{
				plekanmodule1:require('../plekanmodule1.vue'),plekanmodule2:require('../plekanmodule2.vue'),plekanmodule3:require('../plekanmodule3.vue'),plekanmodule4:require('../plekanmodule4.vue'),
			}

		  if (typeof exports == "object") {
		    module.exports = modules
		  } else if (typeof define == "function" && define.amd) {
		    define([], function(){ return modules })
		  } else if (window) {
		    window.modules = modules
		  }

		})()

		