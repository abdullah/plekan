<template>
  <section class="editor-arena">
      <div class="editor">
        <a href="" data-type="bold" class="fa fa-bold"></a>
        <a href="" data-type="italic" class="fa fa-italic"></a>
        <a href="" data-type="justifyLeft" class="fa fa-align-left"></a>
        <a href="" data-type="justifyCenter" class="fa fa-align-center"></a>
        <a href="" data-type="justifyRight" class="fa fa-align-right"></a>
        <a href="" data-type="createLink" class="fa fa-link"></a>
        <a href="" data-type="insertOrderedList" class="fa fa-list-ol"></a>
        <a href="" data-type="insertUnorderedList" class="fa fa-list-ul"></a>
        <div class="create-link" v-show="createLinkShow">
          <input v-model="linktext" placeholder="http://example.com">
          <button @click="createLink"><i class="fa fa-check"></i></button>
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
  </section>
</template>

<script>
  import editelement from 'components/editelement';

  export default {
    props:[],
    data () {
      return {
        editableModal: false,
        editableModalElement: null,

        createLinkShow: false,
        linktext : ""
      }
    },
    components: {
      editelement
    },
    mounted() {
        var editableTag = [
          "IFRAME","IMG","A"
        ]
        

        let editButton        = document.querySelector('.editable-elements-button');
        let editButtonWidth   = editButton.clientWidth
        let editButtonHeight  = editButton.clientHeight

        let target,tagname,calc,parents;

        document.addEventListener('mousemove',e => {
          target  = e.target;
          tagname = target.tagName;
          calc    = target.getBoundingClientRect();

          if (editableTag.indexOf(tagname) != -1) {
            
            parents = hasParent(e.target,'plekan-row-item')

            if (parents) {
              var st = document.getElementById('_plekan').scrollTop
              console.log(window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop )
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

            if (cmd == 'createLink') {
              document.querySelector('.create-link').classList.add('active')
              this.createLinkShow = true
            }else{
              this.exec(cmd)
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
        this.createLinkShow = false
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
