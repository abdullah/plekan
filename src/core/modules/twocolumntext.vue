<template>
  <div class="plekan-template" v-html="content" contenteditable="true"></div>
</template>

<script>
  import mixinComponent from 'core/mixin'

  var DEFAULT_CONTENT = `
    <section class="plekan-two-column-text">
        <div class="plekan-xs-12 plekan-sm-12 plekan-md-6 plekan-lg-6">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident eaque, odio quas omnis quibusdam saepe, quam quaerat, accusamus obcaecati blanditiis beatae expedita officia ipsa ratione pariatur, nemo. A, incidunt, unde.</p> 
        </div>
        <div class="plekan-xs-12 plekan-sm-12 plekan-md-6 plekan-lg-6">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident eaque, odio quas omnis quibusdam saepe, quam quaerat, accusamus obcaecati blanditiis beatae expedita officia ipsa ratione pariatur, nemo. A, incidunt, unde.</p> 
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