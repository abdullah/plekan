<template>
  <div class="plekan-modal">
      <div class="modal-arena-layout">
        <div class="modal-arena">
             <slot name="header"></slot>
             <slot name="body"></slot>
             <slot name="footer"></slot>
        </div>
      </div>
  </div>
</template>

<script>
  export default {
    props:["element"],
    data () {
      return {
      }
    },
    components: {
    },
    beforeMount() {
    },
    mounted() {
    },
    beforeDestroy() {
    },
    methods:{
    }
  }
</script>

<style>
  
</style>
