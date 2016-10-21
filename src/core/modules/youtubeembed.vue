<template>
  <div class="youtubeembed" v-html="content"></div>
</template>

<script>
  import mixinComponent from 'core/mixin'

  var DEFAULT_CONTENT = `
  <div class="youtubeembed">
    <div class="plekan-xs-6">
      <iframe width="100%" height="400" src="https://www.youtube.com/embed/KLZJ8BdBEoM" frameborder="0" allowfullscreen></iframe>
    </div>
    <div class="plekan-xs-6">
    <h3 contenteditable="true">Vue 2.0 is Here!</h3>
      <p contenteditable="true">
      Today I am thrilled to announce the official release of Vue.js 2.0: Ghost in the Shell. After 8 alphas, 8 betas and 8 rcs (a total coincidence!), Vue.js 2.0 is ready for production! The official guide has been fully updated and is available at vuejs.org/guide.
      </p>

      <p contenteditable="true">
      Ever since the work on 2.0 started back in April, the core team has made significant contributions to API design, bug fixes, documentation and TypeScript typings (yes, vue core, vue-router and vuex 2.0 all have TypeScript typings shipped in the npm packages), and the community also provided extremely valuable feedback on API changes — a big thank you to everyone involved!
      </p>
    </div>
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
   
</style>