<template>
  <!--导航区域-->
  <section class="login-view">
    <div class="login-view-box">
      <div method="post" class="form-view">
        <!--手机号邮箱-->
        <div class="form-group">
          <input type="text" class="form-control" placeholder="输入手机号/邮箱" ref="getPhoneEmail" v-model="getPhone"
                 @input="getInput"/>
          <!--发送验证码-->
          <span class="sms" v-show="isChangCode" @click="changCode">
              <i class="sms-code-row"></i>
              <i class="sms-code-tex" v-show="isSendTime">发送验证码</i>
             <i class="sms-code-tex" v-show="isRepeatSend">重发({{time}})</i>
            </span>
          <div class="input-bg"></div>
        </div>
        <!--end-->
        <!--密码和手机验证码-->
        <div class="form-group">
          <input type="text" class="form-control" placeholder="输入密码/验证码" ref="postCode" @input="getInputCode"/>
          <div class="input-bg"></div>
        </div>
        <!--end-->
        <!--图片验证码-->
        <div class="form-group" v-show="isImgCode" @click="changImg">
          <input type="text" class="form-control" placeholder="图形验证码" ref="getInputImgCode"/>
          <img :src="this.imgData" width="100px" height="30px" title="网络问题" alt="网络问题">
          <div class="input-bg"></div>
        </div>
        <!--end-->
        <!--错误信息显示-->
        <span class="wrong-msg" ref="isNoPhone" v-show="isNoPhone">请输入正确手机号或邮箱</span>
        <span class="wrong-msg" ref="isNoCode" v-show="isNoCode">密码不能为空</span>
        <span class="wrong-msg" ref="isNoAccount" v-show="isNoAccount">账号不存在</span>
        <span class="wrong-msg" ref="isEorrAccountCode" v-show="isErroAccountCode">账号或密码不正确</span>
        <span class="wrong-msg" ref="isChangeCode" v-show="isChangeCodeContent">图形验证码不能为空</span>
        <button @click="LoginData" class="center-block submit">登入</button>
      </div>
    </div>
  </section>
</template>

