<template>
  <div class="plekan-template" v-html="_content" contenteditable="true"></div>
</template>

<script>
  import mixinComponent from 'src/core/mixin'

  var DEFAULT_CONTENT = `<section class="plekan-module-5">
        <h1>Lorem ipsum dolor sit amet, consectetur.</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, distinctio aspernatur ab atque voluptatibus quo hic pariatur, similique aliquid laboriosam quam eius quae amet? Ipsa cumque sapiente in, pariatur dolorem.</p>
      </section>`

  export default {
    mixins:[ mixinComponent ],
    data () {
      return {
        DEFAULT_CONTENT : DEFAULT_CONTENT
      }
    }
  }
</script>