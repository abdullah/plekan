<template>
  <div class="_plekan_arena">
    
 
    <change-language></change-language>
  

    <div :class="{'translate-mode' : translateMode}" class="plekan-container">
     
      <arena-column 
        :rows="rows"
        :editAsHTMLRow="editAsHTMLRow"
        :language="currentLanguge">
      </arena-column>

      <arena-column 
        v-show="translateMode" 
        :rows="rows"
        :editAsHTMLRow="editAsHTMLRow" 
        :language="translateLanguage">
      </arena-column>

     <modal :show="editRow.row ? true : false" class="edit-modal">
      <header slot="header">
        <div class="title">Edit As Html</div>
      </header>
      <div slot="body" class="plekan-edit-as-html-modal-body">
        <textarea 
          v-model="editRow.html">
        </textarea>
      </div>
      <footer slot="footer" class="plekan-clearfix">
        <button @click.prevent="saveEditAsHtml">Save HTML</button>
      </footer>
    </modal>

    </div>

    <div class="plekan-container">
      <button v-for="b in $plekan_buttons" 
              :class="b.class" 
              @click="b.callback(store.state.rows)">
              {{b.text}}
      </button>
    </div>

  </div>
</template>

<script>
  import store from 'store'
  import modal from 'components/modal'
  import Sortable from 'sortablejs'
  import {arenaSortableOptions} from 'core/sortable_options'
  import changeLanguage from 'components/changeLanguage'
  import arenaColumn from 'components/arenaColumn'

  export default {
    props:[],
    data () {
      return {
        store : store,
        editRow : {
          lang: null,
          html: null,
          index: null,
          row: null,
        }
      }
    },
    components: {
      modal,changeLanguage,arenaColumn
    },
    computed: {
      translateMode: function () {
        return this.store.state.translateMode;
      },
      rows : function () {
        return this.store.state.rows
      },
      currentLanguge: function () {
        return this.store.state.currentLanguge
      },
      translateLanguage: function () {
        return this.store.state.translateLanguage
      },
      list : function () {
        return this.store.state.moduleList
      }
    },
    mounted(){
      /*
      * Sortable options init
      */
      let el = document.getElementById("plekan_sortable_list");

      Sortable.create(el,{
        ...arenaSortableOptions,
        onAdd:this.onAdd,
        onEnd:this.onEnd,
      });

    },
    methods:{
     
      editAsHTMLRow(row,index,language){

        this.editRow.row = JSON.parse(JSON.stringify(row))
        this.editRow.lang = language
        this.editRow.index = index
        this.editRow.html = this.editRow.row.contents[this.store.state.currentLanguge].html
        
      },
      saveEditAsHtml(){

        this.editRow.row.contents[this.store.state.currentLanguge].html = this.editRow.html
        this.store.updateRows(this.editRow.index,this.editRow.row)
       
        Object.keys(this.editRow).map(e => this.editRow[e] = null)
        
      },
      // When drop module from list trigger
      onAdd(evt){
        evt.item.remove();
      },
      onEnd(evt){
          // this.rows.move(evt.newIndex,evt.oldIndex)
          this.store.sortRows(evt.newIndex,evt.oldIndex)
      }
    }
  }
</script>
