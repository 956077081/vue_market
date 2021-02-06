<template>
  <transition name="fade" mode="out-in">
    <keep-alive>
    <!-- <router-view :key="key"></router-view> -->
    <router-view></router-view>
    </keep-alive>
  </transition>
</template>

<script>
    export default {
        name: "contain"
    }
</script>

<style scoped>

</style>
