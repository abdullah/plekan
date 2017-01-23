<template>
  <div class="plekan-template" v-html="_content" contenteditable="true"></div>
</template>

<script>
  import mixinComponent from 'src/core/mixin'

  var DEFAULT_CONTENT = `<section class="plekan-module-4">
        <img src="http://blog.globalknowledge.com/wp-content/uploads/2015/09/SAP-Universe54051886Blog.jpg" alt="">
        <div class="p-text-center">
          <h4>Universe</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam, reprehenderit.</p>
        </div>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, distinctio repellat ab dolorum ex excepturi illo praesentium repellendus, numquam cupiditate obcaecati dolore necessitatibus vero nemo blanditiis autem dolor consequatur est! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea totam nobis, enim laboriosam id beatae reru msa Lorem </p>
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