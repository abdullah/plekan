import imagetext from './imagetext.vue'
import twocloumn from './twocloumn.vue'
import videoembed from './videoembed.vue'
import imageontext from './imageontext.vue'
import gap from './gap.vue'
import thereimagetext from './thereimagetext.vue'

;(function () {
	var modules = 	{
    imagetext,
    thereimagetext,
    imageontext,
    gap,
		videoembed,
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