import plekancomponent from 'components/plekan'
import store from 'store'
import modules from 'core/modules'
import moduleList from 'core/modules/list.json'
import mediumEditor from 'core/medium_editor.js'
import 'src/helper'

;(function () {

  var plekan = {};

  var plekanOptions = {
    languages       : [],
    defaultLanguage : "",
    rows : [],
    save : null,
  }

  plekan.install = function (Vue, options) {
    // Vue.transition('bounce', { enterClass: 'bounceIn', leaveClass: 'bounceOut'});

    Vue.component('plekan',plekancomponent) 
    /*
    *@TODO : extends options to plekanOptions
    */
    options = Object.assign({},plekanOptions,options)
    /*
    * Register component initilaze
    *@TODO : Validate template for existing ????? 
    */
    store.init('languages',options.languages);
  
    /*
    * İnit rows
    */
    if (options.rows) {
      store.init("rows", options.rows);
    }

    /*
    * Set contents language
    */
    moduleList.map(m => {
      Vue.component(m.name , modules[m.name])
      m.contents = m.contents || {};
      store.state.languages.map(l => {
        m.contents[l] = {}
        m.contents[l]["html"] = ""
        m.contents[l]["fields"] = {}
      })

    });

    store.init('moduleList',moduleList);
    store.init('currentLanguge',options.defaultLanguage);
    store.init('translateLanguage',options.languages[1]);


    Vue.prototype.$plekanSave = options.save

  }

  /*----------------------------------------------------*/
  if (typeof exports == "object") {
    module.exports = plekan
  } else if (typeof define == "function" && define.amd) {
    define([], function(){ return plekan })
  } else if (window.Vue) {
    Vue.use(plekan)
  }

})()