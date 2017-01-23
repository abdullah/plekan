// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import {plekan} from 'src/index.js';
// import mockup from 'src/core/mockup';
import modules from 'src/core/modules';
import VueResource from 'vue-resource'

Vue.use(VueResource);

/* eslint-disable no-new */
Vue.use(plekan,{
  defaultLanguage : "en",
  languages : ["en","tr"],
  modules:modules,
  thumbnailPath : "/static/thumbnails/",
  plekan_buttons : { // Special buttons 
    save : {
      text : "Show Result",
      class:"plekan-footer-button cancel",
      callback : function (rows) {
        console.table(JSON.parse(JSON.stringify(rows[0].contents)))
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
