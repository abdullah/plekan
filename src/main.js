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
  thumbnailPath : "/static/thumbnails/",
})

new Vue({
  el: '#app',
  mounted(){
	
  },
  render: h => h(App)
})
