<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-if="isActive">
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="textStyle()">
      <slot name="item-text">
        <div slot="item-text">自定义</div>
      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      link: {
        type: String,
        default: '-1',
        required: false,
      },
      activeColor: {
        type: String,
        default: 'red',
        required: false,
      }
    },
    data() {
      return {}
    },
    computed: {
      isActive() {
        return this.$route.path.includes(this.link);
      }
    },
    methods: {
      itemClick() {
        if (!this.$route.path.includes(this.link)) {
          this.$router.push(this.link);
        }
      },
      textStyle() {
        let style = {};
        if (this.isActive) {
          style.color = this.activeColor;
        }
        return style;
      },
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: auto;
    text-align: center;
    height: 49px; /*主流APP端tab-bar的高度一般为49px*/
    font-size: 14px;
  }

  .tab-bar-item img {
    width: 20px;
    height: 20px;
    margin-top: 3px;
    vertical-align: middle; /*去除图片底部留白的空间*/
  }

</style>
