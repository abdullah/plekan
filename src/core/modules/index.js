import imagetext from './imagetext.vue'
import twocolumn from './twocloumn.vue'

;(function () {
	var modules = 	{
		imagetext,
		twocolumn
	}

  /*----------------------------------------------------*/
  if (typeof exports == "object") {
    module.exports = modules
  } else if (typeof define == "function" && define.amd) {
    define([], function(){ return modules })
  } else if (window) {
    window.modules = modules
  }

})()