import imagetext from './imagetext.vue'
import twocloumn from './twocloumn.vue'
import youtubeembed from './youtubeembed.vue'
import imageontext from './imageontext.vue'
import gap from './gap.vue'
import thereimagetext from './thereimagetext.vue'

;(function () {
	var modules = 	{
    imagetext,
    thereimagetext,
    imageontext,
    gap,
		youtubeembed,
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