<template>
  <div class="plekan-template" v-html="content" contenteditable="true"></div>
</template>

<script>
  import mixinComponent from 'core/mixin'

  var DEFAULT_CONTENT = `
    <section class="plekan-video-and-text">
        <div class="plekan-xs-12 plekan-sm-12 plekan-md-6 plekan-lg-6">
          <iframe width="100%" height="300" src="https://www.youtube.com/embed/KLZJ8BdBEoM" frameborder="0" allowfullscreen></iframe>
        </div>
        <div class="plekan-xs-12 plekan-sm-12 plekan-md-6 plekan-lg-6">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error incidunt, quas eaque laboriosam alias odit quidem quae repellat aliquam quasi placeat illum maiores quod aperiam fugiat rem ipsa veniam, deserunt voluptatibus dolor quia facilis veritatis consectetur. Odit perferendis harum, pariatur dolores iusto quidem distinctio vitae blanditiis officiis dolore fuga, sed.</p>
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