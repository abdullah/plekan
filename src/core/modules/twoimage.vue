<template>
  <div class="plekan-template" v-html="content" contenteditable="true"></div>
</template>

<script>
  import mixinComponent from 'core/mixin'

  var DEFAULT_CONTENT = `
      <section class="plekan-two-image">
        <div class="plekan-xs-12 plekan-sm-12 plekan-md-6 plekan-lg-6">
          <img src="static/component/1.png" alt="">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis consectetur quam facilis quisquam laborum dignissimos sint sunt rem dol!</p>
        </div>
        <div class="plekan-xs-12 plekan-sm-12 plekan-md-6 plekan-lg-6">
          <img src="static/component/1.png" alt="">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur inventore explicabo dolores minima deleniti pariatur nihil, debitis culpa temporibus eum!</p>

        </div>
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