<template>
  <div id="app">
    <!-- <div class="plekan-container">
      <input v-model="language" name="">
      <button @click="showEditor">Show editor</button>
      <hr>
      <div v-if="pre">
        <h2>RESULT</h2>
        <pre>
          {{pre}}
        </pre>
      </div>
    </div> -->   
    <transition enter-active-class="animated fadeInUp custom-classes-transition"
    leave-active-class="animated fadeOutDown custom-classes-transition">
      <plekan v-show="show" :rows="mockup"></plekan>
    </transition>
  </div>
</template>

<script>
	
	import Vue from 'vue'
	import plekan from './plekan.js';
  import mockup from 'core/mockup'

  export default {
    data () {
      return {
      	show:true,
        mockup: mockup,
        language: "tr,en,rs",
        pre : null
      }
    },
    components: {
    },
    beforeMount() {
    },
    created(){
      this.showEditor()
    },
    mounted() {
		  

    },
    beforeDestroy() {
    },
    methods:{
      showEditor(){
        this.show = true
        this.pre = null
        Vue.use(plekan,{
          defaultLanguage : this.language.split(',')[0],
          languages : this.language.split(','),
          save : function (row) {
            console.log(this)
            this.pre = row
        		this.show = false
          }.bind(this)
        })


      }
    }
  }
</script>

<style>
  
</style>
