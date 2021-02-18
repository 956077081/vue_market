<style scoped>
  .head_page{
    position: relative;
    padding-top: 20px;
    font-size: medium;
  }
</style>
<template>
    <div>
      <market-search></market-search>
      <market-list style="max-height: 600px"></market-list>
      <Page class="head_page"  :total="40" size="small" show-elevator show-sizer />
    </div>
</template>

<script>
    import MarketSearch from "./marketSearch";
    import MarketList from "./marketList";
    export default {
        name: "marketManager",
      components: {MarketList, MarketSearch}
    }
</script>

<style scoped>

</style>
