<template>
  <div>
    <h3>内容拖拽示例</h3>
    <el-container class="drag-demo">
      <el-aside style="width: 200px">
        <draggable
          class="drag-menu"
          :list="componentsDef"
          :options="menuDragOptions"
          :clone="cloneComponent"
          @start="dragging = true"
          @end="dragging = false">
          <div class="drag-menu-element" v-for="(item, index) in componentsDef" :key="item.id">
            <img class="drag-menu-ele-icon" src="@/assets/img/TabBar/profile.png" alt="">
            {{ item.label_name }}
          </div>
        </draggable>
      </el-aside>
      <el-main style="padding: 0px">
        <draggable
          class="drag-layout"
          :list="formComponents"
          :options="layoutDragOptions"
          :move="moving"
          @start="dragging = true"
          @end="dragging = false">
          <div class="drag-layout-element" v-for="(component, index) in formComponents" :key="component.id">
            {{ component.label_name }}
          </div>
        </draggable>
      </el-main>
    </el-container>

    <ul v-for="(component, index) in formComponents">
      <li>{{index}} - {{component}}</li>
    </ul>
  </div>
</template>

<script>
  // npm install vuedraggable --save
  // npm install sortablejs --save
  import draggable from 'vuedraggable';
  // 可以通过"/src/"开头，自动提示路径
  import {uuid} from '@/common/uuid-utils';

  export default {
    name: "Draggable",
    components: {
      draggable,
    },
    data() {
      return {
        menuDragOptions: {
          group: {
            name: "draggable-demo",  // name相同的组可以互相拖动
            // pull属性定义从列表容器移动出去的设置
            // true：列表容器内的单元可以被移出，反之false
            // 'clone'：列表单元移出，移动的单元为该元素的副本
            // function：进行复杂逻辑，函数中return false/true来判断是否移出
            pull: 'clone',
            // put属性定义往列表容器放置单元的设置
            // true：列表容器可以从其他列表容器内放入单元，反之false
            // function：进行复杂逻辑，函数中return false/true来判断是否放入；
            // ['foo','bar']：单个字符串或字符串数组，代表group配置项的name值；
            put: false,
            // 在移动到另一个列表后，将克隆的元素恢复到初始位置
            revertClone: true
          },
          sort: false, // 列表单元是否可以在容器内进行拖拽排序
          delay: 0, // 定义鼠标选中列表单元可以开始拖动的延迟时间,单位:ms；
          disabled: false, // true：sortable对象不能拖放排序，false：可以排序
          animation: 300,  // 单位：ms，排序动画的时间，0-没有动画
        },
        layoutDragOptions: {
          group: {
            name: "draggable-demo",
            pull: 'false',
            put: true,
            revertClone: true
          },
          sort: true,
          delay: 0,
          disabled: false,
          animation: 300,
        },
        dragging: false,
        componentsDef: [
          {id: 5030001, label_name: '单行文本', code: '', type: 'input'},
          {id: 5030002, label_name: '下拉框', code: '', type: 'selection'},
          {id: 5030003, label_name: '表格', code: '', type: 'table'},
        ],
        formComponents: [
          {id: 5030101, label_name: '单行文本', code: '', type: 'input'},
          {id: 5030102, label_name: '下拉框', code: '', type: 'selection'},
          {id: 5030103, label_name: '表格', code: '', type: 'table'},
        ]
      }
    },
    methods: {
      moving: function (event) {
        // console.log("Future index: ", event.draggedContext.futureIndex);
        // console.log("Future index: ", event);
      },
      cloneComponent(origin) {
        console.log('origin component', origin);
        const instance = JSON.parse(JSON.stringify(origin));
        instance.id = uuid();
        return instance;
      }
    }
  }
</script>

<style scoped>

  .drag-menu {
    border: 1px solid #cceff5;
    background: #fafcfd;
    height: 480px;
    width: 200px;
  }

  .drag-menu-element {
    border: 1px solid #a5b6c8;
    background: #eef3f7;
    width: 100px;
    text-align: left;
    font-size: 14px;
    margin-top: 8px;
    margin-left: 8px;
    margin-right: 8px;
  }

  .drag-menu-ele-icon {
    width: 15px;
    height: 15px;
    margin-top: 2px;
    margin-left: 5px;
    margin-right: 5px;
  }

  .drag-layout {
    border: 1px solid #cceff5;
    background: #fafcfd;
    height: 480px;
    width: 600px;
    margin-left: 5px;
  }

  .drag-layout-element {
    border: 1px solid #a5b6c8;
    background: #eef3f7;
    margin-top: 8px;
    margin-left: 8px;
    margin-right: 8px;
  }
</style>
