import imagetext from './imagetext.vue'
import imagetextreverse from './imagetextreverse.vue'
import pvideo from './pvideo.vue'
import twocolumntext from './twocolumntext.vue'
import onlyimage from './onlyimage.vue'
import imageontext from './imageontext.vue'
import threeimage from './threeimage.vue'
import twoimage from './twoimage.vue'
import videoandtext from './videoandtext.vue'

;(function () {
	var modules = 	{
    imagetext ,
    imagetextreverse ,
    pvideo ,
    twocolumntext ,
    onlyimage ,
    imageontext ,
    threeimage ,
    twoimage ,
    videoandtext ,
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