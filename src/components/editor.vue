<template>
  <section class="plekan-editor-arena">
      <div class="plekan-editor">
        <editor-list cname="dynamic-editor" :list="editorButtons.stick" :custom="stickyCustomButtons">
          <li class="create-link" slot="link">
            <input v-model="linktext" placeholder="http://www.example.com">
            <button @click="createLink"><i class="fa fa-check"></i></button>
          </li> 
        </editor-list>
        <editor-list cname="stable-editor" :list="editorButtons.stable" :custom="stableCustomButtons"></editor-list>
      </div>
      <!--  -->
      <button class="plekan-editable-elements-button" @click="openEditElement">Edit</button>
      <!--  -->
      <editelement :element="editableModalElement" 
                   :shown="editableModal"></editelement>
      
      <color-modal :shown="showColorModal" :close="toogleColorModal"></color-modal>    
      <!--  -->
      <file-upload-modal 
      v-if="$plekanEvent.onFileUpload" 
      :shown="showFileUploadModal" 
      :close="toggleFileUploadModal">
      </file-upload-modal>
  </section>
</template>

<script>
  /**
   * Bu component düzenlenebilir DOM elemenaları,
   * Zengin editor: kalın yazı,link, vb component'leri içerir
   *
   * editor-list componet'i editor butonlarını listeler
   * 
   */
  import editelement from 'components/editelement';
  import editorButtons from 'core/constant/editor-buttons.json'
  import editorList from 'components/editorList'
  import colorModal from 'components/colorModal.vue'
  import fileUploadModal from 'components/fileUploadModal.vue'

  export default {
    props:[],
    data () {
      return {
        editableModal: false,
        showColorModal: false,
        showFileUploadModal: false,

        editableModalElement: null,
        linktext : "",

        editorButtons : editorButtons,
      }
    },
    components: {
      editelement,editorList,colorModal,fileUploadModal
    },
    computed: {
        stableCustomButtons:function () {
          return this.$customEditorButtons.filter(b => b.type == 'stable')
        },
        stickyCustomButtons:function () {
          return this.$customEditorButtons.filter(b => b.type == 'sticky')
        }
    },
    mounted() {
        /** @type {Array} Düzenlenebilir DOM elementleri */
        var editableTag = [
          "IFRAME","IMG","A"
        ]
        
        let editButton        = document.querySelector('.plekan-editable-elements-button');
        let editButtonWidth   = editButton.clientWidth
        let editButtonHeight  = editButton.clientHeight

        let target,tagname,calc,parents,editorIsVisible;
        /** editButton pozisyonu'nu hesaplar */
        document.addEventListener('mouseover',e => {

          editorIsVisible = editorElementDynamic.className.indexOf('active') != -1

          if (editorIsVisible) return;

          target  = e.target;
          tagname = target.tagName;
          calc    = target.getBoundingClientRect();

          if (editableTag.indexOf(tagname) != -1) {
            parents = hasParent(e.target,'plekan-row-item')

            if (parents) {
              var st = document.getElementById('plekan').scrollTop
              this.editableModalElement   = target
              editButton.style.display    = "block"
              editButton.style.visibility = "visible"
              editButton.style.top        = `${(calc.height/2) + st + calc.top - (editButtonHeight/2)}px`
              editButton.style.left       = `${(calc.width/2) + calc.left - (editButtonWidth/2)}px`
            }

          }else{
            if (target.parentNode != editButton  && target != editButton) {
              editButton.style.display = "none"
            }
          }
        })

        // 
        var editorItems = document.querySelectorAll('.plekan-editor a')

        Object.keys(editorItems).map(e => {
          editorItems[e].addEventListener('click', (e) => {
            e.preventDefault()

            let cmd = e.target.dataset.type;

            switch (cmd) {
              case 'createLink':
                document.querySelector('.create-link').classList.add('active')
                break;
              // ------------
              // NOT: main.js'de konfigürasyonu var sonradan eklenebilir.
              // ------------
              case 'custom':
                var customButton = this.$customEditorButtons[e.target.dataset.index];
                customButton.callback({
                  target : e.target,
                  execCommand : window.exec,
                  selection : selo ,
                  savedSelection : sel
                })
              break;
              // 
              // 
              case 'color':
                this.toogleColorModal()
              break;
              case 'fileUpload':
                this.toggleFileUploadModal()
              break;
              case 'formatBlock':
                window.exec('formatBlock',e.target.dataset.value)
              default:
                window.exec(cmd)
              break;
            }
            /**  
             * Selo hakkında daha fazlası için : /src/core/plekan_editor.js
             * @type {Selection Object}
             */
            sel = selo.saveSelection()
          })
        })

        /**
         * editelement.vue tarafından tetiklenir
         * DOM element'inin değiştiğinde modal kapanır
         */
        document.addEventListener('domupdated', (e) => { 
            this.editableModal = false
        },false); 

        /**
         * modal component'i kapatılmaya çalışıldığında gerekli
         * değişkiklikleri yapıp modalı kapatır
         * @todo 
         *   1. Hangi modal'ın kapatıltığına göre işlem yapılması gerekir
         *   2. Modal içindeki değişikler sağlanmalı  
         */
        document.addEventListener('requestHiddenModal', (e) => { 
            this.showColorModal    = false
            this.editableModal    = false
            this.showFileUploadModal  = false
        },false);
    },
    methods:{
      /** Renk modal'ini açar/kapar */
      toogleColorModal(){
        this.showColorModal = !this.showColorModal
      },
      /** Dosya modal'ini açar/kapar */
      toggleFileUploadModal(){
        this.showFileUploadModal = !this.showFileUploadModal
      },
      /**
       * Editelement butonuna tıklandığında çalışır
       * editelemen component'ini aktif/açmak için editableModal değişkenini true yapar   
       * @return {void}
       */
      openEditElement(){
        this.editableModal = true
      },
      /**
       * Editor içinde bulunan link butonuna tıklandığında editor içinde input ve buton'u aktif hale getirir
       * Bu butona tıklandığında bu fonsksiyon tetiklenir
       * @return {void} 
       */
      createLink(){
        window.exec('createLink',this.linktext)
        this.linktext = ""
        document.querySelector('.create-link').classList.remove('active')
      }
    }
  }
</script>

<style>
  
</style>
