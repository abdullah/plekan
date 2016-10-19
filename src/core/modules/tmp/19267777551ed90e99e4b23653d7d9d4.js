
		;(function () {
			var modules = 	{
				twocloumn:require('../twocloumn.vue'),imagetext:require('../imagetext.vue'),
			}

		  if (typeof exports == "object") {
		    module.exports = modules
		  } else if (typeof define == "function" && define.amd) {
		    define([], function(){ return modules })
		  } else if (window) {
		    window.modules = modules
		  }

		})()

		