<template>
  <div class="plekan-area">
    <!-- This components for Preview and Translate language change  -->
    <change-language v-if="store.state.languages.length > 1"></change-language>
    <!-- Arena Container  -->
    <div :class="{'plekan-translate-mode' : translateMode}"
         class="plekan-container">
      <!-- Arena Column - Preview  -->
      <arena-column :isTranslate="false"
                    :rows="rows"
                    :editAsHTMLRow="editAsHTMLRow"
                    :language="currentLanguge"></arena-column>
      <!-- Arena Column - Translate  -->
      <arena-column v-if="store.state.languages.length > 1"
                    :isTranslate="true"
                    :rows="rows"
                    :editAsHTMLRow="editAsHTMLRow"
                    :language="translateLanguage"
                    v-show="translateMode"></arena-column>
      <!-- Edit As HTML Modal  -->
      <modal :show="editRow.row ? true : false"
             class="edit-modal">
        <header slot="header">
          <div class="plekan-modal-title">Edit As Html</div>
        </header>
        <div slot="body"
             class="plekan-edit-as-html-modal-body">
          <textarea v-model="editRow.html"></textarea>
        </div>
        <footer slot="footer"
                class="plekan-clearfix">
          <button type="button"
                  @click.prevent="saveEditAsHtml">Save HTML</button>
        </footer>
      </modal>
    </div>
    <!-- Arena Footer -->
    <div class="plekan-container">
      <!-- <pre>{{store.state.rows}}</pre> -->
      <div class="plekan-footer">
        <button v-for="b in $plekan_buttons"
                type="button"
                :class="b.class"
                @click="b.callback(returnStoreRows)">
          {{b.text}}
        </button>
      </div>
    </div>
  </div>
</template>
<script>

import Sortable from 'sortablejs';
import store from 'src/store';
import modal from 'components/modal';
import { arenaSortableOptions } from 'src/core/sortable_options';
import changeLanguage from 'components/changeLanguage';
import arenaColumn from 'components/arenaColumn';

/**
 * NOTE FOR DEVELOPERS *****
 *
 * You can understand this section once you use pelikan.
 *
 * This component is a body for application. This component contains;
 * translate area , preview area , which language choose for displaying by
 * user.
 *
 * For example: Modal is used to edit component as HTML.
 */
