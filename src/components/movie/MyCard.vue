<template>
  <div class="card-body">
    <div class="header-select">
      <div class="select" :class="{'active': layout == 'header-left'}" @click="layout = 'header-left'">卖座卡</div>
      <div class="select" :class="{'active': layout == 'header-right'}" @click="layout = 'header-right'">电子卖座卡</div>
    </div>
    <!--卖座卡-->
    <div v-if="layout === 'header-left'" class="material">
      <div class="material-div">
        <div>卡号:</div>
        <input type="text" v-model="cardvalue.name" :placeholder="cardvalue.pcl">
        <div class="line"></div>
      </div>
      <div class="material-div">
        <div>密码:</div>
        <input type="password" v-model="cardpasd.name" :placeholder="cardpasd.pcl">
        <div class="line"></div>
      </div>
      <p>{{errora}}</p>
    </div>
    <!--电子卖座卡-->
    <div v-if="layout === 'header-right'" class="exchange">
      <div class="material-div">
        <div>卡号:</div>
        <input type="text" v-model="electronic.name" pattern="[0-9]*" :placeholder="electronic.pcl">
        <div class="line"></div>
      </div>
      <p>{{errorb}}</p>
    </div>
    <input @click="inquire" class="btn" type="button" value="查询">
  </div>
</template>

<script>
  export default {
    name: 'MyCard',
    data () {
      return {
        layout: 'header-left',
        errora: '',
        errorb: '',
        cardvalue: {
          name: '',
          pcl: '请输入卡号'
        },
        cardpasd: {
          name: '',
          pcl: '请输入密码'
        },
        electronic: {
          name: '',
          pcl: '请输入15位电子卖座卡号'
        }
      }
    },
    methods: {
      inquire () {
        if (this.layout === 'header-left') {
          if (this.cardvalue.name.length === 0) {
            this.errora = '该卡号无效'
          } else if (this.cardvalue.name.length !== 8) {
            this.errora = '该卡号无法获取到卡的类型'
          } else if (this.cardvalue.name.length > 8 || this.cardpasd.name.length > 8) {
            this.errora = '该卡号无法获取到卡的类型或密码格式不正确'
          } else if (this.cardpasd.name.length === 0) {
            this.errora = '密码不能为空'
          } else if (this.cardpasd.name.length < 8) {
            this.errora = '密码格式不正确'
          } else {
            this.errora = '正在查询'
          }
        }
        if (this.layout === 'header-right') {
          if (this.electronic.name.length === 0) {
            this.errorb = '卡号不能为空'
          } else if (this.electronic.name.length < 15 && this.electronic.name.length !== 0) {
            this.errorb = '该卡号无效'
          } else if (this.electronic.name.length > 15) {
            this.errorb = '卡号密码不匹配'
          } else {
            this.errorb = '卡号密码不匹配'
          }
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../common/css/reset";
  @import "../../common/css/common-color";

  .header-select {
    height: 46px;
    border-bottom: 1px solid #fe6e00;
  }

  .header-select .select {
    width: 50%;
    font-size: @font-size-normal;
    float: left;
    height: 92%;
    text-align: center;
    line-height: 45px;
  }

  .active {
    border-bottom: 5px solid #fe6e00;
    transition: all 0.3s ease;
    color: #fe6e00;
  }

  .material, .exchange {
    width: 85%;
    margin: 0 auto;
    margin-top: 20px;
  }

  .material-div > div {
    font-weight: 300;
    font-size: 14px;
    line-height: 34px;
    margin: 0 15px 0 10px;
    float: left;
  }

  .material-div {
    margin-top: 30px;
    /*overflow: hidden;*/
    position: relative;
  }

  .material-div > input {
    background-color: transparent;
    height: 34px;
    width: 55%;
    font-size: 14px;
    vertical-align: top;
    border: none;
    outline: medium;
  }

  .line {
    width: 100%;
    border-width: 0px 1px 1px;
    border-style: solid;
    border-color: #ccc;
    height: 5px;
    position: absolute;
    bottom: 0;
    left: -10px;
  }

  .btn {
    width: 160px;
    margin: 0 auto;
    border-radius: 18px;
    background-color: #fe8233;
    height: 36px;
    color: #fff;
    font-size: 14px;
    line-height: 36px;
    outline: none;
    border: none;
    display: block;
  }

  p {
    margin-left: 5px;
    color: #fe8233;
    height: 25px;
    font-size: 14px;
    padding: 10px 8px;
  }
</style>
