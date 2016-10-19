import imagetext from './imagetext.vue'
import twocloumn from './twocloumn.vue'

;(function () {
	var modules = 	{
		imagetext,
		twocloumn
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