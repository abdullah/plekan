<template>
  <ul class="animated"
      :class="cname">
    <li v-for="b in buttons">
      <a href=""
         :data-type="b.code"
         :data-tagname="b.tagname"
         :data-value="b.value"
         :class="b.icon"></a>
      <ul class="plekan-submenu"
          v-if="b.sub">
        <li v-for="s in b.sub">
          <a href=""
             :data-type="s.code"
             :data-tagname="s.tagname"
             :data-value="s.value"
             :class="s.icon"></a>
        </li>
      </ul>
    </li>
    <li v-for="c in custom">
      <a href=""
         v-for="(b,key) in $customEditorButtons"
         :data-type="b.code || 'custom'"
         :data-index="key"
         :class="b.class"></a>
    </li>
    <slot name="link"></slot>
  </ul>
</template>

<script>
export default {
  props: ['list', 'cname', 'custom'],
  computed: {
    buttons() {
      return this.list;
    },
  },
};
</script>
