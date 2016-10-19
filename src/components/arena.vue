<template>
  <div class="_plekan_arena">
    
    <div class="plekan-change-language plekan-clearfix">
      <div class="plekan-container">
        <div class="plekan-pull-left">
          <span>Preview Language</span>
          <select  v-model="store.state.currentLanguge">
            <option v-for="l in languages" :value="l">{{l}}</option>
          </select>
        </div>
        <div class="open-translate-arena">
          <button @click="openTranslateMode"><i class="fa fa-language"></i></button>
        </div>
        <div class="plekan-pull-right" v-show="translateMode">
          <span>Translate Language</span>
          <select  v-model="store.state.translateLanguage">
            <option v-for="l in languages" :value="l">{{l}}</option>
          </select>
          
        </div>
      </div> 
    </div> 

    <div :class="{'translate-mode' : translateMode}" class="plekan-container">
        <div class="translate-mode-column">
          <div :class="{empty: !rows.length}" 
              class="plekan-row-list" id="plekan_sortable_list">
            <div class="plekan-row-item" v-for="(r,key) in rows" :key="r.index">
              <div class="plekan-tools">
                <span class="plekan-move-row"><i class="fa fa-hand-grab-o"></i></span>
                <span @click="editAsHTMLRow(r,key,currentLanguge)"><i class="fa fa-html5"></i></span>
                <span @click="deleteRow(r,key)"><i class="fa fa-remove"></i></span>
                <span @click="dublicateRow(r,key)"><i class="fa fa-copy"></i></span>
              </div>
              <component  
                          :is="r.name" 
                          :index="key"
                          :store="store" 
                          :displayLanguage="currentLanguge">
              </component>
            </div>
          </div>
        </div> 
        <div class="translate-mode-column" v-if="translateMode">
          <div :class="{'empty translate': !rows.length}" 
              class="plekan-row-list" id="plekan_sortable_list">
            <div class="plekan-row-item" v-for="(r,key) in rows" :key="r.index">
              <div class="plekan-tools">
                <span @click="editAsHTMLRow(r,key,translateLanguage)"><i class="fa fa-html5"></i></span>
              </div>
              <component  
                          :is="r.name" 
                          :index="key"
                          :store="store" 
                          :displayLanguage="translateLanguage">
              </component>
            </div>
          </div>
        </div> 
     <transition
        enter-active-class="animated fadeInUp custom-classes-transition"
        leave-active-class="animated fadeOutDown custom-classes-transition">
         <modal v-if="editableRow" class="edit-modal">
          <header slot="header">
            <div class="title">Edit As Html</div>
          </header>
          <div slot="body" class="plekan-edit-as-html-modal-body">
            <textarea v-model="editableRow.contents[editableRowLanguage].html"></textarea>
          </div>
          <footer slot="footer" class="plekan-clearfix">
            <button @click.prevent="saveEditAsHtml">Save HTML</button>
          </footer>
        </modal>
      </transition>
    </div>

    <div class="plekan-container">
      <hr>
      <!-- <button class="plekan-save" @click="saveRows">Save</button> -->
      <button v-for="b in $plekan_buttons" 
              :class="b.class" 
              @click="b.callback(store.state.rows)">
              {{b.text}}
      </button>
      <!-- <pre>
        {{store.state.rows}}
      </pre> -->
    </div>
  </div>
</template>

<script>
  import store from 'store'
  import modal from 'components/modal'
  import Sortable from 'sortablejs'
  import {arenaSortableOptions} from 'core/sortable_options'

  export default {
    props:[],
    data () {
      return {
        store : store,
        
        editableRow : null,
        editableRowLanguage : null,

        translateMode: false,
      }
    },
    components: {
      modal
    },
    computed: {
      rows : function () {
        return this.store.state.rows
      },
      languages : function () {
        return this.store.state.languages
      },
      currentLanguge: function () {
        return this.store.state.currentLanguge
      },
      translateLanguage: function () {
        return this.store.state.translateLanguage
      },
      list : function () {
        return this.store.state.moduleList
      },
      editrow : function () {
        if (this.editableRow) {
          return this.editableRow.contents[this.store.state.currentLanguge].html
        }else{
          return "text"
        }
      }
    },
    created(){
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
      openTranslateMode(){
        this.translateMode = !this.translateMode;
      },
      // --
      editAsHTMLRow(row,index,language){
        /**
        *@TODO Open modal then bind data.
        **/
        this.editableRow = JSON.parse(JSON.stringify(row))
        this.editableRowLanguage = language
        this.editableRowIndex = index
      },
      saveEditAsHtml(){
        this.store.updateRows(this.editableRowIndex,this.editableRow)
        this.editableRow = null
      },
      deleteRow(row,index){
        this.store.deleteRow(row,index)
      },
      dublicateRow(row,index){
        this.store.dublicateRow(row,index)
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
