// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import {plekan} from 'plekan';
import mockup from 'plekan/core/mockup';
import modules from 'plekan/core/modules';
import 'assets/index.scss';
import VueResource from 'vue-resource'

Vue.use(VueResource);


/* eslint-disable no-new */
Vue.use(plekan,{
  defaultLanguage : "tr",
  languages : ["tr"],
  modules:modules,
  thumbnailPath : "/static/thumbnails/",
  plekan_buttons : { // Special buttons 
    save : {
      text : "Show Result",
      class:"plekan-footer-button save",
      callback : function (rows) {
        console.log(rows)
      }
    },    
    cancel : {
      text : "Cancel",
      class:"plekan-footer-button cancel",
      callback : function (rows) {
        console.log(rows)
      }
    }
  }
})

new Vue({
  el: '#app',
  mounted(){
	
  },
  render: h => h(App)
})
