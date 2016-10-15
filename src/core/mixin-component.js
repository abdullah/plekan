import store from 'store'

var DEFAULT_CONTENT = `<div contenteditable="true">DEFAULT</div>`

export default {
    props: ['index', 'displayLanguage'],
    data() {
        return {
            store: store,
            DEFAULT_CONTENT: DEFAULT_CONTENT,
            activeEditor:false,
            updatable:null,
        }
    },
    computed: {
        languages: function() {
            return this.store.state.languages
        },
        currentLanguge: function() {
            return this.store.state.currentLanguge
        },
        me: function() {
            return this.store.state.rows[this.index];
        },
        content: function() {
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
        this.languages.map(l => {
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
        this.setEditable();
        /*
        * Reletad target
        * Source : http://stackoverflow.com/questions/11544554/get-the-clicked-object-that-triggered-jquery-blur-event
        * The childOf function getting from helpers files in project.
        */
        document.addEventListener('mousedown',(e)=>{
            let target = e.target
            this.updatable =    childOf(target,window.editorElement) || 
                                target.className == 'editor';
        })

        document.addEventListener('mouseup',(e)=>{
            this.updatable = null;
        })


        // this.attachEvent()
        document.addEventListener('domupdated', (e) => { 
            this.updateHTML()
        },false);


    },
    updated() {
        this.setEditable()
    },
    methods: {
        setEditable() {
            let els = this.$el.querySelectorAll("[contenteditable='true']");
            Object.keys(els).map(index =>  {
                els[index].onblur = (evt) => {
                    if (!this.updatable) {
                        this.updateHTML()
                        window.editorElement.classList.remove('active');
                    }
                }
            })

        },
        updateHTML(){
            this.me.contents[this.displayLanguage].html = this.$el.innerHTML.trim();
        }
    }
}
