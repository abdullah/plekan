<template>
  <div class="gap" v-html="content"></div>
</template>

<script>
  import mixinComponent from 'core/mixin'

  var DEFAULT_CONTENT = `
  <div class="gap">
    <!--  -->
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
      // this.me.contents[this.displayLanguage].fields["src"] = this.$el.querySelector('img').src
    }
  }
</script>

<style lang="scss">
   .gap{
    padding: 10px 
   }
</style>