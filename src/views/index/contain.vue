<template>
  <div style="margin-left: 10px;margin-right: 5px;padding-left: 10px;padding-right: 10px">
    <transition name="fade" mode="out-in">
<!--    <keep-alive>  style="padding: 10px; "-- >
    <!-- <router-view :key="key"></router-view> -->
    <router-view></router-view>
<!--    </keep-alive>-->
  </transition>
  </div>

</template>

<script>
    export default {
        name: "contain"
    }
</script>

<style scoped>

</style>