<script>
  import md5 from 'md5'
  export default {
    name: '',
    data () {
      return {
        // 验证码
        isChangCode: false,
        getPhone: '', // 获取手机号邮箱账号
        isNoPhone: false, // 输入正确的手机号邮箱
        isNoCode: false, // 密码不能为空
        isNoAccount: false, // 账号不存在
        isErroAccountCode: false, // 账号密码不正确
        isChangeCodeContent: false, // 图形验证码不能为空
        isImgCode: false, // 是否显示图片验证码
        imgData: '', // 验证码的图片数据
        loginType: 0, //  判断是手机验证码登录还是账号密码登录
        codeKey: '',  // 图片验证码的key
        code: '', // 输入的验证码
        isSendTime: true, // 发送时间
        isRepeatSend: false,
        time: ''
      }
    },
    methods: {
      // 登入按钮
      LoginData () {
        // 获取信息
        let phoneEmail = this.$refs.getPhoneEmail.value
        let postCode = this.$refs.postCode.value
        // 判断电话或邮箱是否为空
        if (phoneEmail === '' && postCode === '') {
          this.isNoPhone = true
        } else {
          this.isNoPhone = false
        }
        // 判断账号是否为空
        if (phoneEmail === '') {
          this.isNoPhone = true
        } else {
          this.isNoPhone = false
          // 密码不能为空
          if (postCode === '') {
            this.isNoCode = true
          } else {
            this.isNoCode = false
            this.InitLogin()
          }
        }
      },
      //  判断手机号还是邮箱函数
      InitLogin () {
        // 获取信息
        let phoneEmail = this.$refs.getPhoneEmail.value
        // 判断是否是账号是手机还是邮箱
        if ((/^1[3|4|5|8][0-9]\d{8}$/.test(phoneEmail))) {
          this.requestInitLogin()
        } else {
          this.requestInitLogin()
        }
      },
      // 登入请求的函数
      requestInitLogin () {
        let phoneEmail = this.$refs.getPhoneEmail.value
        let pass = this.$refs.postCode.value
        let md5Pass = md5(pass)
        let modeType = this.loginType
        let codeKey = this.codeKey
        let code = this.$refs.getInputImgCode.value
        let time = new Date().getTime()
        this.$request({
          type: 'post',
          url: `api/login?__t=${time}`,
          data: {
            code: code,
            codeKey: codeKey,
            loginType: modeType,
            password: md5Pass,
            username: phoneEmail
          },
          success: function (res) {
            // console.log(res.data.data.data)
            let userData = JSON.stringify(res.data.data) // 用户的json数据
            let msg = res.data.msg // 返回的错误信息
            // 登入成功
            if (msg === 'ok') {
              localStorage.setItem('user', userData) // 存入本地
              this.$router.push({name: 'Succeed'}) // 路由跳转
              let isMainAccount = res.data.data.data.isMainAccount // 判断登入的状态
              let mobile = res.data.data.data.mobile // 电话号
              let userId = res.data.data.data.id // userId
              // 设置cookie
              window.document.cookie = `isMainAccount=${isMainAccount}`
              window.document.cookie = `mobile=${mobile}`
              window.document.cookie = `userId=${userId}`
            }
            if (msg === '账号不存在') {
              this.isNoAccount = true
            } else {
              this.isNoAccount = false
            }
            if (msg === '账号或密码错误') {
              this.isErroAccountCode = true
            } else {
              this.isErroAccountCode = false
            }
            if (msg === '图形验证码不能为空') {
              this.isChangeCodeContent = true
              this.isImgCode = true
              this.requestInitImgCode()
            } else {
              this.isChangeCodeContent = false
              this.isImgCode = false
            }
            if (msg === '图形验证码输入有误，请刷新重试') {
              this.isChangeCodeContent = true
              this.isImgCode = true
              this.requestInitImgCode()
            }
          },
          failed: function (res) {
            console.log(res)
          }
        })
      },
      // 手机短信验证码的网络请求
      requestInitCode () {
        let phone = this.$refs.getPhoneEmail.value
        let time = new Date().getTime()
        this.$request({
          type: 'post',
          url: `api/code?__t=${time}`,
          data: {
            mobile: phone,
            type: '2'
          },
          success: function (res) {
            console.log(res.data.msg)
            let msg = res.data.msg
            if (msg === 'ok') {}
            if (msg === '亲,验证码已经发送到您的手机上') {
              alert('亲,验证码已经发送到您的手机上')
            }
          },
          failed: function (res) {
            console.log(res)
          }
        })
      },
      // 图片验证码请求
      requestInitImgCode () {
        var _this = this
        let time = new Date().getTime()
        this.$request({
          type: 'get',
          url: `api/login/captcha?__t=${time}`,
          success: function (res) {
            console.log(res.data.data)
            _this.imgData = res.data.data.url
            _this.codeKey = res.data.data.key
          },
          failed: function (res) {
            console.log(res)
          }
        })
      },
      // 验证码图标是否显示
      getInput () {
        var sMobile = this.getPhone
        if (!(/^1[3|4|5|8][0-9]\d{8}$/.test(sMobile))) {
          this.isChangCode = false
        } else {
          this.isChangCode = true
        }
      },
      // 短信验证码发送
      changCode () {
        this.requestInitCode()
        this.sendCodeTime() // 时间函数
        this.loginType = 1
      },
      // 密码实时获取
      getInputCode () {},
      // 图片验证码切换图片
      changImg () {
        this.requestInitImgCode()
      },
      // 发送时间函数
      sendCodeTime () {
        let CutDown
        let _this = this
        this.isSendTime = false
        this.isRepeatSend = true
        var time = 60
        CutDown = setInterval(function () {
          time--
          _this.time = time
          if (time === 0) {
            clearInterval(CutDown)
            _this.isSendTime = true
            _this.isRepeatSend = false
          }
        }, 1000)
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
    background-color: #29a097;
    border: 0px;
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

  .form-group img {
    position: absolute;
    vertical-align: top;
    margin-right: 5px;
    right: -5px;
    bottom: 15px;

  }
</style>
