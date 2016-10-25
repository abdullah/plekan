<template>
  <section class="editor-arena">
      <div class="editor">
        <ul class="dynamic-editor animated">
          <li v-for="b in editorButtons.stick" >
            <a href=""
            :data-type="b.code"
            :data-tagname="b.tagname"
            :data-value="b.value"
            :class="b.icon"
            ></a>
          </li>
          <li class="create-link">
            <input v-model="linktext" placeholder="http://example.com">
            <button @click="createLink"><i class="fa fa-check"></i></button>
          </li>  
        </ul>
        <!-- -->
        <ul class="stable-editor animated">
           <li v-for="b in editorButtons.stable">
             <a href=""  
              :data-type="b.code"
              :data-tagname="b.tagname"
              :data-value="b.value"
              :class="b.icon"
              ></a>
               <ul class="submenu" v-if="b.sub">
                 <li v-for="s in b.sub">
                   <a href=""  
                    :data-type="s.code"
                    :data-tagname="s.tagname"
                    :data-value="s.value"
                    :class="s.icon"
                    ></a>
                 </li>
              </ul>
           </li>

            <!-- <a href="" v-for="(b,key) in $cs_editor_buttons" 
            :data-type="b.code || 'custom'"
            :data-tagname="s.tagname"
            :data-index="key"
            :class="b.class"
            ></a> -->
        </ul>
      </div>
      <!--  -->
      <button class="editable-elements-button" @click="openEditElement">Edit</button>
      <!--  -->
      <editelement 
                   :element="editableModalElement" 
                   :shown="editableModal"></editelement>    
      <!--  -->
      <modal :show="showColorModal">
        <header slot="header">
          <div class="title">Set Color</div>
        </header>
        <div slot="body" class="modal-color-body">
          <select v-model="colortype" class="form-control">
            <option value="backColor">Background Color</option>
            <option value="hiliteColor">Block Color</option>
            <option value="foreColor">Text Color</option>
          </select>
          <hr>
          <a 
          v-for="c in colors"
          @click="setColor(c)"
          v-bind:style="{ backgroundColor: c}" 
          ></a>
        </div>
        <footer slot="footer" class="plekan-clearfix">
          <button @click="showColorModal = false">Close</button>
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

  export default {
    props:[],
    data () {
      return {
        editableModal: false,
        headingModal: false,
        showColorModal: false,

        editableModalElement: null,
        linktext : "",
        colortype:"foreColor",

        editorButtons : editorButtons,
        colors : colors,
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


    },
    beforeDestroy() {

    },
    destroyed() {

    },
    methods:{
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
