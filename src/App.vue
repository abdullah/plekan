<template>
  <div id="app">
  	<navigation></navigation>
	  <!-- <hr>
    <transition
		enter-active-class="animated fadeIn"
		leave-active-class="animated  fadeOut">
		<module-list v-show="store.state.customizeShow"></module-list>
	</transition> -->
  	<div class="result" style="padding:30px">
      <h4>Result of rows</h4>
     <pre>{{this.store.state.resultRows}}</pre> 
    </div>
    <transition
    enter-active-class="animated fadeIn"
    leave-active-class="animated  fadeOut">
    <plekan v-show="store.state.plekanShow"></plekan>
  </transition>     

  <transition
		enter-active-class="animated fadeInLeft"
		leave-active-class="animated  fadeOutRight">
		<moduleModal v-show="store.state.moduleModal">
    </moduleModal>
	</transition>  	

  <navigation-footer></navigation-footer>
  </div>
</template>

<script>
  import navigation from 'components/navigation.vue'
  import navigationFooter from 'components/navigationFooter.vue'
  import moduleList from 'components/moduleList.vue'
  import moduleModal from 'components/moduleModal.vue'
  import store from 'store'
  export default {
    props:[],
    data () {
      return {
      	store: store
      }
    },
    components: {
    	navigation,navigationFooter,moduleList,moduleModal
    },
    beforeCreate() {

    },
    created() {

    },
    beforeMount() {

    },
    mounted() {
      this.$plekan_buttons.cancel.callback =  (rows) => {
        this.store.state.plekanShow = false
      }
      this.$plekan_buttons.save.callback =  (rows) => {
        this.store.state.plekanShow = false
        setTimeout( () => {
          // this.store.state.moduleModal = true
          this.store.state.resultRows = rows
        },300)
      }
    },
    beforeDestroy() {

    },
    destroyed() {

    },
    methods:{
      
    }
  }
</script>

<style>
  
</style>
