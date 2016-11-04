<template>
  <div class="moduleModal">
    <div class="plekan-container">
      <div class="module-result">
        <div class="switch-html-mode">
          <a href="">Show HTML</a>
        </div>
        <pre>
          {{store.state.resultRows}}
        </pre>
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
        store: store
      }
    },
    components: {

    },
    beforeCreate() {

    },
    created() {

    },
    beforeMount() {

    },
    mounted() {

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
