/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */

/**
 * Mixin plekan'a kayıt edilen her component için gereklidir
 * props : mixin izole olduğu için dışardan alınır
 * store eklentideki global store'dur
 * gösterlicek dil'e göre row içindeki html gösterilir
 * yine gösterilecek dile göre update yapılır
 *
*/


import { hasParent, childOf } from 'src/helper';

const DEFAULT_CONTENT = '<div contenteditable="true">DEFAULT</div>';

export default {
  props: ['store', 'index', 'displayLanguage'],
  data() {
    return {
      DEFAULT_CONTENT,
      _updatable: null,
    };
  },
  computed: {
    _languages() {
      return this.store.state.languages;
    },
    // currentLanguge: function() {
    //     return this.store.state.currentLanguge
    // },
    me() {
      return this.store.state.rows[this.index];
    },
    _content() {
      const c = this.me.contents[this.displayLanguage].html;
      return c || this.DEFAULT_CONTENT;
    },
  },
  mounted() {
    // Enable content editable
    const ct = this.$el.querySelectorAll('[contenteditable]');
    Object.keys(ct).map((e) => {
      ct[e].contentEditable = true;
      return true;
    });

    /**
    * Initial html content
    */
    this._languages.map((l) => {
      try {
        const html = this.me.contents[l].html;
        this.me.contents[l].html = html || this.DEFAULT_CONTENT;
      } catch (e) {
        const tmp = JSON.parse(JSON.stringify(this.me));

        tmp.contents[l] = {};
        tmp.contents[l].html = this.DEFAULT_CONTENT;
        tmp.contents[l].fields = {};

        this.store.updateRows(this.index, tmp);
      }
      return true;
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
    document.addEventListener('mousedown', (e) => {
      const target = e.target;
      const isModalElement = !!hasParent(target, 'plekan-modal');

      this._updatable =
        childOf(target, this.store.state.editorElement) ||
        isModalElement ||
        target.className === 'editor';
    });

    document.addEventListener('mouseup', () => {
      this._updatable = null;
    });

    // this.attachEvent()
    document.addEventListener(
      'domupdated',
      () => {
        this._updateHTML();
      },
      false,
    );
  },
  updated() {
    this._setEditable();
    /*
        * Error an image
        *@TODO : Check image
        */
    // var els = document.querySelectorAll("img");

    // Object.keys(els).map(e => {
    //     els[e].addEventListener('error',function () {
    //         els[e].src = "http://www.pressedfortimelincoln.co.uk/wp-content/uploads/2013/05/placeholder1-1024x768.png"
    //     },false);
    // })
  },
  methods: {
    _setEditable() {
      this.$el.onfocus = () => {
        this.store.state.editorElementStable.classList.add('active');
      };

      this.$el.onblur = () => {
        if (!this._updatable) {
          this._updateHTML();
          this.store.state.editorElementDynamic.classList.remove('active');
          this.store.state.editorElementStable.classList.remove('active');
          // Link content
        }
      };
    },
    _updateHTML() {
      this.me.contents[this.displayLanguage].html = this.$el.innerHTML.trim();
    },
  },
};
