<template>
  <div :style="nodeContainerStyle"
       @click="clickNode"
       @mouseup="changedNodeSite"
       class="node-container"
       ref="nodeContainer">
    <div class="node-left"></div>
    <div class="node-left-ico">
      <i class="el-icon-s-tools"/>
    </div>
    <!-- 节点名称 -->
    <div class="node-text" :show-overflow-tooltip="true">
      {{node.title}}
    </div>
    <!-- 节点状态图标 -->
    <div class="node-right-ico">
      <i class="el-icon-circle-check" v-show="node.state === 'success'"/>
      <i class="el-icon-circle-close" v-show="node.state === 'error'"/>
      <i class="el-icon-warning-outline" v-show="node.state === 'warning'"/>
      <i class="el-icon-loading" v-show="node.state === 'running'"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NodeContainer",
    props: {
      node: {
        type: Object,
        required: true,
      },
      isFocus: {
        type: Boolean,
        default: false,
        required: false,
      },
    },
    data() {
      return {}
    },
    computed: {
      nodeContainerStyle() {
        return {
          top: this.node.top,
          left: this.node.left,
        }
      },
    },
    methods: {
      changedNodeSite() {
        console.log('$refs.nodeContainer.style.left', this.$refs.nodeContainer.style.left)
        console.log('$refs.nodeContainer.style.top', this.$refs.nodeContainer.style.top)
        console.log('left', this.node.left)
        console.log('top', this.node.top)
        if (this.node.left === this.$refs.nodeContainer.style.left
          && this.node.top === this.$refs.nodeContainer.style.top) {
          return; // 没产生位移的不处理
        }
        const position = {
          nodeId: this.node.id,
          left: this.$refs.nodeContainer.style.left,
          top: this.$refs.nodeContainer.style.top,
        }
        this.$emit('changedNodeSite', position)
      },
      clickNode() {
        // console.log('node container click : ', this.node.id)
        this.$emit('clickNode', this.node.id)
      },
    }
  }
</script>

<style scoped>
  .node-container {
    position: absolute;
    display: flex;
    width: 180px;
    height: 40px;
    border: 1px solid #a5b6c8;
    border-radius: 5px;
    background: #eef3f7;
    text-align: center;
    z-index: 10;
  }

  .node-left {
    width: 5px;
    background-color: #1879FF;
    border-radius: 4px 0 0 4px;
  }

  .node-left-ico {
    line-height: 32px;
    margin-left: 8px;
  }

  .node-text {
    color: #565758;
    font-size: 12px;
    line-height: 32px;
    margin-left: 8px;
    width: 100px;
    /* 设置超出宽度文本显示方式*/
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }

  .node-right-ico {
    line-height: 32px;
    position: absolute;
    right: 5px;
    cursor: default;
  }
</style>
