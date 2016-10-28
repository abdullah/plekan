<template>
  <div class="file-upload-area">
       <label 
              for="upload" @drop="drop" @dragover="dropAllow"
              :class="{empty : file ? false : true}"
              :style="{ backgroundImage: 'url(' + image + ')' }"
              ></label>
        <div class="plekan-file-information">
          
        </div>
       <input id="upload" type="file" @change="onFileChange">
  </div> 
</template>

<script>
  
  export default {
    props:["fileChange"],
    data () {
      return {
        image:null,
        file:null
      }
    },
    methods:{
      dropAllow(e){
        e.stopPropagation();
        e.preventDefault()
      },
      drop(e){
        this.dropAllow(e)
        this.onFileChange(e)
      },
      onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files;

        if (!files.length)
          return;

        var isImage = files[0].name.split('.').pop(-1).match( /(png|jpg|jpeg|JPEG|gif)/ ) != null ? true : false;

        if (isImage) {
          this.createImage(files[0]);
        }else{
          this.file = files[0]
          this.fileChange(this.file)
        }

      },
      createImage(file) {
        var image = new Image();
        var reader = new FileReader();
        var vm = this;

        reader.onload = (e) => {
          vm.image = e.target.result;
        };
        this.file = file;
        reader.readAsDataURL(file);

        this.fileChange(this.file)

      },
    }
  }
</script>

<style>
  
</style>
