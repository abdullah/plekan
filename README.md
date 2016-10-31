# Plekan

> Plekan modern çok dil destekli, özelleştirilebilir **Vue.js** tabanlı bir içerik üreticidir.

NOTE: Plekan **Vue.js  2.x**  üzerini destekler.

#Kurulum

```
npm i plekan --save
```

Plekan içerisinde ~~100~~'den fazla modül ile birlikte gelir. İsterseniz bu modülleri özelleştirebilir ve sadeleştirebilirsiniz 

#Çekirdek yapıyı anlama 

Plekan kurulumdan sonra elinizde 3 farklı nesne olacaktır;
  
 1. plekan 
 2. plekanComponentMixin
 3. plekanModules

**plekan** : Editörün çalışması için gereken çekirdek kodu içeren nesnedir.
**plekanModules** : Plekan ile birlikte gelen modül listesinin olduğu nesnedir. İsterseniz liste içindeki modülleri filtereleyip gösterebilirsiniz. 
>NOT: **plekanModules** içindeki listeyi filterelemeniz dosya boyutunu değiştirmez.

**plekanComponentMixin** : Bazı durumlarda plekanModules ile gelen modüllerin dışında kendi modüllerinizi yazmak isteyebilirsiniz . Bu durumda bu nesne size yardımcı olacaktır. 


###Row objesi 

```
[
 {
   "name": "slider",
   "group": "text",
   "thumbnail": "thumbnail.png",
   "contents": {
     "tr": {
       "html": <String>,
       "fields": <Object>
     },
     "en": {
       "html": <String>,
       "fields": <Object>
     },
     ...
   "index": "2d89be50-914d-11e6-998c-5f394fa01a63"
 },
 ...
]
```

Plekan'nın üreteceği her bir row ( bunlar ekrandaki her bir satıra/modüle denk gelir ) yukarda görüldüğü gibi bir obje olacaktır. Nesne içeriği : 

**name** : Row'un ait olduğu modül ismi
**group** : Row'un ait olduğu modülün grubu
**contents** : Row'un içerdiği html ve row'a özel alanlar
> NOT : Content's içerisindeki bütün alanlar (contents özelliğide dahil) dinamik olarak oluşturulur . Her dil özelliğinin içinde html ve fields adında  iki alt özellik daha bulunur.

**html** : Row'un tamamının dirty html'ini içerir   (Dile özel)
**fields**: Row'a ait resim,yazı,liste vb alanları içerir. Bu özellik plekan tarafından dinamik olarak desteklensede dinamik olarak oluşturulmaz oluşturmak için özel modül yazma kısmına bakınız. 

>Plekan kurulumundan sonra gelen **plekanModules** objesindeki row'ların fields özellikleri dolu olabilir veya olmayabilir  ^^

>Fields objesini mobil cihazlar için kullanabilirsiniz bunun sebebi mobil cihazlar birçok  html etiketlerini render edemez mesela  `img` etiketi (Android için). Bir blog postumuz olduğunu düşünürsek bu row'ları mobilde sağlıklı bir şekilde göstermek için image kaynağının çıplak olması gerekmektedir bu tür bir durumda **fields** objesi yardımcı olacaktır. Bu kısım opsiyoneldir ve sizin bunu handle etmeniz gerekmektedir  ama işe yarar bişey :)

**index** : Dinamik olarak oluşturulan benzersiz row kimliğidir buraya dokunmayın veya değiştirmeyin .

 
#Kullanma

####Geleneksel yöntem
```
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
```


En basit şekilde plekan'ı yukarda gördüğünüz şekilde aktif hale getirebilirsiniz. Vue örneğine eklentiyi kullanması için kayıt işlemi yapıldıktan sonra `<plekan></plekan>` komponentine global olarak ulaşmak mümkündür bu kısımdan sonra istediğiniz kısıma komponent'i yerleştirebilirsiniz.

Script tag'i ile eklediğinizde plekan objesi window nesnesine eşitlenir 

####Babel/Webpack/Browserifiy
```
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
```

##Olay yakalama

Olay listesi : 
```
plekanEvent: {
    onAdd : () => {},
    onDelete : () => {},
    onSort : () => {},
    onDuplicate : () => {},
    onUpdate : () => {},
    onInit : () => {},
    onFileUpload(){}
  }

```
Olayları iki farklı şekilde yakalayabilirsiniz.

Yöntem bir :
  Global nesne üzerinden 
```
this.$onAdd = //function
```
Yöntem iki :
  >Giriş nesnesi üzerinden 

