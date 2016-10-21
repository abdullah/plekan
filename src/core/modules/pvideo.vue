<template>
  <div class="plekan-template" v-html="content" contenteditable="true"></div>
</template>

<script>
  import mixinComponent from 'core/mixin'

  var DEFAULT_CONTENT = `
    <section class="plekan-video">
        <iframe width="100%" height="400" src="https://www.youtube.com/embed/KLZJ8BdBEoM" frameborder="0" allowfullscreen></iframe>
        <blockquote>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem dicta id incidunt suscipit consectetur, voluptate, nobis dolorem voluptates ab totam tempora ipsa ratione voluptas? Commodi pariatur fugiat esse dolore similique?</blockquote>
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