<template>
  <div class="plekan-template" v-html="content" contenteditable="true"></div>
</template>


<script>
  import mixinComponent from 'core/mixin'

  var DEFAULT_CONTENT = `
   <section class="plekan-three-image">
        <div class="plekan-xs-12 plekan-sm-6 plekan-md-4 plekan-lg-4">
          <img src="static/component/1.png" alt="">
          <div class="desc">
            <p class="text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia ad odit iure exercitationem sint.
            </p>
            <a href="" class="link">Link Here</a>
          </div>
        </div>
        
        <div class="plekan-xs-12 plekan-sm-6 plekan-md-4 plekan-lg-4">
          <img src="static/component/1.png" alt="">
          <div class="desc">
            <p class="text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia ad odit iure exercitationem sint.
            </p>
            <a href="" class="link">Link Here</a>
          </div>
        </div>
        
        <div class="plekan-xs-12 plekan-sm-6 plekan-md-4 plekan-lg-4">
          <img src="static/component/1.png" alt="">
          <div class="desc">
            <p class="text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia ad odit iure exercitationem sint.
            </p>
            <a href="" class="link">Link Here</a>
          </div>
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