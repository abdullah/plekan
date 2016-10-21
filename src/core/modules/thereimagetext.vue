<template>
  <div class="thereimagetext" v-html="content"></div>
</template>

<script>
  import mixinComponent from 'core/mixin'

  var DEFAULT_CONTENT = `
  <div class="thereimagetext">
    <h1 contenteditable="true">BEAUTIFUL CONTENT</h1>
    <p contenteditable="true">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
     <div class="thereimagetext-image">
          <img src="http://img2-ak.lst.fm/i/u/300x300/6184a4e751484a3d96ab9ab669b1d311.jpg" alt="" />
          <img src="http://wadpphoto.com/wp-content/uploads/2016/09/hd-nature-wallpapers-29_Widescreen-wallpaper-300x300.jpg" alt="" />
          <img src="http://vcresearch.berkeley.edu/sites/default/files/news_images/FieldAwe300.jpg" alt="" />
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
  .thereimagetext{
    h1,p{
      text-align: center;
    }
    p{
      font-style: italic;
    }
    .thereimagetext-image{
      margin-top:40px;
      text-align: center;
      img{
        width: 150px;
        margin-left:10px;
        padding: 50;
        border-radius:50%;
      }
    }
  }
</style>