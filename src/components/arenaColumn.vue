<template>
 <div class="translate-mode-column">
    <div :class="{empty: !rows.length}" 
        class="plekan-row-list" id="plekan_sortable_list">
      <div class="plekan-row-item" v-for="(r,key) in rows" :key="r.index">
        <div class="plekan-tools">
          <span class="plekan-move-row"><i class="fa fa-hand-grab-o"></i></span>
          <span @click="editAsHTMLRow(r,key,language)"><i class="fa fa-html5"></i></span>
          <span @click="deleteRow(r,key)"><i class="fa fa-remove"></i></span>
          <span @click="dublicateRow(r,key)"><i class="fa fa-copy"></i></span>
        </div>
        <component  
                    :is="r.name" 
                    :index="key"
                    :store="store" 
                    :displayLanguage="language">
        </component>
      </div>
    </div>
  </div> 
</template>

<script>
  import store from 'store'

  export default {
    props:["rows","language","editAsHTMLRow"],
    data () {
      return {
        store: store
      }
    },
    methods:{
      deleteRow(row,index){
        this.store.deleteRow(row,index)
      },
      dublicateRow(row,index){
        this.store.dublicateRow(row,index)
      },
    }
  }
</script>

<style>
  
</style>
