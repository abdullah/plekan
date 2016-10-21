<template>
  <div class="imageontext" v-html="content"></div>
</template>

<script>
  import mixinComponent from 'core/mixin'

  var DEFAULT_CONTENT = `
  <div class="imageontext">
    <div class="image-layer">
      <img src="/static/sunset.png" alt="" />
      <div class="text">
          <span contenteditable="true">Lorem ipsum dolor.</span>
      </div>
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
   .imageontext{
      position: relative;
      .image-layer{
        width: 100%; 
      }
     img{
       width: 100% ;
       display: block;
     }
     .text{
       position: absolute;
       top: 50%;
       left: 50%;
       transform: translate(-50%,-50%);   
       color: #FFF;
       background-color: rgba(0,0,0,.5);
       width: 100%;
       text-align: center;
       font-weight: 100!important;
       padding: 4px;
       font-size: 40px;
     }
   }
</style>