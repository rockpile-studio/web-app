<template>
  <div style="display: flex;height: 600px;">
    <div class="node-menu">
      <node-menu @diagram-node-add="diagramNodeAdd"/>
    </div>
    <div id="diagramContainer" ref="diagramContainer" class="diagram-container" v-diagram-container-drag>
      <!-- <div id="demoNode1" class="demo-node"></div> -->
      <!-- <div id="demoNode2" class="demo-node" style="left:200px;"></div> -->
      <template v-for="(node, index) in container.nodes">
        <node-container
          :id="node.id"
          :key="node.id"
          :node="node"
          @changedNodeSite="changedNodeSite"
          @clickNode="clickNode">
        </node-container>
      </template>
    </div>
    <div class="node-property">
      <div>组件属性编辑区</div>
    </div>
  </div>
</template>

<script>
  import {jsPlumb} from "jsplumb"
  import draggable from 'vuedraggable';
  import {v4 as uuidv4} from "uuid";
  import NodeMenu from './NodeMenu';
  import NodeContainer from "./NodeContainer";
  import jsPlumbConfig from './jsplumb-config'

  export default {
    name: "",
    components: {
      draggable,
      NodeMenu,
      NodeContainer,
    },
    data() {
      return {
        jsPlumbInst: null,
        container: {
          title: '',
          nodes: [],
          links: [],
        },
        activeElement: {
          // type: node, link
          type: null,
          // 节点ID
          nodeId: null,
          // 连线ID
          sourceNodeId: null,
          targetNodeId: null,
        },
      }
    },
    methods: {
      // 拖拽结束后添加新的节点
      diagramNodeAdd(event, draggingNode) {
        // console.log('diagramNodeAdd::event', event);
        // console.log('diagramNodeAdd::draggingNode', draggingNode);
        const screenX = event.originalEvent.clientX;
        const screenY = event.originalEvent.clientY;
        let diagramContainer = this.$refs.diagramContainer;
        const containerRect = diagramContainer.getBoundingClientRect();
        // console.log('containerRect', containerRect);
        let left = screenX, top = screenY;
        // 计算是否拖入到容器中
        if (left < containerRect.x || left > containerRect.width + containerRect.x
          || top < containerRect.y || containerRect.y > containerRect.y + containerRect.height) {
          this.$message.error("请把节点拖入到画布中");
          return;
        }
        left = left - containerRect.x;
        top = top - containerRect.y;
        // console.log('left', left);
        // console.log('top', top);

        const node = JSON.parse(JSON.stringify(draggingNode));
        node.id = uuidv4().replace('-', '');
        node.left = left + 'px';
        node.top = top + 'px';
        // console.log('new node', node);

        // 这里可以进行业务判断、是否能够添加该节点
        this.container.nodes.push(node);

        this.$nextTick(function () {
          // console.log('jsPlumb.draggable')
          // console.log('node.id', node.id)
          jsPlumb.draggable(node.id, {containment: 'diagramContainer', grid: [20, 20]});

          jsPlumb.addEndpoint(node.id,
            {anchor: ['Center'], id: node.id},
            jsPlumbConfig);
          // jsPlumb.addEndpoint(node.id, {anchor: ['Bottom'], id: node.id + '-Bottom'}, jsPlumbConfig);
        })

        // let allConnections = jsPlumb.getAllConnections();
        // console.log('allConnections', allConnections);
      },
      changedNodeSite(position) {
        console.log('position', position)
        for (let i = 0; i < this.container.nodes.length; i++) {
          let node = this.container.nodes[i];
          if (node.id === position.nodeId) {
            node.left = position.left;
            node.top = position.top;
          }
        }
      },
      clickNode(nodeId) {
        this.activeElement.type = 'node'
        this.activeElement.nodeId = nodeId
        // 右侧节点属性配置绑定
      },
      existLink(source, target) {
        for (let i = 0; i < this.container.links.length; i++) {
          const link = this.container.links[i];
          if (link.source === source && link.target === target) {
            return true;
          }
        }
        return false;
      },
      existReverseLink(source, target) {
        return this.existLink(target, source);
      },
      getActiveLink(source, target) {
        for (let i = 0; i < this.container.links.length; i++) {
          const link = this.container.links[i];
          if (link.source === source && link.target === target) {
            return link;
          }
        }
        return null;
      },
      deleteNode(nodeId) {
        this.container.nodes = this.data.nodeList.filter(function (node) {
          if (node.id === nodeId) {
            // 伪删除，将节点隐藏，否则会导致位置错位
            // node.show = false
            return false
          }
          return true
        })
        this.$nextTick(function () {
          this.jsPlumb.removeAllEndpoints(nodeId);
        })
      },
      deleteActiveElement() {
        if (this.activeElement.type === 'node') {
          jsPlumb.removeAllEndpoints(this.activeElement.nodeId);
          this.container.nodes = this.container.nodes.filter(
            (node) => (node.id !== this.activeElement.nodeId)
          );
        } else if (this.activeElement.type === 'link') {
          let connections = jsPlumb.getConnections({
            source: this.activeElement.sourceNodeId,
            target: this.activeElement.targetNodeId
          })[0];
          this.jsPlumb.deleteConnection(connections);
        }
      },
    },
    mounted() {
      // let _this = this;
      // 必须使用箭头函数，function闭包作用域会改变this的指向
      jsPlumb.ready(() => {
        jsPlumb.setContainer('diagramContainer');
        // 设置jsPlumb立即重绘
        jsPlumb.setSuspendDrawing(false, true);
        jsPlumb.importDefaults(jsPlumbConfig);

        // jsPlumb.draggable('demoNode1', {containment: 'diagramContainer', grid: [20, 20]});
        // jsPlumb.draggable('demoNode2', {containment: 'diagramContainer', grid: [20, 20]});
        // jsPlumb.addEndpoint('demoNode1', {uuid: 'demoNode1'}, jsPlumbConfig);
        // jsPlumb.addEndpoint('demoNode2', {uuid: 'demoNode2'}, jsPlumbConfig);
        // jsPlumb.connect({source: 'demoNode1', target: 'demoNode2',}, jsPlumbConfig);
        // 设置jsPlumb操作事件
        // 监听节点连接绑定之前校验
        jsPlumb.bind("beforeDrop", (bindInfo, originalEvent) => {
          console.log('节点连接绑定之前校验', bindInfo);
          const source = bindInfo.sourceId;
          const target = bindInfo.targetId;
          // debugger
          if (source === target) {
            this.$message.error('节点不支持连接自己');
            return false;
          }
          if (this.existLink(source, target)) {
            this.$message.error('该连接线关系已存在,不能重复创建连接')
            return false;
          }
          if (this.existReverseLink(source, target)) {
            this.$message.error('不支持节点之间连线回环');
            return false;
          }
          console.log('连接成功');
          return true;
        });
        // 监听节点连线
        jsPlumb.bind("connection", (conn, originalEvent) => {
          // console.log('节点连线触发', conn);
          const link = {
            id: uuidv4().replace('-', ''),
            source: conn.source.id,
            target: conn.target.id,
          }
          // console.log('link', link);
          this.container.links.push(link);
        });
        // 监听连接线点击
        jsPlumb.bind('click', (conn, originalEvent) => {
          // 模拟弹窗输入连接线的标签信息
          // const label = window.prompt('输入标签信息');
          const link = this.getActiveLink(conn.source.id, conn.target.id);
          this.activeElement.type = 'link';
          this.activeElement.sourceNodeId = link.source;
          this.activeElement.targetNodeId = link.target;
        })
      });
    },
    directives: {
      // 自定义局部命令
      'diagram-container-drag': {
        bind(el, binding, vnode, oldNode) {
          if (!binding) {
            return;
          }
          el.onmousedown = (event) => {
            if (event.button === 2) {
              // 不响应右键
              return;
            }
            // console.log('diagram-container-drag onmousedown event', event)
            // 鼠标按下，计算当前原始距离可视区的高度
            let distanceX = event.clientX;
            let distanceY = event.clientY;
            el.style.cursor = 'move';

            document.onmousemove = function (event) {
              // 移动时禁止默认事件
              event.preventDefault();
              const left = event.clientX - distanceX;
              distanceX = event.clientX;
              el.scrollLeft += -left;

              const top = event.clientY - distanceY;
              distanceY = event.clientY;
              el.scrollTop += -top;
            }

            document.onmouseup = function (event) {
              el.style.cursor = 'auto';
              document.onmousemove = null;
              document.onmouseup = null;
            }
          }
        }
      }
    },
  }
</script>

<style scoped>
  .node-menu {
    border: 1px solid #cceff5;
    background: #fafcfd;
    width: 200px;
    margin-top: 8px;
    margin-left: 8px;
  }

  .node-property {
    border: 1px solid #cceff5;
    background: #fafcfd;
    width: 200px;
    margin-top: 8px;
    margin-right: 8px;
  }

  .diagram-container {
    border: 1px solid #cceff5;
    background: #fafcfd;
    margin-top: 8px;
    margin-left: 8px;
    margin-right: 8px;
    position: relative;
    overflow: scroll;
    flex: 1;
  }

  .demo-node {
    position: absolute;
    width: 80px;
    height: 40px;
    border: 1px solid blue;
    background: lightblue;
  }
</style>
