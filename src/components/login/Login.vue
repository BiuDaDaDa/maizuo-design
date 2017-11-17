<template>
  <!--导航区域-->
  <section class="login-view">
    <div class="login-view-box">
      <div method="post" class="form-view">
        <div class="form-group">
          <!--手机号邮箱-->
          <input type="text" class="form-control" placeholder="输入手机号/邮箱" ref="getPhoneEmail" @focus="focusImport"/>
          <!--发送验证码-->
          <span class="sms" v-show="isChangCode">
              <i class="sms-code-row"></i>
              <i class="sms-code-tex">发送验证码</i>
            </span>
          <div class="input-bg"></div>
        </div>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="输入密码/验证码"/>
          <div class="input-bg"></div>
          <span class="wrong-msg">请输入正确手机号或邮箱</span>
          <button @click="LoginData" class="center-block submit">登入</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: '',
    data () {
      return {
        // 验证码
        isChangCode: false
      }
    },
    methods: {
      // 登入按钮
      LoginData () {
        let time = new Date().getTime()
        this.$request({
          type: 'post',
          url: `api/login?__t=${time}`,
          data: {
            code: '',
            codeKey: '',
            loginType: 0,
            password: '78967433c46c6a930a220d1cf1f25a85',
            username: '15042407695'
            //    mobile: '17709819190', type: '2'
          },
          success: function (res) {
            console.log(res)
          },
          failed: function (res) {
            console.log(res)
          }
        })
      },
      focusImport () {
        console.log('aaa')
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../common/css/reset";

  /*变量*/
  @bgwidth: 100%;
  @bgHight: 100%;

  section {
    margin: 0;
    padding: 0;
  }

  /*登入样式*/
  .login-view {
    position: absolute;
    width: @bgwidth;
    min-height: @bgHight;
    background-color: #f6f6f6;
  }
  .login-view-box {

  }

  /*手机号密码*/
  .form-view {
    padding: 0px 31px 0px 31px;
  }

  .form-group {
    margin: 40px 0 0;
    position: relative;
  }

  .form-control {
    display: block;
    width: @bgwidth;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    border: none;
    background-color: #f6f6f6;
    border-radius: 0px;
    box-shadow: none;
    outline: none;
  }

  .input-bg {
    position: absolute;
    top: 20px;
    height: 12px;
    width: @bgwidth;
    border: solid #c4c4c4;
    border-width: 0 1px 1px 1px;
  }

  /*验证码*/
  .sms {
    width: 95px;
    position: absolute;
    right: 5px;
    top: -5px;
    background-color: #29a097;
    color: #fff;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 3px;
    cursor: pointer;
  }

  .sms-code-row {
    left: -6px;
    position: absolute;
    top: 8px;
    content: '';
    width: 0;
    height: 0;
    border-top: solid 6px transparent;
    border-bottom: solid 6px transparent;
    border-right: solid 6px #29a097;
    display: block;
  }

  .sms-code-tex {
    color: #fff;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 3px;
    cursor: pointer;
    font-size: 12px;
  }

  /*错误信息显示*/
  .wrong-msg {
    display: block;
    height: 16px;
    color: #fe8233;
    padding-left: 8px;
    font-size: 12px;
  }

  /*登入按钮*/
  .submit {
    width: 163px;
    background-color: #fe8233;
    color: #fff;
    border: none;
    border-radius: 36px;
    margin-top: 45px;
    padding: 8px 12px;
    font-size: 15px;
    outline: none;
  }

  .center-block {
    display: block;
    margin-right: auto;
    margin-left: auto;
  }

</style>
