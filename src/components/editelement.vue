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
        <file-upload 
        :fileChange="fileChange"
        v-if="elementIsImage"></file-upload> 
      </div>
      <footer slot="footer" class="plekan-clearfix">
        <button @click.prevent="save()" 
                class="plekan-footer-button">Save</button>
        <button 
        @click.prevent="onFileUpload" 
        v-show="elementIsImage"
        :disabled="!file"
        class="plekan-footer-button">Upload</button>
      </footer>
    </modal>
</template>

<script>
  import modal from 'components/modal'
  import fileUpload from 'components/fileUpload'

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
        elementIsImage:false,
        file : null
      }
    },
    components: {modal,fileUpload},
    beforeMount() {
      document.body.style.overflow = "hidden"
    },
    watch:{
      shown:function () {
        this.event = new CustomEvent('domupdated');
          
          if (!this.element) return ;

          let el = this.element
          let tmp = {};

          this.elementIsImage = el.tagName == 'IMG'
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
      fileChange(file){
        this.file = file 
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
