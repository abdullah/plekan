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

 - OnAdd - (It will be in the future) -> ( rows object of store )
 - OnDelete (It will be in the future)
 - OnDuplicate (It will be in the future)
 - OnChange (It will be in the future)
 - OnInit (It will be in the future)
 - OnFileUploaded (It will be in the future)
 - OnSourceChange (It will be in the future)

Olayları iki farklı şekilde yakalayabilirsiniz.

Yöntem bir :
	Global nesne üzerinden `this.$onAdd = //function` 

Yöntem iki :
	>Giriş nesnesi üzerinden 
   
    Vue.use(plekan.editor,{
	...
	onAdd : // function   	
	})

 

	




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

