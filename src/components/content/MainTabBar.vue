<template>
  <div>
    <tab-bar>
      <tab-bar-item link="/home" activeColor="red">
        <img slot="item-icon" src="../../assets/img/TabBar/home.png" alt="">
        <img slot="item-icon-active" src="../../assets/img/TabBar/home-active.png" alt="">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item link="/draggable" activeColor="red">
        <img slot="item-icon" src="../../assets/img/TabBar/profile.png" alt="">
        <img slot="item-icon-active" src="../../assets/img/TabBar/profile-active.png" alt="">
        <div slot="item-text">拖拽示例</div>
      </tab-bar-item>
      <tab-bar-item link="/profile" activeColor="red">
        <img slot="item-icon" src="../../assets/img/TabBar/profile.png" alt="">
        <img slot="item-icon-active" src="../../assets/img/TabBar/profile-active.png" alt="">
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
  import TabBar from "../../components/common/TabBar/TabBar";
  import TabBarItem from "../../components/common/TabBar/TabBarItem";

  export default {
    name: "MainTabBar",
    components: {
      TabBar,
      TabBarItem,
    }
  }
</script>

<style scoped>

</style>
