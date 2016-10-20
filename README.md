# Plekan

> Plekan modern çok dil destekli, özelleştirilebilir **Vue.js** tabanlı bir içerik üreticidir.

NOTE: Plekan **Vue.js  2.x**  üzerini destekler

#Kurulum

    npm i plekan --save

Plekan içerisinde 100'den fazla modül ile birlikte gelir. İsterseniz bu modülleri özelleştirebilir ve sadeleştirebilirsiniz 

#Çekirdek yapıyı anlama 

Plekan kurulumdan sonra elinizde 3 farklı nesne olacaktır;
	
 1. plekan 
 2. plekanComponentMixin
 3. plekanModules

**plekan** : Editörün çalışması için gereken çekirdek kodu içerin nesnedir.
**plekanModules** : Plekan ile birlikte gelen modül listesinin olduğu nesnedir. İsterseniz liste içindeki modülleri filtereleyip gösterebilirsiniz. 
>NOT: **plekanModules** içindeki listeyi filterelemeniz dosya boyutunu değiştirmez.

**plekanComponentMixin** : Bazı durumlarda plekanModules ile gelen modüllerin dışında kendi modüllerinizi yazmak isteyebilirsiniz . Bu durumda bu nesne size yardımcı olacaktır. 

#Kullanma

####Geleneksel yöntem
	
	//Stil dosyaları için
	<link rel=stylesheet href="./static/plekan.css">
	.....
	<div id="app">
		<plekan></plekan>
	</div>
	.....
	//Js dosyaları için
	<script src="path/vue.js"></script>
    <script src="path/plekan.js"></script>
    <script src="path/plekanmodules.js"></script>
	
	Vue.use(plekan.editor,{
	  defaultLanguage : "tr",
	  languages : ["tr","en"],
	  modules:plekanmodules,
	})
	new Vue({
	  el: '#app'
	})

En basit şekilde plekan'ı yukarda gördüğünüz şekilde aktif hale getirebilirsiniz. Vue örneğine eklentiyi kullanması için kayıt işlemi yapıldıktan sonra `<plekan></plekan>` komponentine global olarak ulaşmak mümkündür bu kısımdan sonra istediğiniz kısıma komponent'i yerleştirebilirsiniz.

Script tag'i ile eklediğinizde plekan objesi window nesnesine eşitlenir 

####Babel/Webpack/Browserifiy

    import {editor} from './plekan.'
    import plekanmodules from './plekan/plekanmodules'
	
	Vue.use(plekan.editor,{
	  defaultLanguage : "tr",
	  languages : ["tr","en"],
	  modules:plekanmodules,
	})
	new Vue({
	  el: '#app'
	})


##Olay yakalama

Olay listesi : 

     OnAdd(addedObject: row,list) 
     OnDelete(deletedObject: row,list)
     OnDuplicate(copyObject: row , list)
     OnChange(changeRow: row , list) 
     OnSort(row,newIndex,OldIndex,list)
     OnInit(void)
     OnFileUploaded(file,row,list)
     OnSourceChange(row,list)

Olayları iki farklı şekilde yakalayabilirsiniz.

Yöntem bir :
	Global nesne üzerinden `this.$onAdd = //function` 

Yöntem iki :
	>Giriş nesnesi üzerinden 
   
    Vue.use(plekan.editor,{
	...
	onAdd : // function   	
	})

 

###Seçenekler 

Seçenek nesnesi plekan'nın görünümü ve özelleştirilmesi için birçok parametre alır 

    Vue.use(plekan,{
      defaultLanguage : "tr", // Giriş dili
      languages : ["tr","en"], // Tamamlanabilir diller
      modules:modules, // Module listsi
      customComponents:[] // Plekan'ın için hazırlanmış modüller bkz: Özel modüller
      rows : [] // önceden plekan tarafından üretilmiş row'lar
      OnAdd : function(){},
      OnDelete : function(){},
      OnDuplicate : function(){},
      OnChange : function(){},
      OnSort : function(){},
      OnInit : function(){},
      OnFileUploaded : function(){},
      OnSourceChange : function(){},
      plekan_buttons : { // Özel düğmeler
      	save : {
      		text : "Save",
      		class:"plekan-footer-button cancel",
      		callback : function (e) {
      			console.log(e)
      		}
      	},
      	cancel : {
      		text : "Cancel",
      		class:"plekan-footer-button save",
      		callback : function (e) {
      			console.log(e)
      		}
      	}
      }
    })


**customComponents**,  **modules**, **defaultLanguage**, **languages**, **rows** seçenekleri dışında diğer opsiyonlara global nesneden ulaşabilir, işleyişi değiştirebilirsiniz . Örnek ;

 

    this.$plekan_buttons.cancel.callback =  (e) => {
       // Şunu yap
    }

#### Özel modül yazma
##### Vue componenti olarak


    <template>
      <div class="twocloumn" v-html="content"></div>
    </template>
    
    <script>
      import {mixinComponent} from 'plekan'
      
      var DEFAULT_CONTENT = `
    	<div class="plekan-clearfix">
    		<h2 contenteditable="true" class="twocloumn-title">Title</h2>
          <div contenteditable="true" class="twocloumn-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
          <div class="plekan-row">
            <div class="plekan-xs-6">
              <img width="100%" src="http://scitechdaily.com/images/Universe-Collide_01.jpg" alt="">
            </div>
            <div class="plekan-xs-6" contenteditable="true">
              <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
    	</div>
      `
      export default {
      	mixins:[ mixinComponent ],
        data () {
          return {
            DEFAULT_CONTENT : DEFAULT_CONTENT
          }
        },
        updated(){
          this.me.contents[this.displayLanguage].fields["src"] = this.$el.querySelector('img').src
        }
      }
    </script>


Özel bir komponent yazmak için **plekan** ile birlikte gelen **plekanComponentMixin** mixin'inin kullanmanız gerekecektir, bu mixin modülün güncellenmesi hangi dilin aktif olduğunu ve daha önceden bu modül ile yazılmış row'u parse etmesi için gereken mantıksal kısmı içerir. Dikkat edilmesi gereken kısımlar;
	
**v-html="content"** :  olarak belirtilen kısım mixin tarafından oluşturulur,
**DEFAULT_CONTENT** : bu değişken modülün varsayılan olarak gösterilecek içeriğidir
**contenteditable="true"**  :  üzerinde değişiklik yapılacak kısımlar bu şekilde ayarlanmalıdır. 
> NOT: Bu kısım her zaman **true** olarak kalmalıdır  seçenek nesnesinde özel bir save butonu ile plekan tarafından hazırlanmış row'lara ulaşabilir daha sonra bu row'ları  şu şekilde kayıt edebilirsiniz : 



	this.$plekan_buttons.save.callback = (e) =>  {

    var tmprows = JSON.parse(JSON.stringify(e));
    tmprows.map(r => {
      Object.keys(r.contents).map(c => {
        r.contents[c].html.replace(/contenteditable="true"/gm,"")
      })
    })

    console.log(JSON.stringify(tmprows))
    }
   ----

#### Row objesini ayarlama


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for release 
npm run release
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


