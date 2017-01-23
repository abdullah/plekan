<template>
  <div class="plekan-template" v-html="_content" contenteditable="true"></div>
</template>

<script>
  import mixinComponent from 'src/core/mixin'

  var DEFAULT_CONTENT = `   <section class="plekan-module-6">
        <div class="plekan-xs-4 plekan-sm-4 plekan-md-4 plekan-lg-4">
          <img src="http://static.boredpanda.com/blog/wp-content/uploads/2016/04/beautiful-fluffy-cat-british-longhair-thumb.jpg" alt="">   
        </div>
        <div class="plekan-xs-8 plekan-sm-8 plekan-md-8 plekan-lg-8">
        <h4>Lorem ipsum dolor sit.</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum provident, voluptatem, odit sunt eos error aspernatur. Quo dolorem cumque quis aut fugiat tempora, alias! Accusantium voluptatibus nemo corrupti suscipit tempore.</p>
            <hr>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor libero id, quaerat eaque consectetur quod ducimus temporibus quidem odit adipisci facere sed, quo autem eum deserunt! Consequatur debitis vitae cupiditate! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore laborum qui fuga doloribus culpa reprehenderit sint expedita dicta est minima laboriosam enim nisi sed quibusdam cupiditate, quod velit, ullam modi.</p>
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