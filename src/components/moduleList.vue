<template>
  <div class="plekan-container">
    <b>Choose and compile - enjoy!</b>
    <div class="plekan-row">
      <div 
        v-for="l in list"
        class="plekan-xs-12 plekan-sm-6 plekan-md-4 plekan-lg-2">
          <div class="module-card">
            <div class="preview-image" :style="{ backgroundImage: 'url(' + $plekanutils.makeUrl(l.thumbnail,$thumbnailPath) + ')' }">
            </div>
            <div class="desc">
              <a href="" @click.prevent="showModule(l)">Show</a>
              <div class="check-option" :class="{active:l.chekced}">
                <i class="fa fa-check"></i>
                <input type="checkbox" v-model="l.chekced">
              </div>
            </div>
          </div>
        </div>
    </div>
    <hr>
    <button class="compile" 
            @click="compile"
            :class="{loading:loading}"
            :disabled="readyCompile.length == 0 || loading">{{loading ? "We are working .." : "Download Choosen"}}</button>
    <transition
      name="plekan-row"
      enter-active-class="animated fadeInLeft transition-list"
      leave-active-class="animated  fadeOutRight transition-list">
        <img v-show="moduleShowImage" :src="moduleImage" alt="" class="module-image">
    </transition> 
  </div>
</template>

<script>
  import store from 'store'
  import moduleList from 'plekan/core/modules/list.json'
  import moduleModal from 'components/moduleModal'

  export default {
    props:[],
    data () {
      return {
        list: [],
        moduleShowImage: false,
        moduleImage:null,
        loading:false
      }
    },
    components: {
      moduleModal
    },
    computed:{
      readyCompile : function () {
        return this.list.filter(l => l.chekced === true)
      }
    },
    created(){
      var tmp = JSON.parse(JSON.stringify(moduleList))
      Object.keys(tmp).map(e => {
        tmp[e].chekced = false
      })

      this.list = tmp
    },
    methods:{
      showModule(l){
        this.moduleShowImage = false
        var to = this.moduleImage ? 400 : 0
        setTimeout(() =>  {
          this.moduleImage = this.$plekanutils.makeUrl(l.thumbnail,this.$thumbnailPath)
          this.moduleShowImage = true
        },to)
      },
      compile(){
        this.sendCompile(this.readyCompile)
        this.loading = true
      },
      sendCompile(data){
       this.$http.post('http://localhost:5000/',data).then(e => {

          var blob=new Blob([e.data]);
          var link=document.createElement('a');
          link.href=window.URL.createObjectURL(blob);
          link.download="plekan.zip";
          link.click();
          this.loading = false
          }).catch(err => {
            console.warn(err)
            this.loading = false
          })
      }
    }
  }
</script>

<style>
  
</style>
