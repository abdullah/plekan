import plekancomponent from 'components/plekan'
import store from 'store'
import plekanEditor from 'src/core/plekan_editor.js'
import 'src/helper'
import 'src/assets/style/app.scss'
import plekanComponentMixin from 'src/core/mixin.js'



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
      /** Bu kısım  comment out olmalı ki onFileUpload özelliğine göre yükleme yapıyor*/
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
    

    var _modules = Object.assign([],options.modules);

    /*
    * Set contents language
    */
    var oList = _modules.map(m => {
        //Register Component
        m.contents = m.contents || {};
        
        store.state.languages.map(l => {
          m.contents[l] = {}
          m.contents[l]["html"] = ""
          m.contents[l]["fields"] = {}
        })

        Vue.component(m.name , Object.assign({},m.context))

        delete m.context;
        return m

    });
    

    store.init('moduleList',oList);
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