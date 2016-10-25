
var DEFAULT_CONTENT = `<div contenteditable="true">DEFAULT</div>`

export default {
    props: ['store','index', 'displayLanguage'],
    data() {
        return {
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
                                childOf(target,document.querySelector('.plekan-modal')) || 
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
        setEditable() {
            this.$el.onfocus = (evt) => {
                window.editorElementStable.classList.add('active')
            }

            this.$el.onblur = (evt) => {
                if (!this.updatable) {
                    this.updateHTML()
                    window.editorElementDynamic.classList.remove('active');
                    window.editorElementStable.classList.remove('active')
                    // Link content 
                }
            }

        },
        updateHTML(){
            this.me.contents[this.displayLanguage].html = this.$el.innerHTML.trim();
        }
    }
}
