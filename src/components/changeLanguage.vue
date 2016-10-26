<template>
     <div class="plekan-change-language plekan-clearfix">
      <div class="plekan-container">
        <div class="plekan-pull-left">
          <span>Preview Language</span>
          <select  v-model="store.state.currentLanguge">
            <option v-for="l in languages" :value="l">{{l}}</option>
          </select>
        </div>
        <div class="open-translate-arena">
          <button @click="store.changeTranslateMode()"><i class="fa fa-language"></i></button>
        </div>
        <div class="plekan-pull-right" v-show="translateMode">
          <span>Translate Language</span>
          <select  v-model="store.state.translateLanguage">
            <option v-for="l in languages" :value="l">{{l}}</option>
          </select>
        </div>
      </div> 
    </div> 
</template>

<script>
  import store from 'store'

  export default {
    props:[],
    data () {
      return {
        store:store
      }
    },
    computed:{
      languages : function () {
        return this.store.state.languages
      },
      translateMode:function () {
          return this.store.state.translateMode;
      },
    },
    methods:{
    }
  }
</script>

<style>
  
</style>
