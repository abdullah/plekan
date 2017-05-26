<template>
  <modal :show="shown">
    <header slot="header">
      <div class="plekan-modal-title">Set Color</div>
    </header>
    <div slot="body"
         class="plekan-modal-color-body plekan-clearfix">
      <div class="plekan-color-type plekan-clearfix">
        <select v-model="colortype"
                class="plekan-form-control">
          <option value="backColor">Background Color</option>
          <option value="hiliteColor">Block Color</option>
          <option value="foreColor">Text Color</option>
        </select>
        <a href="#"
           class="plekan-remove-color"
           @click.prevent="exec('removeFormat')">
          <i class="fa fa-eraser"></i>
        </a>
      </div>
      <div class="plekan-color-pallate plekan-clearfix">
        <a href="#"
           v-for="c in colors"
           @click.prevent="setColor(c)"
           v-bind:style="{ backgroundColor: c}"></a>
      </div>
    </div>
    <footer slot="footer"
            class="plekan-clearfix">
      <button type="button"
              @click="close">Close</button>
    </footer>
  </modal>
</template>

<script>
import colors from 'src/core/constant/colors.json';
import modal from 'components/modal';
import { exec } from 'src/helper';

export default {
  props: ['shown', 'close'],
  data() {
    return {
      colors,
      colortype: 'foreColor',
    };
  },
  updated() {},
  components: {
    modal,
  },
  methods: {
    /**
    * Color Modal'dan seçilen rengi ve tipi işlemini gerçekleştiri
    * @param {String} color Renk tipi Hex biçimindedir
    */
    setColor(color) {
      exec(this.colortype, color);
    },
  },
};
</script>
