import plekanmodule1 from './plekanmodule1.vue'
import plekanmodule2 from './plekanmodule2.vue'
import plekanmodule3 from './plekanmodule3.vue'
import plekanmodule4 from './plekanmodule4.vue'
import plekanmodule5 from './plekanmodule5.vue'
import plekanmodule6 from './plekanmodule6.vue'
import plekanmodule8 from './plekanmodule8.vue'


;(function () {

  var modules = 	[
      {
        name:"plekanmodule1",
        group:"text",
        thumbnail:"plekanmodule1.png",
        context:plekanmodule1,
      },
      {
        name:"plekanmodule2",
        group:"text",
        thumbnail:"plekanmodule2.png",
        context:plekanmodule2,
      },
      {
        name:"plekanmodule3",
        group:"text",
        thumbnail:"plekanmodule3.png",
        context:plekanmodule3,
      },
      {
        name:"plekanmodule4",
        group:"text",
        thumbnail:"plekanmodule4.png",
        context:plekanmodule4,
      },
      {
        name:"plekanmodule5",
        group:"text",
        thumbnail:"plekanmodule5.png",
        context:plekanmodule5,
      },
      {
        name:"plekanmodule6",
        group:"text",
        thumbnail:"plekanmodule6.png",
        context:plekanmodule6,
      },
      {
        name:"plekanmodule7",
        group:"text",
        thumbnail:"plekanmodule7.png",
        context:plekanmodule7,
      },
      {
        name:"plekanmodule8",
        group:"text",
        thumbnail:"plekanmodule8.png",
        context:plekanmodule8,
      },
  ]

  /*----------------------------------------------------*/
  if (typeof exports == "object") {
    module.exports = modules
  } else if (typeof define == "function" && define.amd) {
    define([], function(){ return modules })
  } else if (window) {
    window.modules = modules
  }

})()

