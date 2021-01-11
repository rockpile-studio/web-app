<template>
  <div class="index-wrap">
    <div class="index-left">
      <div class="index-left-block">
        <!-- 功能树 -->
        <div v-for="module in moduleTree">
          <h3>{{ module.name }}</h3>
          <ul>
            <li v-for="item in module.subtitles">
              <a :href="item.link">{{ item.name }}</a>
              <!-- span标签被用来组合文档中的行内元素 -->
              <span v-if="item.hot" class="hot-tag">HOT</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="index-right">

    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        moduleTree: [
          {
            name: '产品模块',
            link: '/module',
            subtitles: [
              {name: 'DAG有向图设计器', link: '/diagram-design', hot: true},
              {name: '多维立方体模型', link: '/data-cube', hot: true},
              {name: '拖拽服务', link: '/draggable', hot: false},
            ],
          },
        ],
      }
    },
  }
</script>

<style scoped>
  .index-wrap {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
  }

  .index-left {
    float: left;
    width: 300px;
    text-align: left;
  }

  .index-left-block {
    margin: 15px;
    background: #fff;
    box-shadow: 0 0 1px #ddd;
  }

  .index-left-block .hr {
    margin-bottom: 20px;
  }

  .index-left-block h2 {
    background: #4fc08d;
    color: #fff;
    padding: 10px 15px;
    margin-bottom: 20px;
  }

  .index-left-block h3 {
    padding: 0 15px 5px 15px;
    font-weight: bold;
    color: #222;
  }

  .index-left-block ul {
    padding: 10px 15px;
  }

  .index-left-block li {
    padding: 5px;
  }

  .index-right {
    float: left;
    width: 900px;
  }

  .hot-tag {
    background: red;
    color: #fff;
  }

</style>
