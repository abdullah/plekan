<template>
  <ul class="animated" :class="cname">
    <li v-for="b in list" >
      <a href=""
      :data-type="b.code"
      :data-tagname="b.tagname"
      :data-value="b.value"
      :class="b.icon"
      ></a>
    </li>
   <!--  <li class="create-link">
      <input v-model="linktext" placeholder="http://example.com">
      <button @click="createLink"><i class="fa fa-check"></i></button>
    </li> -->  
   <slot name="link"></slot>
  </ul>
</template>

<script>
  export default {
    props:["list","cname"],
    data () {
      return {

      }
    },
    components: {

    },
    beforeCreate() {

    },
    created() {

    },
    beforeMount() {

    },
    mounted() {

    },
    beforeDestroy() {

    },
    destroyed() {

    },
    methods:{
      
    }
  }
</script>

<style>
  
</style>
