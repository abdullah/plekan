<template>
  <div class="plekan-template" v-html="_content" contenteditable="true"></div>
</template>

<script>
  import mixinComponent from 'src/core/mixin'


  var DEFAULT_CONTENT = ` <section class="plekan-module-3">
        <div class="plekan-xs-12 plekan-sm-12 plekan-md-4 plekan-lg-4">
          <img src="http://img2.rnkr-static.com/node_img/1589/31779858/C100/eilidh-mccormick-people-in-film-photo-1.jpg" alt="">
          <div class="desc">
            <h4>Özge </h4>
            <p>Lorem ipsum dolor sit amet, consectetur.</p>
            <div class="social">
              <a href="">facebook</a>
              <a href="">twitter</a>
              <a href="">github</a>
            </div>
          </div>
        </div>
        <div class="plekan-xs-12 plekan-sm-12 plekan-md-4 plekan-lg-4">
          <img src="http://img1.rnkr-static.com/user_node_img/66/1313341/C100/john-qualen-people-in-tv-photo-u1.jpg" alt="">
            <div class="desc">
            <h4>Abdullah </h4>
            <p>Lorem ipsum dolor sit amet, consectetur.</p>
            <div class="social">
              <a href="">facebook</a>
              <a href="">twitter</a>
              <a href="">github</a>
            </div>
          </div>
        </div>
        <div class="plekan-xs-12 plekan-sm-12 plekan-md-4 plekan-lg-4">
          <img src="http://celtic-heroes.com/forum/images/avatars/gallery/Stock/DefaultAva.jpg" alt="">
            <div class="desc">
            <h4>Deniz </h4>
            <p>Lorem ipsum dolor sit amet, consectetur.</p>
            <div class="social">
              <a href="">facebook</a>
              <a href="">twitter</a>
              <a href="">github</a>
            </div>
          </div>
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