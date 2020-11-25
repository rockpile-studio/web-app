<template>
  <div>
    <h3>首页</h3>
    <div>{{baseUrl}}</div>
  </div>
</template>

<script>
  export default {
    name: "Home",
    computed: {
      baseUrl() {
        return process.env;
      }
    }
  }
</script>

<style scoped>

</style>
