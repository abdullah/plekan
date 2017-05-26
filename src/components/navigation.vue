<template>
  <header>
    <nav>
      <ul>
        <li>
          <a href="#"
             @click.prevent="togglePlekan">Try Plekan</a>
        </li>
        <li>
          <a href="https://github.com/abdullah/plekan/"
             target="_blank">Github</a>
        </li>
        <li>
          <a href="https://github.com/abdullah/plekan/wiki"
             target="blank">Doc</a>
        </li>
      </ul>
    </nav>
    <div class="plekan-container">
      <div class="logo">
        <span>PLEKAN</span>
        <small>Agile content builder.</small>
      </div>
    </div>
  </header>
</template>

<script>
import store from 'store';

export default {
  props: [],
  data() {
    return {
      store,
    };
  },
  methods: {
    togglePlekan() {
      this.store.state.plekanShow = !this.store.state.plekanShow;
    },
    toggleCustomize() {
      this.store.state.customizeShow = !this.store.state.customizeShow;
    },
  },
};
</script>
