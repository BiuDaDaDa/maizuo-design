<template>
  <section class="main-center">
    <div class="menu-wrapper">
      <div class="menu">
        <img src="../../common/img/bindPone.png"/>
        <span class="title">手机绑定</span>
        <div class="pull-right">
          <i class="iconfont icon-xiayibu"></i>
        </div>
      </div>
    </div>
    <div class="menu-wrapper">
      <div class="menu">
        <img src="../../common/img/post.png">
        <span class="title">修改安全密码</span>
        <div class="pull-right">
          <i class="iconfont icon-xiayibu"></i>
        </div>
      </div>
    </div>
    <div class="menu-wrapper">
      <div class="menu">
        <img src="../../common/img/clearCash.png">
        <span class="title">清除缓存</span>
        <div class="pull-right">
          <i class="iconfont icon-xiayibu"></i>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: ''
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
    vertical-align:super;
  }
  .menu img {
     margin-top: 10px;
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
