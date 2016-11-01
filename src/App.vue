<template>
  <div id="app">
    <header>
      <div class="plekan-container">
        <div class="logo">
          <img src="~assets/logo.png" alt="">
        </div>
        <ul>
            <!-- <li><a href="">Github</a></li> -->
            <li><a href="" @click.prevent="show = true">Try Plekan</a></li>
            <!-- <li><a href="">Customize</a></li> -->
        </ul>
      </div>
    </header>
    <div class="plekan-container">
      <div class="intro">
        <h1>WTF is doing this ?</h1>
        <h3>Plekan is a minimalist content builder </h3>
        <p>Feautres</p>
        <ul>
            <li>Multilanguage System *</li>
            <li>Support fieldset</li>
            <li>Support Custom Component</li>
        </ul>
      </div> 
    </div>
    <div class="plekan-container">
      <h2>Start Now </h2>
      <p>You can costumize modules or <a href="">write a custom module</a></p>
      <b>If you want to say I make it costumize you can select modules and clik build it </b>
      <hr>
      <ul class="modules-list">
          <li 
            v-for="l in listOfModules" 
            :style="{ backgroundImage: 'url(' + $plekanutils.makeUrl(l.thumbnail,$thumbnailPath) + ')' }">
            <input type="checkbox" v-model="l.chekced" >
            <div class="isChecked" :class="{active:l.chekced}">
              <i class="fa fa-check"></i>
            </div>
          </li>
      </ul>
    </div>
    <div class="plekan-container">
      <hr>
      <button class="compileButton" 
        @click="compile">@compile
      </button>
    </div>

    <transition 
    enter-active-class="animated fadeInUp custom-classes-transition"
    leave-active-class="animated fadeOutDown custom-classes-transition">
      <plekan v-show="show" :rows="rows"></plekan>
    </transition>
  </div>
</template>

<script>
	import listOfModules from 'core/modules/list.json'
	import Vue from 'vue'
  export default {
    data () {
      return {
        show:true,
        listOfModules:listOfModules,
        rows:[],
        // rows:[
        //     {
        //       "name": "imagetextreverse",
        //       "group": "text",
        //       "thumbnail": "8.png",
        //       "contents": {
        //         "tr": {
        //           "html": "\n <section class=\"plekan-image-text-reverse\">\n      <div class=\"plekan-xs-12 plekan-sm-12 plekan-md-6 plekan-lg-6\">\n        <p>\n          Elephants are large mammals of the family Elephantidae and the order Proboscidea. Two species are traditionally recognised, the African elephant (Loxodonta africana) and the Asian elephant (Elephas maximus), although some evidence suggests that African bush elephants and African forest elephants are separate species (L. africana and L. cyclotis respectively). Elephants are scattered throughout sub-Saharan Africa, South Asia, and Southeast Asia. Elephantidae is the only surviving family of the order Proboscidea;          </p>\n      </div>\n      <div class=\"plekan-xs-12 plekan-sm-12 plekan-md-6 plekan-lg-6\">\n        <img src=\"static/component/1.png\" alt=\"\">\n      </div>\n    </section>\n",
        //           "fields": {}
        //         },
        //         "en": {
        //           "html": "\n <section class=\"plekan-image-text-reverse\">\n      <div class=\"plekan-xs-12 plekan-sm-12 plekan-md-6 plekan-lg-6\">\n        <p>\n          Elephants are large mammals of the family Elephantidae and the order Proboscidea. Two species are traditionally recognised, the African elephant (Loxodonta africana) and the Asian elephant (Elephas maximus), although some evidence suggests that African bush elephants and African forest elephants are separate species (L. africana and L. cyclotis respectively). Elephants are scattered throughout sub-Saharan Africa, South Asia, and Southeast Asia. Elephantidae is the only surviving family of the order Proboscidea;          </p>\n      </div>\n      <div class=\"plekan-xs-12 plekan-sm-12 plekan-md-6 plekan-lg-6\">\n        <img src=\"static/component/1.png\" alt=\"\">\n      </div>\n    </section>\n",
        //           "fields": {}
        //         }
        //       },
        //       "index": "8b8ce6d0-99e0-11e6-81f0-d1e0d5e3e308"
        //     }]
      }
    },
    created(){

      var tmp = JSON.parse(JSON.stringify(listOfModules))
      Object.keys(tmp).map(e => {
        tmp[e].chekced = false
      })

      this.listOfModules = tmp
    },
    mounted() {
      
      // this.$plekan_buttons.save.callback = (e) =>  {

      //   var tmprows = JSON.parse(JSON.stringify(e));
      //   tmprows.map(r => {
      //     Object.keys(r.contents).map(c => {
      //       r.contents[c].html.replace(/contenteditable="true"/gm,"")
      //     })
      //   })

      //   this.rows = tmprows
      //   this.show = false
      // }

      // this.$plekan_buttons.cancel.callback =  (e) => {
      //   this.show = false
      // }

    },
    methods:{
      compile(){
        var list = this.listOfModules.filter(e => e.chekced == true)

        this.sendCompile(list)
      },
      sendCompile(data){
       this.$http.post('http://localhost:5000/',data).then(e => {

          var blob=new Blob([e.data]);
          var link=document.createElement('a');
          link.href=window.URL.createObjectURL(blob);
          link.download="plekan.zip";
          link.click();

          }).catch(err => {
            console.warn(err)
          })
      }
    }
  }
</script>