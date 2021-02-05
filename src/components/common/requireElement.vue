<template>
    <div>
      <span slot="label" > <span style="color: red">*</span> &nbsp;&nbsp;&nbsp;{{this.name}}</span>
    </div>
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
