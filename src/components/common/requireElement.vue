<template>
      <span slot="label" > <span style="color: red">*</span> &nbsp;&nbsp;&nbsp;{{this.name}}</span>
</template>

<script>
    export default {
        name: "requireElement",
      props:{
          name:String
      }
    }
</script>

<style scoped>

</style>
