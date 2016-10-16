// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import plekan from './plekan.js';
import mockup from 'core/mockup'
import modules from 'core/modules'


/* eslint-disable no-new */
Vue.use(plekan,{
  defaultLanguage : "tr",
  languages : ["tr","en"],
  modules:modules,
  save : function (row) {
    console.log(this)
    this.pre = row
		this.show = false
  }.bind(this)
})

new Vue({
  el: '#app',
  mounted(){
	
  },
  render: h => h(App)
})
