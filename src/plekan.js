import plekancomponent from 'components/plekan'
import store from 'store'
import plekanEditor from 'core/plekan_editor.js'
import 'src/helper'
import moduleList from 'core/modules/list.json'
import 'src/assets/style/app.scss'
import plekanComponentMixin from 'core/mixin.js'

;(function () {

  var plekan = {};

  var plekanOptions = {
    languages       : [],
    defaultLanguage : "",
    rows : [],
    modules:null,
    customComponents:null
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
    var mlist = JSON.parse(JSON.stringify(moduleList));
    if (typeof options.customComponents == "Array") {
      options.customComponents.map(c => {
        mlist.push(c.info)
        options.modules[c.info.name] = c.component  
      }) 
    }

    
    var tmpDelete = [];
    mlist.map((m,i) => {
      if (options.modules[m.name]) {
        Vue.component(m.name , options.modules[m.name])
        m.contents = m.contents || {};
        store.state.languages.map(l => {
          m.contents[l] = {}
          m.contents[l]["html"] = ""
          m.contents[l]["fields"] = {}
        })
      }else{
        tmpDelete.push(i)
      }
    });
    /*
    * Remove extra list item
    */
    mlist.map((e,i) => { 
      if (tmpDelete.indexOf(i) != -1) {
        mlist.splice(i, 1);
      }
    });

    store.init('moduleList',mlist);
    store.init('currentLanguge',options.defaultLanguage);
    store.init('translateLanguage',options.languages[1]);

    Vue.prototype.$plekan_buttons = options.plekan_buttons
    Vue.prototype.$thumbnailPath = options.thumbnailPath

    /*
    * Source : 
    * http://stackoverflow.com/questions/1303872/trying-to-validate-url-using-javascript
    */
    Vue.prototype.$plekanutils = {
      makeUrl(url,prefix){
        var RegExp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        if(RegExp.test(url)){
            return url;
        }else{
            return prefix + url;
        }
      },
    } 

  }

  /*----------------------------------------------------*/
  if (typeof exports == "object") {
    module.exports = {plekan,plekanComponentMixin}
  } else if (typeof define == "function" && define.amd) {
    define([], function(){ return {plekan,plekanComponentMixin} })
  } else if (window.Vue) {
    Vue.use(plekan)
  }

})()