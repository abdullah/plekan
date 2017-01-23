<template>
  <div class="plekan-template" v-html="_content" contenteditable="true"></div>
</template>

<script>
  import mixinComponent from 'src/core/mixin'

  var DEFAULT_CONTENT = `<section class="plekan-module-2">
        <div class="plekan-xs-12 plekan-sm-6 plekan-md-6 plekan-lg-6">
          
          <h4>Sunset</h4>
          <p>
          The spinning Earth lit by the Sun as seen from far above the North Pole. All along the terminator, the rays from the sun hit Earth horizontally, neglecting any atmospheric effects and Earth's orbital motion.
          Sunset is distinct from twilight, which has three phases, the first being civil twilight, which begins once the Sun has disappeared below the horizon, and continues[....]</p>
        </div>
        <div class="plekan-xs-12 plekan-sm-6 plekan-md-6 plekan-lg-6">
          <img src="https://photos.smugmug.com/Landscape/Sunrise-Sunset/i-P6c3cjn/0/M/IMG_6426-Pano-M.jpg" alt="">
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