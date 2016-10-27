<template>
  <ul class="animated" :class="cname">
    <li v-for="b in list" >
      <a href=""
      :data-type="b.code"
      :data-tagname="b.tagname"
      :data-value="b.value"
      :class="b.icon"
      ></a>
    </li>
   <slot name="link"></slot>
  </ul>
</template>

<script>
  export default {
    props:["list","cname"],
  }
</script>