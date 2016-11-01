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
  defaultLanguage : "en",
  languages : ["en","tr"],
  modules:modules,
  // rows : mockup
  // @TODO : Filter for editor buttons,
  // exceptButtons : {},
  // allowedFileTypes : "png|jpg|jpeg",
  // customComponents:[]
  thumbnailPath : "/static/thumbnails/",
  // customEditorButtons:[
  //   {
  //     type : 'stable',
  //     class : 'fa fa-cog',
  //     value : '',
  //     callback (...options) {
  //       alert("Clicked custom buttons")
  //       console.info("Custom button ",options)
  //       // Modal 
        
  //     }
  //   }
  // ],
  // plekan_buttons : {
  // 	save : {
  // 		text : "Save",
  // 		class:"plekan-footer-button save",
  // 		callback : function (e) {
  // 			console.log(e)
  // 		}
  // 	}
  // }
  plekanEvent:{
    // onAdd(row){
    //   console.log(obj);
    // },
    // onFileUpload(file,cb){
    //   cb({
    //     src: "filesrc",
    //     alt : "text",
    //     title : "link"
    //   }) 
    // }
  }
})

new Vue({
  el: '#app',
  mounted(){
	
  },
  render: h => h(App)
})
