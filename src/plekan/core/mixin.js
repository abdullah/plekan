
/**
 * Mixin plekan'a kayıt edilen her component için gereklidir
 * props : mixin izole olduğu için dışardan alınır
 * store eklentideki global store'dur
 * gösterlicek dil'e göre row içindeki html gösterilir 
 * yine gösterilecek dile göre update yapılır
 * 
*/


var DEFAULT_CONTENT = `<div contenteditable="true">DEFAULT</div>`
import {hasParent,childOf} from 'plekan/helper'
import globalElements from 'plekan/core/globalElements'

export default {
    props: ['store','index', 'displayLanguage'],
    data() {
        return {
            DEFAULT_CONTENT: DEFAULT_CONTENT,
            _updatable:null,
        }
    },
    computed: {
        _languages: function() {
            return this.store.state.languages
        },
        // currentLanguge: function() {
        //     return this.store.state.currentLanguge
        // },
        me: function() {
            return this.store.state.rows[this.index];
        },
        _content: function() {
            let c = this.me.contents[this.displayLanguage].html;
            return c ? c : this.DEFAULT_CONTENT
        }
    },
    mounted() {
        // Enable content editable
        var ct = this.$el.querySelectorAll("[contenteditable]");
        Object.keys(ct).map(e => {
            ct[e].contentEditable = true
        })

        /**
        * Initial html content
        */
        this._languages.map(l => {
            try {
                let html = this.me.contents[l].html;
                this.me.contents[l].html = html ? html :  this.DEFAULT_CONTENT
            } catch(e) {
                var tmp = JSON.parse(JSON.stringify(this.me))

                tmp.contents[l] = {}
                tmp.contents[l]["html"] = this.DEFAULT_CONTENT
                tmp.contents[l]["fields"] = {}

                this.store.updateRows(this.index,tmp)
            }
        });

        /**
        * Editable arena event set
        */
        this._setEditable();
        /*
        * Reletad target
        * Source : http://stackoverflow.com/questions/11544554/get-the-clicked-object-that-triggered-jquery-blur-event
        * The childOf function getting from helpers files in project.
        */
        document.addEventListener('mousedown',(e)=>{
            let target = e.target
            let isModalElement = hasParent(target,'plekan-modal') ? true : false

            this._updatable =    childOf(target,globalElements.editorElement) || 
                                isModalElement || 
                                target.className == 'editor';
        })

        document.addEventListener('mouseup',(e)=>{
            this._updatable = null;
        })


        // this.attachEvent()
        document.addEventListener('domupdated', (e) => { 
            this._updateHTML()
        },false);

       

    },
    updated() {
        this._setEditable()
        /*
        * Error an image
        *@TODO : Check image 
        */
        var els = document.querySelectorAll("img");

        Object.keys(els).map(e => {
          els[e].addEventListener('error',function () {
             els[e].src = "http://www.pressedfortimelincoln.co.uk/wp-content/uploads/2013/05/placeholder1-1024x768.png"
        },false); 

        })
        
    },
    methods: {
        _setEditable() {
            this.$el.onfocus = (evt) => {
                globalElements.editorElementStable.classList.add('active')
            }

            this.$el.onblur = (evt) => {
                if (!this._updatable) {
                    this._updateHTML()
                    globalElements.editorElementDynamic.classList.remove('active');
                    globalElements.editorElementStable.classList.remove('active')
                    // Link content 
                }
            }

        },
        _updateHTML(){
            this.me.contents[this.displayLanguage].html = this.$el.innerHTML.trim();
        }
    }
}
