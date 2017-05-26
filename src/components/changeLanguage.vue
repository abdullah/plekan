<template>
  <div class="plekan-change-language plekan-clearfix">
    <div class="plekan-container">
      <div class="plekan-pull-left">
        <span>Preview Language</span>
        <select v-model="store.state.currentLanguge"
                class="plekan-form-control">
          <option v-for="l in languages"
                  :value="l">{{l}}</option>
        </select>
      </div>
      <div class="plekan-open-translate-arena">
        <button @click="store.changeTranslateMode()">
          <i class="fa fa-language"></i>
        </button>
      </div>
      <div class="plekan-pull-right"
           v-show="translateMode">
        <span>Translate Language</span>
        <select v-model="store.state.translateLanguage"
                class="plekan-form-control">
          <option v-for="l in languages"
                  :value="l">{{l}}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>

import store from 'src/store';

export default {
  props: [],
  data() {
    return {
      store,
    };
  },
  computed: {
    /**
     * Global store'daki dil koleksiyonunu döndürür
     * Dil koleksiyonundaki diller kadar seçenek sunar.
     * @return {Array}
     */
    languages() {
      return this.store.state.languages;
    },
    /**
     * Global store'daki çeviri modunun aktif olup olmadığını döndürür.
     * Burdan dönen değere göre local template'te değişiklil yapılır
     * Örnek : v-show="translateMode"
     * @return {Boolean}
    */
    translateMode() {
      return this.store.state.translateMode;
    },
  },
};
</script>
