<template>
  <div>
    <h3>首页</h3>
    <div class="component">
      <div class="cpn-label">单行文本</div>
      <div class="cpn-value">
        <el-input v-model="component.inputValue" placeholder="请输入内容"/>
      </div>
    </div>
    <div class="component">
      <div class="cpn-label">下拉框</div>
      <div class="cpn-value">
        <el-select v-model="component.selectValue" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <br style="clear: both">
    <div class="component">
      <div class="cpn-label">单行文本</div>
      <div class="cpn-value">
        <el-input v-model="component.inputValue" placeholder="请输入内容"/>
      </div>
    </div>
    <div class="component">
      <div class="cpn-label">下拉框</div>
      <div class="cpn-value">
        <el-select v-model="component.selectValue" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <br style="clear: both">
    <div style="margin-top: 8px">
      <button @click="sendToParent" style="margin-left: 8px">向父页面发送msg（sendToParent）</button>
      <br>
      <span id="message" style="margin-left: 8px">接收父页面的消息（postMessage）：{{receiveMessage}}</span>
    </div>

  </div>
</template>

<script>
  import {uuid} from '@/common/uuid-utils';

  export default {
    name: "Home",
    data() {
      return {
        detailId: '',
        component: {
          inputValue: '',
          selectValue: '',
        },
        options: [
          {value: '01', label: '黄金糕'},
          {value: '02', label: '双皮奶'},
          {value: '03', label: '蚵仔煎'},
          {value: '04', label: '龙须面'},
          {value: '05', label: '北京烤鸭'}
        ],
        receiveMessage: '',
      }
    },
    computed: {},
    methods: {
      sendToParent() {
        console.log('window', window);
        const data = {
          detailId: uuid(),
          code: 530200,
          message: '父子页面跨域通信成功',
          content: {
            input: this.component.inputValue,
            selector: this.component.selectValue,
          },
        };
        this.detailId = data.detailId;
        // false：iframe使用安全origin传输，true：全域名传输
        const isUniverse = false;
        let targetOrigin = '*';
        if (!isUniverse) {
          if (parent !== window) {
            try {
              console.log('try', parent.location.href)
              targetOrigin = parent.location.href;
            } catch {
              console.log('catch', document.referrer)
              // console.log('catch', window._referrer)
              targetOrigin = document.referrer;
            }
          }
        }

        // message：要发送到其他window的数据，数据会被序列化。
        // targetOrigin：指定哪些窗口能接收到消息事件，其值可以是字符串"*"（表示无限制）或者一个URI。
        // 在发送消息的时候，如果目标窗口的协议、主机地址或端口这三者的任意一项不匹配targetOrigin提供的值，那么消息就不会被发送；
        // 只有三者完全匹配，消息才会被发送。
        window.parent.postMessage(data, targetOrigin);
      },
      // async receiveFromParent(data) {
      receiveFromParent(data) {
        console.log('data', data);
        this.detailId = data.detailId;
        console.log('detailId', this.detailId);
        this.component.inputValue = data.content.input;
        this.component.selectValue = data.content.selector;
        console.log('detailId', this.component.selectValue);
        this.receiveMessage = JSON.stringify(data);
        console.log('this.receiveMessage', this.receiveMessage);
      },
    },
    created() {
      let _this = this;
      window.addEventListener('message', function (event) {
        console.log('event', event);
        console.log('this', this);
        console.log('_this', _this);
        if (event.data.code === 530100) {
          _this.receiveFromParent(event.data);
        }
        console.log('receive success');
      })
    }
  }
</script>

<style scoped>
  .component {
  }

  .cpn-label {
    float: left;
    border: 1px solid rgb(187, 187, 187);
    width: 120px;
    height: 48px;
    background-color: rgb(241, 242, 243);

    display: -webkit-box;
    -webkit-box-orient: horizontal;
    -webkit-box-pack: center;
    -webkit-box-align: center;
  }

  .cpn-value {
    float: left;
    margin-left: -1px;
    border: 1px solid rgb(187, 187, 187);
    width: 320px;
    height: 48px;
    padding: 8px;
  }

  /deep/ .el-input__inner {
    height: 32px;
  }
</style>
