<template>
  <transition
    enter-active-class="animated fadeIn custom-classes-transition"
    leave-active-class="animated fadeOut custom-classes-transition">
      <div class="plekan-modal" v-show="layoutShow">
        <transition
            enter-active-class="animated fadeInLeftCC custom-classes-transition-child"
            leave-active-class="animated  fadeOutLeftCC custom-classes-transition-child">
                  <div v-show="bodyShow" class="modal-arena-layout">
                    <div class="modal-arena">
                         <slot name="header"></slot>
                         <slot name="body"></slot>
                         <slot name="footer"></slot>
                    </div>
                  </div>
          </transition>
      </div>
  </transition>
</template>

<script>
  export default {
    props:["element","show"],
    data () {
      return {
        bodyShow:false,
        layoutShow: false
      }
    },
    updated(){
      this.setShownVariable()
    },
    created(){
      this.setShownVariable()
    },
    methods:{
      setShownVariable(){
        this.layoutShow = this.show;
        this.bodyShow = this.show
      }
    }
  }
</script>

<style>
  
</style>
