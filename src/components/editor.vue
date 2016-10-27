<template>
  <section class="editor-arena">
      <div class="editor">
        <editor-list cname="dynamic-editor" :list="editorButtons.stick">
          <li class="create-link" slot="link">
            <input v-model="linktext" placeholder="http://example.com">
            <button @click="createLink"><i class="fa fa-check"></i></button>
          </li> 
        </editor-list>
        <editor-list cname="stable-editor" :list="editorButtons.stable"></editor-list>
      </div>
      <!--  -->
      <button class="editable-elements-button" @click="openEditElement">Edit</button>
      <!--  -->
      <editelement :element="editableModalElement" 
                   :shown="editableModal"></editelement>    
      <!--  -->
      <modal :show="showColorModal">
        <header slot="header">
          <div class="title">Set Color</div>
        </header>
        <div slot="body" class="modal-color-body plekan-clearfix">
          <div class="plekan-color-type plekan-clearfix">
             <select v-model="colortype" class="form-control">
                <option value="backColor">Background Color</option>
                <option value="hiliteColor">Block Color</option>
                <option value="foreColor">Text Color</option>
              </select>
              <a href="" 
                class="remove-color" 
                @click.prevent="exec('removeFormat')">
                <i class="fa fa-eraser"></i>
              </a>
          </div>
          <div class="plekan-color-pallate plekan-clearfix">
            <a 
              href="#"
              v-for="c in colors"
              @click.prevent="setColor(c)"
              v-bind:style="{ backgroundColor: c}" 
              ></a>
          </div>
        </div>
        <footer slot="footer" class="plekan-clearfix">
          <button @click="showColorModal = false">Close</button>
        </footer>
      </modal>
      <!--  -->
      <modal :show="fileUploadModal">
        <header slot="header">
          <div class="title">File Upload</div>
        </header>
        <div slot="body" class="modal-color-body plekan-clearfix">
          <file-upload 
            :fileChange="fileChange"></file-upload>
        </div>
        <footer slot="footer" class="plekan-clearfix">
          <button 
            class="plekan-footer-button" 
            @click="onFileUpload" 
            :disabled="!file">Upload</button>
        </footer>
      </modal>
      <!--  -->
  </section>
</template>

<script>
  import editelement from 'components/editelement';
  import editorButtons from 'core/constant/editor-buttons.json'
  import colors from 'core/constant/colors.json'
  import modal from 'components/modal'
  import fileUpload from 'components/fileUpload'
  import editorList from 'components/editorList'

  export default {
    props:[],
    data () {
      return {
        editableModal: false,
        headingModal: false,
        showColorModal: false,
        fileUploadModal: false,

        editableModalElement: null,
        linktext : "",
        colortype:"foreColor",

        editorButtons : editorButtons,
        colors : colors,
        file : null,
      }
    },
    components: {
      editelement,
      modal,
      fileUpload,
      editorList
    },
    mounted() {
        var editableTag = [
          "IFRAME","IMG","A"
        ]
        
        let editButton        = document.querySelector('.editable-elements-button');
        let editButtonWidth   = editButton.clientWidth
        let editButtonHeight  = editButton.clientHeight

        let target,tagname,calc,parents,editorIsVisible;
        document.addEventListener('mouseover',e => {

          editorIsVisible = editorElementDynamic.className.indexOf('active') != -1

          if (editorIsVisible) return

          target  = e.target;
          tagname = target.tagName;
          calc    = target.getBoundingClientRect();

          if (editableTag.indexOf(tagname) != -1) {
            parents = hasParent(e.target,'plekan-row-item')

            if (parents) {
              var st = document.getElementById('_plekan').scrollTop
              this.editableModalElement = target
              editButton.style.display = "block"
              editButton.style.visibility = "visible"
              editButton.style.top = `${(calc.height/2) + st + calc.top - (editButtonHeight/2)}px`
              editButton.style.left = `${(calc.width/2) + calc.left - (editButtonWidth/2)}px`
            }

          }else{
            if (target.parentNode != editButton  && target != editButton) {
              editButton.style.display = "none"
            }
          }
        })

        // --------------------------------------------------------
        var editorItem = document.querySelectorAll('.editor a')
        Object.keys(editorItem).map(e => {
          editorItem[e].addEventListener('click', (e) => {
            

            // Restore selection
            e.preventDefault()
            // selo.restoreSelection(sel)
            /*
            *@TODO control commad type
            */
            let cmd = e.target.dataset.type;


            // if (cmd == 'createLink') {
            // }else{
            // }

            switch (cmd) {
              case 'createLink':
                document.querySelector('.create-link').classList.add('active')
                break;

              // ------------
              // NOT: main.js'de konfigürasyonu var sonradan eklenebilir.
              // ------------
              // case 'custom':
              //   var customButton = this.$cs_editor_buttons[e.target.dataset.index];
              //   customButton.callback({
              //     target : e.target,
              //     exec : this.exec.bind(this),
              //     selo : selo ,
              //     sel : sel
              //   })
              // break;
              case 'color':
                this.showColorModal = true
              break;
              case 'fileUpload':
                this.fileUploadModal = true
              break;
              case 'formatBlock':
                // this.boSelection.restoreSelection(this.savedSel); // restore the selection
                // document.execCommand('formatBlock', false, `<${type}>`);
                this.exec('formatBlock',e.target.dataset.value)
              default:
                // statements_def
                this.exec(cmd)
                break;
            }

            // Save selection
            sel = selo.saveSelection()


          })
        })

        // ----------
        document.addEventListener('domupdated', (e) => { 
            this.editableModal = false
        },false); 

        document.addEventListener('requestHiddenModal', (e) => { 
            this.showColorModal = false
            this.editableModal = false
            this.fileUploadModal = false
        },false);

    },
    beforeDestroy() {

    },
    destroyed() {

    },
    methods:{
      fileChange(file){
        this.file = file 
      },
      onFileUpload(){
        /*
        @TODO : Pass file
        */
        this.$onFileUpload(this.file, (url) => {

          this.exec('insertHTML', 
          `<a href="${url.src}" target="_blank">${url.title || url.src}</a>` );

          this.fileUploadModal = false
        })

      },
      setColor(color){
        this.exec(this.colortype,color)
      },
      openEditElement(){
        this.editableModal = true
      },
      createLink(){
        // @TODO : text to link 
        this.exec('createLink',this.linktext)
        this.linktext = ""
        document.querySelector('.create-link').classList.remove('active')
      },
      exec(cmd,val = false) {
        selo.restoreSelection(sel)
        document.execCommand(cmd,false,val)
        setActiveEditorButtons()
      }
      
    }
  }
</script>

<style>
  
</style>
