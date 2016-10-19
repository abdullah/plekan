<template>
  <div class="twocloumn" v-html="content"></div>
</template>

<script>
  import mixinComponent from 'core/mixin'

  var DEFAULT_CONTENT = `
  <div>
    <img width="100%" src="http://news.nationalgeographic.com/content/dam/news/2016/04/06/elephants%20southern%20africa/Elephants-Southern-Africa.adapt.768.1.jpg" alt=""/>
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
      this.me.contents[this.displayLanguage].fields["src"] = this.$el.querySelector('img').src
    }
  }
</script>