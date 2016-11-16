import plekanmodule1 from './plekanmodule1.vue'
import plekanmodule2 from './plekanmodule2.vue'
import plekanmodule3 from './plekanmodule3.vue'
import plekanmodule4 from './plekanmodule4.vue'
import plekanmodule5 from './plekanmodule5.vue'
import plekanmodule6 from './plekanmodule6.vue'
import plekanmodule8 from './plekanmodule8.vue'

;(function () {
	var modules = 	{
    plekanmodule1,
    plekanmodule2,
    plekanmodule3,
    plekanmodule4,
    plekanmodule5,
    plekanmodule6,
    plekanmodule8,
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