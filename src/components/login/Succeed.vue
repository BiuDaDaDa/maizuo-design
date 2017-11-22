<template>
  <!--header展示-->
  <section class="main-succeed">
    <!--导航-->
    <div class="center-header-wrap">
      <header class="">
        <img class="avatar" src="https://pic.maizuo.com/usr/default/maizuomoren66.jpg">
        <!--细节-->
        <div class="header-detail">
          <p class="username">
            <span>{{ userData.data.name}}</span>
          </p>
          <p class="email">ID:{{userData.data.id}}</p>
          <p class="login-out" @click="loginOut">退出</p>
        </div>
        <!--end-->
      </header>
    </div>
    <!--end-->
    <!--center列表-->
    <section class="main-center">
      <div class="menu-wrapper">
        <div class="menu">
          <i class="iconfont icon-yingpiaodingdan" style="font-size: 24px; color:#7BCDCC;"></i>
          <span class="title">影票订单</span>
          <div class="pull-right">
              <span class="value-wrap">
               <span class="value">0</span>
                <span>张</span>
              </span>
            <i class="iconfont icon-xiayibu"></i>
          </div>
        </div>
      </div>
      <div class="menu-wrapper">
        <div class="menu">
          <i class="iconfont icon-dingdan1" style="font-size: 24px; color:#BBCEA5;"></i>
          <span class="title">影票待付订单</span>
          <div class="pull-right">
              <span class="value-wrap">
               <span class="value">0</span>
                <span>张</span>
              </span>
            <i class="iconfont icon-xiayibu"></i>

          </div>
        </div>
      </div>
      <div class="menu-wrapper">
        <div class="menu">
          <i class="iconfont icon-shangchengdingdan" style="font-size: 24px; color:#95C0EA;"></i>
          <span class="title">商城订单</span>
          <div class="pull-right">
              <span class="value-wrap">
               <span class="value">0</span>
                <span>张</span>
              </span>
            <i class="iconfont icon-xiayibu"></i>

          </div>
        </div>
      </div>
      <div class="cash">
        <div class="menu center-block">
          <i class="iconfont icon-ziyuan" style="font-size: 24px; color:#FFB978;"></i>
          <span class="title">我的现金卷</span>
          <div class="pull-right">
              <span class="value-wrap">
               <span class="value">0</span>
                <span>张</span>
              </span>
            <i class="iconfont icon-xiayibu"></i>
          </div>
        </div>
      </div>
      <div class="accunt">
        <div class="menu center-block">
          <i class="iconfont icon-zhanghuyue" style="font-size: 24px; color:#FAA0B5;"></i>
          <span class="title">账户余额</span>
          <div class="pull-right">
              <span class="value-wrap">
               <span class="value">0</span>
                <span>张</span>
              </span>
            <i class="iconfont icon-xiayibu"></i>
          </div>
        </div>
      </div>
      <div class="accunt">
        <div class="menu center-block">
          <i class="iconfont icon-card" style="font-size: 24px; color:#80DAE6;"></i>
          <span class="title">卖座卡</span>
          <div class="pull-right">
              <span class="value-wrap">
               <span class="value">0</span>
                <span>张</span>
              </span>
            <i class="iconfont icon-xiayibu"></i>
          </div>
        </div>
      </div>
      <div class="menu-wrapper">
        <router-link :to="{name:'Setting'}">
        <div class="menu">
          <i class="iconfont icon-shezhi" style="font-size: 24px; color:#95C0EA;"></i>
          <span class="title">设置</span>
          <div class="pull-right">
            <i class="iconfont icon-xiayibu"></i>
          </div>
        </div>
        </router-link>
      </div>
    </section>
    <!--end-->
  </section>
  <!--end-->
</template>

<script>
  export default {
    name: '',
    data () {
      return {
        userData: {}
      }
    },
    created () {
      this.userData = JSON.parse(window.localStorage['user'])
   //   console.log(JSON.parse(window.localStorage['user']))
    },
    methods: {
      // 登出
      loginOut () {
        var r = confirm('你确定要退出当前账户？')
        if (r === true) {
          this.$router.push({name: 'Login'})
          var cookieArr = document.cookie.split(';')
          for (var i = 0; i < cookieArr.length; i++) {
            var newDate = new Date()
            newDate.setDate(newDate.getDate() - 200)
            var item = cookieArr[i]
            console.log(`${item};expries=` + newDate.toGMTString())
            window.document.cookie = `${item};expries=` + newDate.toGMTString()
          }
        }
      }
    }
  }
</script>

<style scoped lang="less">
  * {
    box-sizing: border-box;
  }

  /*变量*/
  @bgwidth: 100%;
  @bgHight: 100%;
  header {
    display: block;
  }

  /*导航*/
  .main-succeed {
    position: absolute;
    height: @bgwidth;
    width: @bgHight;
    font-size: 14px;
  }

  .center-header-wrap {
    position: relative;
    background-color: #303030;
    color: #fff;
  }

  .center-header-wrap header {
    padding: 36px 12px 24px 10%;
    overflow: hidden;
  }

  .avatar {
    width: 92px;
    height: 92px;
    border-radius: 50%;
    margin-right: 14px;
    float: left;
    vertical-align: middle;
  }

  .header-detail P {
    padding: 2px;
  }

  .header-detail {
    float: left;
    margin-top: 16px;
    color: #fff;
  }

  .login-out {
    padding: 5px 20px 5px 0;
    cursor: pointer;
    font-size: 12px;
    color: #ffbd80;
    margin-top: 0;
    text-decoration: underline;
  }

  /*中间*/
  .main-center {
    padding: 0;
    width: 100%;
    height: 80%;
    background-color: #EBEBEB;
    border: 1px solid #EBEBEB;

  }

  .menu-wrapper {
    width: @bgwidth;
    margin: 14px 0;
    line-height: 59px;
    background-color: #fff;
    cursor: pointer;
    font-size: 12px;
    color: #222;
    vertical-align: baseline;
  }

  .menu {
    margin: 0 12px;
  }

  .iconfont {
    vertical-align: sub;
  }

  .title {
    font-size: 14px;
    margin-left: 9px;
    line-height: 35px;
    vertical-align: inherit;
  }

  .pull-right {
    float: right;
  }

  .value-wrap {
    width: 100%;
    margin: 14px 0;
    line-height: 59px;
    background-color: #fff;
    cursor: pointer;
    font-size: 14px;
    color: #222;
  }

  .value {
    color: #e7a858;
  }

  .main-center .cash {
    border-bottom: solid 1px #eaeaea;
    margin-bottom: 0px;
    width: @bgwidth;
    line-height: 59px;
    background-color: #fff;
    cursor: pointer;
    font-size: 12px;
    color: #222;
    vertical-align: baseline;

  }

  .main-center .accunt {
    border-bottom: solid 1px #eaeaea;
    margin-bottom: 0px;
    width: @bgwidth;
    line-height: 59px;
    background-color: #fff;
    cursor: pointer;
    font-size: 12px;
    color: #222;
    vertical-align: baseline;
  }
  .center-block {
    display: block;
  }
</style>
