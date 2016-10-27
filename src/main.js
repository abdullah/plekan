// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import {plekan} from './plekan.js';
import mockup from 'core/mockup';
import modules from 'core/modules';
import 'assets/style/site/index.scss';
import VueResource from 'vue-resource'

Vue.use(VueResource);


/* eslint-disable no-new */
Vue.use(plekan,{
  defaultLanguage : "tr",
  languages : ["tr","en"],
  modules:modules,
  // rows : mockup
  // @TODO : Filter for editor buttons,
  exceptButtons : {},
  onFileUpload :  function (file,cb) {
    // Fİle upload
    console.log(file)
    cb({
      src: "title",
      alt : "text",
      title : "link"
    })
  },
  thumbnailPath : "/static/thumbnails/",
  // cs_editor_buttons:{
  //   test : {
  //     name : 'test',
  //     class : 'fa fa-cog',
  //     callback (options) {
  //       console.log(options.sel.toString())
  //       // Modal 
  //       options.selo.restoreSelection(options.sel)
  //       options.exec('foreColor','#ccc')
  //     }
  //   }
  // },
  plekan_buttons : {
  	save : {
  		text : "Save",
  		class:"plekan-footer-button save",
  		callback : function (e) {
  			console.log(e)
  		}
  	},
  	// cancel : {
  	// 	text : "Cancel",
  	// 	class:"plekan-footer-button save",
  	// 	callback : function (e) {
  	// 		console.log(e)
  	// 	}
  	// }
  }
})

new Vue({
  el: '#app',
  mounted(){
	
  },
  render: h => h(App)
})
