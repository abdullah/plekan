<template>
  <modal :show="shown">
    <header slot="header">
      <div class="plekan-modal-title">File Upload</div>
    </header>
    <div slot="body"
         class="plekan-modal-color-body plekan-clearfix">
      <file-upload :clean="shown"
                   :types="$allowedFileTypes"
                   :fileChange="fileChange"></file-upload>

    </div>
    <footer slot="footer"
            class="plekan-clearfix">
      <button class="plekan-footer-button"
              @click="onFileUpload"
              :disabled="!file">Upload</button>
    </footer>
  </modal>
</template>

<script>
import modal from 'components/modal';
import fileUpload from 'components/fileUpload';
import { exec } from 'src/helper';

export default {
  props: ['shown', 'close'],
  data() {
    return {
      file: null,
    };
  },
  components: {
    modal,
    fileUpload,
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
    *
    * Callback method'unden geri gelen değer ile link oluşturulur
    *
    * this.$onFileUpload fonksiyonu global'dir. Plekan.js
    * #Vue.prototype.$onFileUpload tanımalasına bakınız
    * @return {void}
   */
    onFileUpload() {
      /*
      @TODO : Pass file
      */
      this.$plekanEvent.onFileUpload(this.file, (url) => {
        exec(
          'insertHTML',
          `<a href="${url.src}" target="_blank">${url.title || url.src}</a>`,
        );

        this.close();
      });
    },
  },
};
</script>

<style>

</style>
