<template>
  <div style="margin-top: 30px;margin-left: 20px">
    <transition name="fade" mode="out-in">
<!--    <keep-alive>-->
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
