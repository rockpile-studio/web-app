<template>
  <div>
    <!-- 整体布局：页面顶部导航 -->
    <div class="app-head">
      <div class="app-head-inner">
        <img src="@/assets/img/logo.png">
        <!-- 顶部导航-右侧 -->
        <div class="head-nav">
          <ul class="nav-list">
            <li>{{ username }}</li>
            <li>注册</li>
            <li class="nav-pile">|</li>
            <li>关于</li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 整体布局：页面内容 -->
    <div class="app-content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <!-- 整体布局：页面底部 -->
    <div class="app-foot">
      <p>©2020 web-app by rockpile studio</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        username: 'Rockpile',
      }
    },
  }
</script>

<style scoped>
  .app-head {
    background: #363636;
    color: #b2b2b2;
    height: 90px;
    line-height: 90px;
    width: 100%;
  }

  .app-head-inner {
    width: 1200px;
    margin: 0 auto;
  }

  .app-head-inner img {
    width: 50px;
    margin-top: 20px;
  }

  .head-nav {
    float: right;
  }

  .head-nav ul {
    overflow: hidden;
  }

  .head-nav li {
    cursor: pointer;
    float: left;
  }

  .nav-pile {
    padding: 0 10px;
  }

  .app-foot {
    text-align: center;
    height: 40px;
    width: 100%;
    line-height: 40px;
    background: #e3e4e8;
    clear: both;
    margin-top: 30px;
  }
</style>
