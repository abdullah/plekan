<template>
  <div class="plekan-template" v-html="_content" contenteditable="true"></div>
</template>

<script>
  import mixinComponent from 'src/core/mixin'

  var DEFAULT_CONTENT = `<section class="plekan-module-1">
        <div class="plekan-xs-12 plekan-sm-12 plekan-md-12 plekan-lg-12">
          <div class="p-text-center">
            <h2>I LOVE <small>plekan</small></h2>
            <hr>
            <img src="https://www.google.com.tr/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" alt="">
          </div>
          <h1 class="p-text-center">Did you like it?</h1>
        </div>
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