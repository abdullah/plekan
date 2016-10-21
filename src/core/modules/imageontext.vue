<template>
  <div class="plekan-template" v-html="content" contenteditable="true"></div>
</template>


<script>
  import mixinComponent from 'core/mixin'

  var DEFAULT_CONTENT = `
    <section class="plekan-image-text">
      <div class="plekan-xs-12 plekan-sm-12 plekan-md-6 plekan-lg-6">
        <img src="/static/component/1.png" alt="">
      </div>
      <div class="plekan-xs-12 plekan-sm-12 plekan-md-6 plekan-lg-6">
        <p>
          Elephants are large mammals of the family Elephantidae and the order Proboscidea. Two species are traditionally recognised, the African elephant (Loxodonta africana) and the Asian elephant (Elephas maximus), although some evidence suggests that African bush elephants and African forest elephants are separate species (L. africana and L. cyclotis respectively). Elephants are scattered throughout sub-Saharan Africa, South Asia, and Southeast Asia. Elephantidae is the only surviving family of the order Proboscidea;          </p>
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