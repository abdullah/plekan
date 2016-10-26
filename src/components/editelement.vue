<template>
    <modal :show="shown">
      <header slot="header">
        <div class="title">Edit</div>
      </header>
      <div slot="body">
        <div v-for="e in getElementPropertyArray" class="editable-element-fields-container">
          <div class="editable-element-fields" v-show="elementEditableProperties[e.prop] != undefined">
            <span>{{e.title}}</span>
            <input type="text" v-model="elementEditableProperties[e.prop]" :placeholder="e.placeholder">
          </div>
        </div>
        <!-- {{uploadImage}} -->
        <div v-show="uploadImage.status" class="file-upload-area">
             <label 
                    for="upload" @drop="drop" @dragover="dropAllow"
                    :class="{empty : file ? false : true}"
                    :style="{ backgroundImage: 'url(' + image + ')' }"
                    ></label>
             <input id="upload" type="file" accept="image/*" @change="onFileChange">
        </div>  
      </div>
      <footer slot="footer" class="plekan-clearfix">
        <button @click.prevent="save()" class="editable-element-save-button">Save</button>
        <button 
        @click.prevent="onFileUpload" 
        v-show="uploadImage.status"
        class="editable-element-save-button">Upload</button>
      </footer>
    </modal>
</template>

<script>
  import modal from 'components/modal'

  export default {
    props:["element","shown"],
    data () {
      return {
        event : null,
        getElementPropertyArray   : [
          {title : "Text",      prop  : "text" ,  placeholder : "Text"},
          {title : "Source",    prop  : "src" ,   placeholder : "source link"},
          {title : "Alt Title", prop  : "alt",    placeholder : "when the image error loaded shown text "},
          {title : "Link",      prop  : "href" ,  placeholder : "source link"},
          {title : "Title",     prop  : "title" , placeholder : "title text"},
        ],
        elementEditableProperties : {},
        uploadImage : {
          status : true,
        },
        image:null,
        file:null
      }
    },
    components: {modal},
    beforeMount() {
      document.body.style.overflow = "hidden"
    },
    watch:{
      shown:function () {
        this.event = new CustomEvent('domupdated');
          this.image = null
          this.file = null
          
          if (!this.element) return ;

          let el = this.element
          let tmp = {};

          this.uploadImage.status = el.tagName == 'IMG'
          this.getElementPropertyArray.map((p,i) => {
            if (el[p.prop] != undefined) {
              tmp[p.prop] = el[p.prop];
            }
          })

          this.elementEditableProperties = tmp
      }
    },
    beforeDestroy() {
      document.body.style.overflow = ""
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

      },
      onFileUpload(){
       
        this.$onFileUpload(this.file, (obj) => {
          
          Object.keys(obj).map(e => {
            this.elementEditableProperties[e] = obj[e]
          })

        });

      },
      save(){
        // Save 

        Object.keys(this.elementEditableProperties).map(e => {
          this.element[e] = this.elementEditableProperties[e]
        })
        
        this.makeABroadcast()

      },
      makeABroadcast(){
        document.dispatchEvent(this.event);
      }
    }
  }
</script>

<style>
  
</style>
