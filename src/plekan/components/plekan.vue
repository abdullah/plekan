<template>
  <div id="plekan">
  	<Editor></Editor>
    <Arena></Arena>
    <List></List>
  </div>
</template>


<script>
  import Arena from 'plekan/components/arena'
  import List from 'plekan/components/list'
  import Editor from 'plekan/components/editor'
  import store from 'plekan/store'

  export default {
    props:["rows"],
    data () {
      return {
        store:store
      }
    },
    components: {
      Arena, 
      List,
      Editor
    },
    beforeMount() {
      if (this.rows) {
        this.store.init("rows",this.rows);
      }
    },
    created(){
      this.store.state.vm = this
    },
    mounted() {
      this.store.state.editorStart()
      this.$plekanEvent.onInit()
    },
  }
</script>