```  
Vue.use(plekan.editor,{
  ...
  onAdd : // function     
})
```
 

###Seçenekler 

Seçenek nesnesi plekan'nın görünümü ve özelleştirilmesi için birçok parametre alır 

```
Vue.use(plekan,{
  defaultLanguage : "tr", // Giriş dili
  languages : ["tr","en"], // Tamamlanabilir diller
  modules:modules, // Module listsi
  customComponents:[] // Plekan'ın için hazırlanmış modüller bkz: Özel modüller
  rows : [] // önceden plekan tarafından üretilmiş row'lar
  exceptButtons : {}, // not Yet
  plekanEvent: {
    onAdd : () => {},
    onDelete : () => {},
    onSort : () => {},
    onDuplicate : () => {},
    onUpdate : () => {},
    onInit : () => {},
    onFileUpload :  function (file,cb) {
      // Bu kısımda dosya yükleme işlemi gerçekletirin..
      // cb olarak bir foskyiona obje geçin sonraki kısmı biz halledeceğiz
      cb({
        src: "title",
        alt : "text",
        title : "link"
      })
    },
  },
  allowedFileTypes : "png|jpg|jpeg", // yüklenebilir dosyalar
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
```

**customComponents**,  **modules**, **defaultLanguage**, **languages**, **rows** seçenekleri dışında diğer opsiyonlara global nesneden ulaşabilir, işleyişi değiştirebilirsiniz 

```
this.$plekan_buttons.cancel.callback =  (e) => {
       // Şunu yap
}
```   
---

#### Rows objesini ayarlama

Rows özelliği daha önceden plekan aracılığıyla oluşturulmuş row dizisidir. Tekrar düzenlemek için bu diziyi iki farklı şekilde plekan'a tanıtabilirsiniz :  [Dynamic Props](https://vuejs.org/guide/components.html#Dynamic-Props)

>NOT : Yöntem iki bir defalığına giriş aşamasında bu objeyi alır tekrar tekrar rows objesi geçmek istiyorsanız yöntem biri kullanın.

#####Yöntem 1
```
<plekan :rows="rows"></plekan>
```
#####Yöntem 2
```
Vue.use(plekan,{
 ....
 rows: rows
 ....
 })
```
#### Özel modül yazma
##### Vue componenti olarak

```
<template>
    <div class="plekan" v-html="content"></div>
   </template>
   
   <script>
     import {mixinComponent} from 'plekan'
     
     var DEFAULT_CONTENT = `
     <div class="plekan-clearfix">
       <h2 contenteditable="true" class="twocloumn-title">Title</h2>
         <div contenteditable="true" class="twocloumn-text">
           <p>Lorem ipsum dolor sit amet</p>
         </div>
         <div class="plekan-row">
           <div class="plekan-xs-6">
             <img src="http://scitechdaily.com/images/Universe-Collide_01.jpg" />
           </div>
           <div class="plekan-xs-6" contenteditable="true">
             <p>
               Lorem ipsum dolor sit amet, consectetur adipisicing elit, s
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
         this.me.contents[this.displayLanguage]
           .fields["src"] = this.$el.querySelector('img').src
       }
     }
   </script>
```

Özel bir komponent yazmak için **plekan** ile birlikte gelen **plekanComponentMixin** mixin'inin kullanmanız gerekecektir, bu mixin modülün güncellenmesi hangi dilin aktif olduğunu ve daha önceden bu modül ile yazılmış row'u parse etmesi için gereken mantıksal kısmı içerir. Dikkat edilmesi gereken kısımlar;
  
**v-html="content"** :  olarak belirtilen kısımdaki content objesi mixin tarafından oluşturulur,
**DEFAULT_CONTENT** : bu değişken modülün varsayılan olarak gösterilecek içeriğidir
**contenteditable="true"**  :  üzerinde değişiklik yapılacak kısımlar bu şekilde ayarlanmalıdır.  Geri kalan kısmı biz hallediceğiz.
> NOT:  `contenteditable` kısmı her zaman **true** olarak kalmalıdır  seçenek nesnesinde özel bir save butonu ile plekan tarafından hazırlanmış row'lara ulaşabilir daha sonra bu row'ları  şu şekilde kayıt edebilirsiniz : 



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

####Yapılacaklar

 1. Editör butonları çoğaltılcak **✓**
 2. Editör butonları özelleştirilebilecek **✓**
 3. Dosya Yükleme **✓**
 4. Modül gruplama
 5. Kısayol Tuşları **✓**
 6. Kod vurgulama
 7. Font değiştirme
 8. İkon ekleme
 

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


