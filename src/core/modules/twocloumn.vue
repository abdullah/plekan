<template>
  <div class="twocloumn" v-html="content"></div>
</template>

<script>
  import mixinComponent from 'core/mixin-component'

  var DEFAULT_CONTENT = `
	<div class="plekan-clearfix">
		<h2 contenteditable="true">DEFAULT</h2>
    <div contenteditable="true">222Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
      <div class="plekan-row">
        <div class="plekan-xs-6">
          <img width="100%" src="http://scitechdaily.com/images/Universe-Collide_01.jpg" alt="">
        </div>
        <div class="plekan-xs-6" contenteditable="true">
          <ul>
              <li>Bu</li>
              <li>Şu</li>
              <li>Onlar</li>
              <li>Bunlar</li>
          </ul>
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
    mounted(){
      // this.me.contents[this.displayLanguage].fields["src"] = this.$el.querySelector('img').src
    },
    updated(){
      this.me.contents[this.displayLanguage].fields["src"] = this.$el.querySelector('img').src
    }
  }
</script>