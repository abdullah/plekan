import plekancomponent from 'plekan/components/plekan'
import store from 'plekan/store'
import plekanEditor from 'plekan/core/plekan_editor.js'
import 'plekan/helper'
import moduleList from 'plekan/core/modules/list.json'
import 'plekan/assets/style/app.scss'
import plekanComponentMixin from 'plekan/core/mixin.js'



;(function () {
  /** @type {Object} Eklentinin ta kendisi lol */
  var plekan = {};
  /**
   * @description Varsayılan seçenekler
   * @type {Object}
   */
  var plekanOptions = {
    languages       : [],
    defaultLanguage : "",
    /** @type {Array} Ekrandaki gösterilen her bil satır. Uygulama genelinde rows olarak belirtirlir */
    rows : [],
    /** @type {Object} Row olarak eklenebilen her component module olarak adlandırılır */
    modules:{},
    customComponents:[],
    /** @type {Array} Özel butonlar  */
    customEditorButtons:[],
    allowedFileTypes:"",
    plekan_buttons:{},
    plekanEvent: {
      onAdd : () => {},
      onDelete : () => {},
      onSort : () => {},
      onDuplicate : () => {},
      onUpdate : () => {},
      onInit : () => {},
      /** Bu kısım  comment out olmalı ki onFileUpload özelliğine göre butonlar gösteriliyor*/
      // onFileUpload : () => {},
    }
  }
  plekan.install = function (Vue, optionsOut) {
    /** plekan komponnetinin kayıt edilmesi */
    
    var options = Object.assign({},plekanOptions,optionsOut)
        options.plekanEvent = Object.assign({},plekanOptions.plekanEvent,optionsOut.plekanEvent)

    Vue.component('plekan',plekancomponent)

    if (!options.languages || !options.languages.length) throw new Error("languages is not set");
    if (!options.defaultLanguage) throw new Error("defaultLanguage is not set..");
    if (!options.modules) throw new Error("modules is not set..");
    
    /*
     * Register component initilaze
     * @TODO : Validate template for existing ????? 
    */
    store.init('languages',options.languages);
    /*
    * İnit rows
    */
    if (options.rows) {
      store.init("rows", options.rows);
    }
    /*
    * Init Custom components
    */
    var mlist = JSON.parse(JSON.stringify(moduleList));

    /**
     *
     * @param  {Array} options.customComponents
     * @return {Void}
     * 
     */
    if (options.customComponents) {
      options.customComponents.map(c => {
        mlist.push(c.info)
        options.modules[c.info.name] = c.component  
      }) 
    }
    /*
    * Set contents language and extra modules remove
    */
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
        mlist.splice(i);
      }
    });
  
    store.init('moduleList',mlist);
    store.init('currentLanguge',options.defaultLanguage);
    store.init('translateLanguage',options.languages[1]);

    Vue.prototype.$plekan_buttons = options.plekan_buttons
    Vue.prototype.$customEditorButtons = options.customEditorButtons
    Vue.prototype.$thumbnailPath = options.thumbnailPath || "/"
    Vue.prototype.$allowedFileTypes = options.allowedFileTypes
    Vue.prototype.$plekanEvent = options.plekanEvent

    /**
     * 
     * http://stackoverflow.com/questions/1303872/trying-to-validate-url-using-javascript
     * @type {Object}
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