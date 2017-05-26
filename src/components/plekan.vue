<template>
  <div id="plekan">
    <Editor></Editor>
    <Arena></Arena>
    <List></List>
  </div>
</template>


<script>
/* eslint-disable */
import Arena from 'components/arena';
import List from 'components/list';
import Editor from 'components/editor';
import store from 'src/store';

export default {
  props: ['rows'],
  data() {
    return {
      store,
    };
  },
  components: {
    Arena,
    List,
    Editor,
  },
  beforeMount() {
    if (this.rows) {
      this.store.init('rows', JSON.parse(JSON.stringify(this.rows)));
    }
  },
  created() {
    this.store.state.vm = this;
  },
  mounted() {
    this.store.state.editorStart();
    this.$plekanEvent.onInit();
  },
};
</script>
