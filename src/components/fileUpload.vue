<template>
  <div class="file-upload-area">
    <label for="upload"
           @drop="drop"
           @dragover="dropAllow"
           :class="{empty : file ? false : true}"
           :style="{ backgroundImage: 'url(' + image + ')' }"></label>
    <div class="plekan-file-information">

    </div>
    <input id="upload"
           type="file"
           @change="onFileChange">
  </div>
</template>

<script>
export default {
  props: ['fileChange', 'types', 'clean'],
  data() {
    return {
      image: null,
      file: null,
    };
  },
  watch: {
    clean(n) {
      if (n) {
        this.image = null;
        this.file = null;
      }
    },
  },
  methods: {
    dropAllow(e) {
      e.stopPropagation();
      e.preventDefault();
    },
    drop(e) {
      this.dropAllow(e);
      this.onFileChange(e);
    },
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;

      if (!files.length) return;

      const isAllowed = files[0].type.match(new RegExp(this.types, 'g')) !== null;
      if (!isAllowed) return;

      /**
       * Eğer dosya fotoğraf ise fotoğraf oluşturulur.
       * @types {Boolean}
       */
      const isImage = files[0].type.match(/(png|jpg|jpeg|JPEG|gif)/) != null;

      if (isImage) {
        this.createImage(files[0]);
      } else {
        this.file = files[0];
        this.fileChange({
          data: this.file,
          base64: null,
        });
      }
    },
    createImage(file) {
      // const image = new Image();
      const reader = new FileReader();
      const vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;

        this.fileChange({
          data: this.file,
          base64: this.image,
        });
      };

      this.file = file;
      reader.readAsDataURL(file);
    },
  },
};

</script>