export default {
  props: [],
  data() {
    return {
      // @type {Object} Each component, use and access the global store.
      store,
      // @type {Object} The object consists of language,html,index and row properties.
      editRow: {
        lang: null,
        html: null,
        index: null,
        row: null,
      },
    };
  },
  /**
   * Components are used in the area
   * @todo If you don't have any idea of components keyword:
   * https://vuejs.org/guide/components.html
   */
  components: {
    modal,
    changeLanguage,
    arenaColumn,
  },
  computed: {
    /**
     * Clean observable object
     * @return {Array} Store rows
     */
    returnStoreRows() {
      return JSON.parse(JSON.stringify(this.store.state.rows));
    },
    /**
     * This method return a boolean value for split arena of which preview
     * language
     *
     * Hesaplanan değer ekranı iki veya tek şekilde göstermek için
     * kullanılır Bu durum arena'nın boş olması durumdaki görüntüyüde
     * etkiler change-language komponent'i tarafından değiştirilir
     * @private
     * @return {Boolean}
     */
    translateMode() {
      return this.store.state.translateMode;
    },
    /**
     * Global store'da tutulan ve ekranda gösterilecek her bir row'un
     * bulunduğu diziyi hesaplar.
     * @private
     * @return {Array}  https://github.com/abdullah/plekan#row-objesi
     */
    rows() {
      return this.store.state.rows;
    },
    /**
     * currentLanguge hesaplaması change-language içindeki select'lere bağlı
     * çalışır ekranda gösterilecek row'ların hangi dilde olacağını hesaplar
     * . plekan.js dosyasında dışardan alının seçeneklere göre ilk ( init )
     * zamanında belirlenir ve sonradan değiştirilebilirdir
     * https://github.com/abdullah/plekan#seçenekler
     * @private
     * @return {String}
     */
    currentLanguge() {
      return this.store.state.currentLanguge;
    },
    /**
     * currentLanguge ile aynı özelliklere sahiptir. Ekran ikiye
     * bölündüğünde translate olacak kısımın hangi dilde olması gerektiğinin
     * hesaplar bu translateMode'un aktif (true) olduğunu gösterir
     * @private
     * @return {String}
     */
    translateLanguage() {
      return this.store.state.translateLanguage;
    },
    /**
     * Eklentiye tanıtılmış her bir row'un üretileceği komponent'leri temsil
     * eder.Özel olarak yazılmış veya daha önceden eklentinin çekirdeğinde
     * yer alan modül listeleridir. plekan.js içinde init zamanında global
     * store kayıt edilir.
     * @private
     * @return {Object}  /src/core/modules/list.json
     */
    list() {
      return this.store.state.moduleList;
    },
  },
  mounted() {
    /*
     * Sortable options init , see: https://github.com/RubaXa/Sortable
    */
    const el = document.getElementById('plekan-sortable-list');
    Sortable.create(el, {
      ...arenaSortableOptions,
      onAdd: this.onAdd,
      onEnd: this.onEnd,
    });
    /*
     * Modal komponenti kapatılmak istendiğinde tetiklenir. Kapatma isteği
     * "kapatma" ikonuna veya modal dışına tıklandığında tetiklenir Bu
     * olaydinlemesi güvenli çıkış olarak kullanılabilir.
     * @TODO : Move function in requestHiddenModal from to  new function
    */
    document.addEventListener('requestHiddenModal', () => {
      if (this.editRow.row) {
        /* eslint-disable */
        Object.keys(this.editRow).map((e) => this.editRow[e] = null);
        /* eslint-enable */
      }
    }, false);
  },
  methods: {
    /**
     * Bu method arena-column komponent'i içerisinden çağrılır. Bu method
     * arena-column komponentine özellik olarak geçilir (pass edilir).
     *
     * Bu method'a gelen değerler local scope'daki "editRow" objesinde
     * saklanır.
     *
     * Temel mantık için arena-column'a bakın.
     * @param  {Object} row      Düzenlenecek row'un kendisi
     * @param  {Number} index    Store objesinin içinde hangi index'te yer
     * aldığı
     * @param  {String} language Hangi dil için düzenleme yapılacağı
     * @return {void}
     */
    editAsHTMLRow(row, index, language) {
      this.editRow.row = JSON.parse(JSON.stringify(row));
      this.editRow.lang = language;
      this.editRow.index = index;
      this.editRow.html = this.editRow.row.contents[language].html;
    },
    /**
     * editRow objesi store'daki asıl obje ile değiştirilir editRow objesi
     * işlem bittikten sonra bolaştılır
     * @return {void}
     */
    saveEditAsHtml() {
      this.editRow.row.contents[this.editRow.lang].html = this.editRow.html;
      this.store.updateRows(this.editRow.index, this.editRow.row);
      /* eslint-disable */
      Object.keys(this.editRow).map(e => this.editRow[e] = null);
      /* eslint-enable */
    },
    /**
     * see: https://github.com/RubaXa/Sortable
     * @param  {Object of Sortable Event} evt
     * @return {void}
     * @todo Global event atanacak.
     * https://github.com/abdullah/plekan#olay-yakalama
     *
     * Sortable eklentesi tarafından sürükleme bittiğinde sürüklenen liste
     * elemanın bir kopyasını oluşturur.
     * @todo daha iyi anlamak için fonksiyonu kaldırın.
     */
    onAdd(evt) {
      evt.item.remove();
    },
    /**
     * Row'ların yer değiştirmesinden sonra bu event tetiklenir
     * Yeni ve eski yerlerine göre store güncellenir
     * @param  {Object of Sortable Event} evt
     * @return {void}
     */
    onEnd(evt) {
      this.store.sortRows(evt.newIndex, evt.oldIndex);
    },
  },
};
</script>
