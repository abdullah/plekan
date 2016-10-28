<template>
  <ul class="animated" :class="cname">
    <li v-for="b in list" >
      <a href=""
      :data-type="b.code"
      :data-tagname="b.tagname"
      :data-value="b.value"
      :class="b.icon"
      ></a>
       <ul class="plekan-submenu" v-if="b.sub">
         <li v-for="s in b.sub">
           <a href=""  
            :data-type="s.code"
            :data-tagname="s.tagname"
            :data-value="s.value"
            :class="s.icon"
            ></a>
         </li>
      </ul>
    </li>

   <slot name="link"></slot>
  </ul>
</template>

<script>
  export default {
    props:["list","cname"],
  }
</script>