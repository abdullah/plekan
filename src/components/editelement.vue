<template>
    <modal>
      <header slot="header">
        <div class="title">Edit</div>
      </header>
      <!-- <pre>{{elementEditableProperties}}</pre> -->
      <div slot="body" v-for="e in getElementPropertyArray" class="editable-element-fields-container">
        <div class="editable-element-fields" v-if="elementEditableProperties[e.prop] != undefined">
          <span>{{e.title}}</span>
          <input type="text" v-model="elementEditableProperties[e.prop]" :placeholder="e.placeholder">
        </div>
      </div>
      <footer slot="footer" class="plekan-clearfix">
        <button @click.prevent="save" class="editable-element-save-button">Save</button>
      </footer>
    </modal>
</template>

<script>
  import modal from 'components/modal'

  export default {
    props:["element"],
    data () {
      return {
        event : null,
        getElementPropertyArray   : [
          {title : "Text", prop  : "text" , placeholder : "Text"},
          {title : "Source", prop  : "src" , placeholder : "source link"},
          {title : "Alt Title", prop  : "alt", placeholder : "when the image error loaded shown text "},
          {title : "Link", prop  : "href" , placeholder : "source link"},
          {title : "Title", prop  : "title" , placeholder : "title text"},
        ],
        elementEditableProperties : {}
      }
    },
    components: {
      modal
    },
    beforeMount() {
      document.body.style.overflow = "hidden"
    },
    mounted() {

      this.event = new CustomEvent('domupdated');

      let el = this.element
      let tmp = {};

      this.getElementPropertyArray.map((p,i) => {
        if (el[p.prop] != undefined) {
          tmp[p.prop] = el[p.prop];
        }
      })

      this.elementEditableProperties = tmp

    },
    beforeDestroy() {
      document.body.style.overflow = ""
    },
    methods:{
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
