<template>
  <div class="plekan-template" v-html="_content" contenteditable="true"></div>
</template>

<script>
  import mixinComponent from 'src/core/mixin'

  var DEFAULT_CONTENT = `<section class="plekan-module-8">
        <img src="http://www.w3schools.com/css/trolltunga.jpg" alt="">
        <h2>Lorem ipsum dolor sit.</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique natus nemo ratione, labore impedit facere eaque incidunt in praesentium quaerat ea excepturi, dolor ullam quisquam quae ex quidem tenetur a.</p>
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