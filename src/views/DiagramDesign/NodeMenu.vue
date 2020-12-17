<template>
  <div>
    <div v-for="( menu, index ) in menuList" :key="menu.id">
      <h3 style="margin-left: 8px; margin-top: 8px;">{{menu.title}}</h3>
      <draggable
        :list="menu.nodes"
        :options="menuDragOptions"
        :clone="cloneNode"
        @start="dragging = true"
        @end="endDragging">
        <div v-for="(node, index) in menu.nodes" :key="node.id">
          <div class="menu-node-element">{{ node.label_name }}</div>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable';

  export default {
    name: "NodeMenu",
    components: {
      draggable,
    },
    data() {
      return {
        menuDragOptions: {
          group: {
            name: "diagram-container",
            pull: 'clone',
            put: false,
            revertClone: true
          },
          sort: false,
          delay: 0,
          disabled: false,
          animation: 300,
        },

        dragging: false,
        draggingNode: {},

        menuList: [
          {
            id: '503001',
            category: 'form-input',
            title: '表单填报',
            open: true,
            nodes: [
              {
                id: '50300101',
                label_name: '填报采集',
                type: 'fill-extract',
                title: '填报采集',
                left: '',
                top: '',
                state: 'success',
                properties: [],
                endpoints: [],
              },
              {
                id: '50300102',
                label_name: '填报过滤',
                type: 'fill-filter',
                title: '填报过滤',
                left: '',
                top: '',
                state: 'error',
                properties: [],
                endpoints: [],
              },
              {
                id: '50300103',
                label_name: '填报汇聚',
                type: 'fill-aggragate',
                title: '填报汇聚',
                left: '',
                top: '',
                state: 'running',
                properties: [],
                endpoints: [],
              },
            ]
          },
          {
            id: '503002',
            category: 'transform',
            title: '转换组件',
            open: true,
            nodes: [
              {
                id: '50300201',
                label_name: '字段拆分',
                type: 'field-split',
                title: '字段拆分',
                left: '',
                top: '',
                state: 'warning',
                properties: [],
                endpoints: [],
              },
              {
                id: '50300202',
                label_name: '值映射',
                type: 'value-hash',
                title: '值映射',
                left: '',
                top: '',
                state: 'success',
                properties: [],
                endpoints: [],
              },
            ]
          },
          {
            id: '503003',
            category: 'data-source-input',
            title: '数据源组件',
            open: true,
            nodes: [
              {
                id: '50300301',
                label_name: 'Rest接口',
                type: 'rest-api',
                title: 'Rest接口',
                left: '',
                top: '',
                state: 'success',
                properties: [],
                endpoints: [],
              },
            ]
          },
        ],
      }
    },
    methods: {
      cloneNode(origin) {
        // console.log('origin component', origin);
        this.draggingNode = origin;
        return origin;
      },
      // 拖拽结束时触发
      endDragging(event) {
        this.dragging = false;
        // console.log('event', event);
        // console.log('draggingNode', this.draggingNode);
        this.$emit('diagram-node-add', event, this.draggingNode)
      },
    },
  }
</script>

<style scoped>
  .menu-node-element {
    border: 1px solid #a5b6c8;
    background: #eef3f7;
    width: 100px;
    text-align: center;
    font-size: 14px;
    margin-top: 8px;
    margin-left: 8px;
    margin-right: 8px;
    border-radius: 3px;
  }
</style>
