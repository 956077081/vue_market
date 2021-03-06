<template>
  <div id="app">
    <router-view v-if="routeAlive" ></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      routeAlive:true
    }
  },
  provide(){
    return {
      reload:this.reload
    }
  },
  methods:{
    reload(){
      this.routeAlive =false;
      this.$nextTick(function () {
        this.routeAlive =true;
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
