<template>
  <div class="plekan-translate-mode-column">
    <div :class="{empty: !rows.length,translate:isTranslate}"
         class="plekan-row-list"
         id="plekan-sortable-list">
      <div class="plekan-row-item animated fadeIn transition-component"
           v-for="(r,key) in rows"
           :key="r.index">
        <div class="plekan-tools">
          <span v-if="!isTranslate"
                class="plekan-move-row">
            <i class="fa fa-hand-grab-o"></i>
          </span>
          <span @click="editAsHTMLRow(r,key,language)">
            <i class="fa fa-html5"></i>
          </span>
          <span v-if="!isTranslate"
                @click="deleteRow(r,key)">
            <i class="fa fa-trash-o"></i>
          </span>
          <span v-if="!isTranslate"
                @click="dublicateRow(r,key)">
            <i class="fa fa-copy"></i>
          </span>
        </div>
        <component :is="r.name"
                   :index="key"
                   :store="store"
                   :displayLanguage="language">
        </component>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * GELİŞTİRİCİ NOTU
 *
 * <component> component'i vue tarafından sağlanır. Bu komponent'ler mixin
 * ile hazırlandığı için alt taraftaki özellikler bu komponen'te gönderilir
 * Mixin.js core/mixin.js
 *
 * "is"              -> component ismi /src/core/modules/list.json
 * "index"           -> benzersiz kimiliği (mixin tarafından oluşturulur)
 * "store"           -> mixin global store'dan izoledir.
 *                      Bu yüzden mixin'e global store pass edilir  /src/store/index.js
 * "displayLanguage" -> hangi dilde görüntüleneceği  https://github.com/abdullah/plekan#row-objesi
 * "isTranslate"     -> translate mod'a geçtiğinde bazı butonların gözükmemesi için.
 */
import store from 'src/store';

export default {
  /** @type {Array} Arena.vue tarafından yönetilir. */
  props: ['rows', 'language', 'editAsHTMLRow', 'isTranslate'],
  data() {
    return {
      /** @type {Object} Global store */
      store,
    };
  },
  methods: {
    /**
     * Row silmek istendiğinde tetiklenir
     * @private
     * @param  {Object} row
     * @param  {Number} index
     * @return {void}
     */
    deleteRow(row, index) {
      this.store.deleteRow(row, index);
    },
    /**
     * Row kopyalanmak istendiğinde tetiklenir
     * @private
     * @param  {Object} row
     * @param  {Number} index
     * @return {void}
    */
    dublicateRow(row, index) {
      this.store.dublicateRow(row, index);
    },
  },
};
</script>
