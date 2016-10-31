import plekancomponent from 'components/plekan'
import store from 'store'
import plekanEditor from 'core/plekan_editor.js'
import 'src/helper'
import moduleList from 'core/modules/list.json'
import 'src/assets/style/app.scss'
import plekanComponentMixin from 'core/mixin.js'



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
    onFileUpload:null,
    allowedFileTypes:"",
    plekan_buttons:{},

    plekanEvent: {
      onAdd : () => {},
      onDelete : () => {},
      onSort : () => {},
      onDuplicate : () => {},
      onUpdate : () => {},
      onInit : () => {},
    }
  }
  plekan.install = function (Vue, optionsOut) {
    /** plekan komponnetinin kayıt edilmesi */
    
    var options = Object.assign({},plekanOptions,optionsOut)
        options.plekanEvent = Object.assign({},plekanOptions.plekanEvent,optionsOut.plekanEvent)

    Vue.component('plekan',plekancomponent)

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
    if (typeof options.customComponents == "Array") {
      options.customComponents.map(c => {
        mlist.push(c.info)
        options.modules[c.info.name] = c.component  
      }) 
    }
    /*
    * Set contents language
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
    Vue.prototype.$customEditorButtons = options.customEditorButtons
    Vue.prototype.$thumbnailPath = options.thumbnailPath || "/"
    Vue.prototype.$onFileUpload = options.onFileUpload
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