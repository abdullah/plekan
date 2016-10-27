<template>
  <div v-show="uploadImage.status" class="file-upload-area">
       <label 
              for="upload" @drop="drop" @dragover="dropAllow"
              :class="{empty : file ? false : true}"
              :style="{ backgroundImage: 'url(' + image + ')' }"
              ></label>
       <input id="upload" type="file" @change="onFileChange">
  </div> 
</template>

<script>
  export default {
    props:["fileChange"],
    data () {
      return {
        uploadImage : {
          status : true,
        },
        image:null,
        file:null
      }
    },
    components: {

    },
    destroyed() {

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

        this.createImage(files[0]);
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
      // onFileUpload(){
       
      //   this.$onFileUpload(this.file, (obj) => {
          
      //     Object.keys(obj).map(e => {
      //       this.elementEditableProperties[e] = obj[e]
      //     })

      //   });

      // },
    }
  }
</script>

<style>
  
</style>
