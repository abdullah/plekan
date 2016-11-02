<template>
  <div id="plekan">
  	<Editor></Editor>
    <Arena></Arena>
    <List></List>
  </div>
</template>


<script>
  import Arena from 'components/arena'
  import List from 'components/list'
  import Editor from 'components/editor'
  import globalElements from 'core/globalElements'
  import store from 'store'

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
      globalElements.editorStart()
      this.$plekanEvent.onInit()
    },
  }
</script>
