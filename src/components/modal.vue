<template>
  <transition enter-active-class="animated fadeIn custom-classes-transition"
              leave-active-class="animated fadeOut custom-classes-transition">
    <div class="plekan-modal"
         v-show="layoutShow">
      <transition enter-active-class="animated fadeIn custom-classes-transition-child"
                  leave-active-class="animated  fadeOut custom-classes-transition-child">
        <div v-show="bodyShow"
             class="plekan-modal-arena-layout">
          <div class="plekan-modal-arena">
            <a class="plekan-modal-close"
               @click="makeBroadcast()"></a>
            <slot name="header"></slot>
            <slot name="body">
            </slot>
            <slot name="footer"></slot>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['show'],
  data() {
    return {
      bodyShow: false,
      layoutShow: false,
      event: null,
    };
  },
  watch: {
    show() {
      this.setShownVariable();
    },
  },
  created() {
    this.setShownVariable();
  },
  mounted() {
    this.event = new CustomEvent('requestHiddenModal');

    document.onkeydown = (e) => {
      if (e.key === 'Escape') {
        this.makeBroadcast();
      }
    };

    this.$el.onclick = (e) => {
      if (e.target.className.indexOf('plekan-modal') !== -1) {
        this.makeBroadcast();
      }
    };
  },
  methods: {
    makeBroadcast() {
      document.dispatchEvent(this.event);
    },
    setShownVariable() {
      this.layoutShow = this.show;
      this.bodyShow = this.show;
    },
  },
};

</script>
