<template>
  <!-- <div id="app"> -->
  <!--   <router-view></router-view> -->
  <!--   <main-tab-bar></main-tab-bar> -->
  <!-- </div> -->
  <div id="app">
    <layout></layout>
  </div>
</template>

<script>
  // import MainTabBar from "./components/content/MainTabBar";
  import Layout from "./components/common/Layout/Layout";

  export default {
    name: 'App',
    data() {
      return {}
    },
    components: {
      // MainTabBar,
      Layout,
    },
    methods: {}
  }
</script>

<style>
  @import "./assets/css/base.css";
</style>
