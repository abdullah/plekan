<template>
  <div class="plekan-template" v-html="content" contenteditable="true"></div>
</template>

<script>
  import mixinComponent from 'core/mixin'

  var DEFAULT_CONTENT = `
    <section class="plekan-only-image">
      <img src="static/component/1.png" alt="">
    </section>
  `

  export default {
    mixins:[ mixinComponent ],
    data () {
      return {
        DEFAULT_CONTENT : DEFAULT_CONTENT
      }
    }
  }
</script>