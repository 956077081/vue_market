<style scoped>
  .head_page{
    position: relative;
    padding-top: 20px;
    font-size: medium;
  }
</style>
<template>
  <div>
    <cust-search></cust-search>
    <cust-list></cust-list>
    <Page class="head_page"  :total="40" size="small" show-elevator show-sizer />

  </div>
</template>

<script>
  import CustSearch from "./custSearch";
  import CustList from "./custList";

  export default {
    name: "custManager",
    components: {CustList, CustSearch},
    methods:{
      update(){
        this.$emit('updatePage','custDetails')
      }
    }
  }
</script>

<style scoped>

</style>
