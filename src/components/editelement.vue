<template>
  <modal :show="shown">
    <header slot="header">
      <div class="plekan-modal-title">Edit</div>
    </header>
    <div slot="body">
      <div v-for="e in getElementPropertyArray"
           class="plekan-editable-element-fields-container">
        <div class="plekan-editable-element-fields"
             v-show="elementEditableProperties[e.prop] != undefined">
          <span>{{e.title}}</span>
          <input type="text"
                 v-model="elementEditableProperties[e.prop]"
                 :placeholder="e.placeholder">
        </div>
      </div>
      <file-upload :clean="shown"
                   types="png|jpg|jpeg|gif"
                   :fileChange="fileChange"
                   v-if="elementIsImage"></file-upload>
    </div>
    <footer slot="footer"
            class="plekan-clearfix">
      <button @click.prevent="save()"
              type="button"
              class="plekan-footer-button">Save</button>
      <button @click.prevent="onFileUpload"
              v-show="elementIsImage"
              :disabled="!file"
              type="button"
              class="plekan-footer-button">Upload</button>
    </footer>
  </modal>
</template>

<script>
import modal from 'components/modal';
import fileUpload from 'components/fileUpload';

/**
 * Bu component Editor.vue tarafından kullanılır,
 * plekan-editable-elements-button'a tıklandığında açılır.
 *
 * Element objesi DOM'daki herhangi bir obje olabilir bkz: Editor.vue
 * line:101 #editableTag[]
 *
 * Shown özelliği modal'e özellik olarak tanımlanır bkz : Modal.vue line:36
 * #show()
 */
export default {
  props: ['element', 'shown'],
  data() {
    return {
      event: null,
      /** @type {Array} DOM element'inin değiştirlebilir özellikleri  */
      getElementPropertyArray: [
        { title: 'Text', prop: 'text', placeholder: 'Text' },
        { title: 'Class', prop: 'className', placeholder: 'Class' },
        { title: 'Source', prop: 'src', placeholder: 'source link' },
        {
          title: 'Alt Title',
          prop: 'alt',
          placeholder: 'when the image error loaded shown text ',
        },
        { title: 'Link', prop: 'href', placeholder: 'source link' },
        { title: 'Title', prop: 'title', placeholder: 'title text' },
      ],
      elementEditableProperties: {},
      elementIsImage: false,
      file: null,
    };
  },
  components: { modal, fileUpload },
  beforeMount() {
    // document.body.style.overflow = "hidden"
  },
  updated() {
    document.body.style.overflow = this.shown ? 'hidden' : '';
  },
  watch: {
    /**
     * Her değişimde DOM element'inin özellikleri local scope'a alınır
     * @return {void}
     */
    shown() {
      this.event = new CustomEvent('domupdated');

      if (!this.element) return;

      const el = this.element;
      const tmp = {};

      this.elementIsImage = el.tagName === 'IMG';
      this.getElementPropertyArray.map((p) => {
        if (el[p.prop] !== undefined) {
          tmp[p.prop] = el[p.prop];
        }
        return true;
      });

      this.elementEditableProperties = tmp;
    },
  },
  methods: {
    /**
     * Bu method file-upload componentine property olarak pass edilir.
     * file-upload'da geri dönen değer file objesi local scope'a alınır
     *
     * Daha fazlası için file-upload.vue'ye bakınız
     * @param  {Object of File} file
     * @return {void}
     */
    fileChange(file) {
      this.file = file;
    },
    /**
     * Upload button'nuna tıklandığında bu method çağrılır.
     * this.$onFileUpload fonksiyonu global'dir. Plekan.js
     * #Vue.prototype.$onFileUpload tanımalasına bakınız
     * @return {void}
     */
    onFileUpload() {
      if (!this.$plekanEvent.onFileUpload) {
        this.elementEditableProperties.src = this.file.base64;
        return;
      }

      this.$plekanEvent.onFileUpload(this.file, (obj) => {
        Object.keys(obj).map((e) => {
          this.elementEditableProperties[e] = obj[e];
          return true;
        });
      });
    },
    /**
     * Değiştirilen özelliklerin DOM element'ine atanması ve kayıt edilmesi
     * @return {void}
     */
    save() {
      Object.keys(this.elementEditableProperties).map((e) => {
        this.element[e] = this.elementEditableProperties[e];
        return true;
      });
      this.makeABroadcast();
    },
    /**
     * Gerekli DOM manipülasyonu yapıldı yayını yapar
     * Editor.vue veya başka bir component bu yayına göre işlemler yapabilir
     * Örnek: Editelement modal'ini kapatmak gibi
     *
     * @return {void}
     *
     */
    makeABroadcast() {
      document.dispatchEvent(this.event);
    },
  },
};

</script>
