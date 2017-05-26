<template>
  <section class="plekan-editor-arena">
    <div class="plekan-editor">
      <editor-list cname="dynamic-editor"
                   :list="editorButtons.stick"
                   :custom="stickyCustomButtons">
        <li class="create-link"
            slot="link">
          <input v-model="linktext"
                 placeholder="http://www.example.com">
          <button type="button"
                  @click="createLink">
            <i class="fa fa-check"></i>
          </button>
        </li>
      </editor-list>
      <editor-list cname="stable-editor"
                   :list="editorButtons.stable"
                   :custom="stableCustomButtons"></editor-list>
    </div>
    <button type="button"
            class="plekan-editable-elements-button"
            @click="openEditElement">Edit</button>
    <editelement :element="editableModalElement"
                 :shown="editableModal"></editelement>

    <color-modal :shown="showColorModal"
                 :close="toogleColorModal"></color-modal>
    <file-upload-modal v-if="$plekanEvent.onFileUpload"
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
import editorButtons from 'core/constant/editor-buttons.json';
import editorList from 'components/editorList';
import colorModal from 'components/colorModal';
import fileUploadModal from 'components/fileUploadModal';
import { hasParent, exec } from 'src/helper';
import store from 'src/store';

export default {
  props: [],
  data() {
    return {
      editableModal: false,
      showColorModal: false,
      showFileUploadModal: false,

      editableModalElement: null,
      linktext: '',

      editorButtons,

      store,
    };
  },
  components: {
    editelement,
    editorList,
    colorModal,
    fileUploadModal,
  },
  computed: {
    stableCustomButtons() {
      return this.$customEditorButtons.filter(b => b.type === 'stable');
    },
    stickyCustomButtons() {
      return this.$customEditorButtons.filter(b => b.type === 'sticky');
    },
  },
  mounted() {
    /** @type {Array} Düzenlenebilir DOM elementleri */
    const editableTag = ['IFRAME', 'IMG', 'A'];

    const editButton = document.querySelector('.plekan-editable-elements-button');
    const editButtonWidth = editButton.clientWidth;
    const editButtonHeight = editButton.clientHeight;

    let target;
    let tagname;
    let calc;
    let parents;
    let editorIsVisible;
    /** editButton pozisyonu'nu hesaplar */
    document.addEventListener('mouseover', (e) => {
      editorIsVisible =
        this.store.state.editorElementDynamic.className.indexOf('active') !== -1;

      if (editorIsVisible) return;

      target = e.target;
      tagname = target.tagName;
      calc = target.getBoundingClientRect();

      if (editableTag.indexOf(tagname) !== -1) {
        parents = hasParent(e.target, 'plekan-row-item');

        if (parents) {
          const st = document.getElementById('plekan').scrollTop;
          this.editableModalElement = target;
          editButton.style.display = 'block';
          editButton.style.visibility = 'visible';
          /* eslint-disable */
          editButton.style.top = `${calc.height / 2 + st + calc.top - editButtonHeight / 2}px`;
          editButton.style.left = `${calc.width / 2 + calc.left - editButtonWidth / 2}px`;
          /* eslint-enable */
        }
      } else if (target.parentNode !== editButton && target !== editButton) {
        editButton.style.display = 'none';
      }
    });

    //
    const editorItems = document.querySelectorAll('.plekan-editor a');

    Object.keys(editorItems).map((e) => {
      editorItems[e].addEventListener('click', (item) => {
        item.preventDefault();
        const cmd = item.target.dataset.type;
        switch (cmd) {
          case 'createLink':
            document.querySelector('.create-link').classList.add('active');
            break;
          // ------------
          // NOT: main.js'de konfigürasyonu var sonradan eklenebilir.
          // ------------
          // eslint-disable-next-line
          case 'custom':
            const customButton = this.$customEditorButtons[
              e.target.dataset.index
            ];
            customButton.callback({
              target: e.target,
              execCommand: exec,
              selection: this.store.state.selo,
              savedSelection: this.store.state.sel,
            });
            break;
          case 'color':
            this.toogleColorModal();
            break;
          case 'fileUpload':
            this.toggleFileUploadModal();
            break;
          case 'formatBlock':
            exec('formatBlock', e.target.dataset.value);
            break;
          default:
            exec(cmd);
            break;
        }
        /**
         * Selo hakkında daha fazlası için : /src/core/plekan_editor.js
         * @type {Selection Object}
         */
        this.store.state.sel = this.store.state.selo.saveSelection();
      });

      return true;
    });

    /**
     * editelement.vue tarafından tetiklenir
     * DOM element'inin değiştiğinde modal kapanır
     */
    document.addEventListener(
      'domupdated',
      () => {
        this.editableModal = false;
      },
      false,
    );

    /**
     * modal component'i kapatılmaya çalışıldığında gerekli
     * değişkiklikleri yapıp modalı kapatır
     * @todo
     *   1. Hangi modal'ın kapatıltığına göre işlem yapılması gerekir
     *   2. Modal içindeki değişikler sağlanmalı
     */
    document.addEventListener(
      'requestHiddenModal',
      () => {
        this.showColorModal = false;
        this.editableModal = false;
        this.showFileUploadModal = false;
      },
      false,
    );
  },
  methods: {
    /** Renk modal'ini açar/kapar */
    toogleColorModal() {
      this.showColorModal = !this.showColorModal;
    },
    /** Dosya modal'ini açar/kapar */
    toggleFileUploadModal() {
      this.showFileUploadModal = !this.showFileUploadModal;
    },
    /**
     * Editelement butonuna tıklandığında çalışır
     * editelemen component'ini aktif/açmak için editableModal değişkenini true yapar
     * @return {void}
     */
    openEditElement() {
      this.editableModal = true;
    },
    /**
     * Editor içinde bulunan link butonuna tıklandığında
     * editor içinde input ve buton'u aktif hale getirir
     * Bu butona tıklandığında bu fonsksiyon tetiklenir
     * @return {void}
     */
    createLink() {
      exec('createLink', this.linktext);
      this.linktext = '';
      document.querySelector('.create-link').classList.remove('active');
    },
  },
};
</script>
