<template>
  <section class="editor-arena">
      <div class="editor">
        <div class="dynamic-editor animated">
          <a href="" v-for="b in editorButtons.stick" 
          :data-type="b.code"
          :class="b.icon"
          ></a>
          <div class="create-link">
            <input v-model="linktext" placeholder="http://example.com">
            <button @click="createLink"><i class="fa fa-check"></i></button>
          </div>  
        </div>
        <!-- -->
        <div class="stable-editor animated">
           <a href="" v-for="b in editorButtons.stable" 
            :data-type="b.code"
            :class="b.icon"
            ></a>
        </div>
      </div>
      <!--  -->
      <button class="editable-elements-button" @click="openEditElement">Edit</button>
      <!--  -->
      <transition
        enter-active-class="animated fadeInUp custom-classes-transition"
        leave-active-class="animated fadeOutDown custom-classes-transition">
          <editelement v-if="editableModal" :element="editableModalElement"></editelement>    
      </transition>
      <!--  -->
      <transition
        enter-active-class="animated fadeInUp custom-classes-transition"
        leave-active-class="animated fadeOutDown custom-classes-transition">
         <modal v-if="headingModal" class="edit-modal">
          <header slot="header">
            <!-- <div class="title">Edit As Html</div> -->
          </header>
          <div slot="body" class="plekan-edit-as-html-modal-body">
            <!-- <textarea v-model="editableRow.contents[editableRowLanguage].html"></textarea> -->
          </div>
          <footer slot="footer" class="plekan-clearfix">
            <!-- <button @click.prevent="saveEditAsHtml">Save HTML</button> -->
          </footer>
        </modal>
      </transition>
  </section>
</template>

<script>
  import editelement from 'components/editelement';
  import editorButtons from 'core/constant/editor-buttons.json'
  import modal from 'components/modal'

  export default {
    props:[],
    data () {
      return {
        editableModal: false,
        headingModal: false,

        editableModalElement: null,
        linktext : "",
        editorButtons : editorButtons,
      }
    },
    components: {
      editelement,
      modal
    },
    mounted() {
        var editableTag = [
          "IFRAME","IMG","A"
        ]
        

        let editButton        = document.querySelector('.editable-elements-button');
        let editButtonWidth   = editButton.clientWidth
        let editButtonHeight  = editButton.clientHeight

        let target,tagname,calc,parents;
        document.addEventListener('mouseover',e => {
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
              case 'formatBlock':
                // this.boSelection.restoreSelection(this.savedSel); // restore the selection
                // document.execCommand('formatBlock', false, `<${type}>`);
                this.headingModal = true

                // this.exec('formatBlock',`<H1>`)
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


    },
    beforeDestroy() {

    },
    destroyed() {

    },
    methods:{
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
      }
      
    }
  }
</script>

<style>
  
</style>
