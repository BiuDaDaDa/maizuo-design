<template>
  <div class="wrap">
    <div class="wrap-body" v-for="(item,index) in msgData">
        <div class="imgfirst"></div>
        <div class="text">
          <div class="text-top">{{item.name}}</div>
          <div class="text-bottom">可在本影院兑换{{intro[index]}}电影票</div>
        </div>
        <div class="huaborder">

        </div>
      <div class="whitebox">
          <div class="maizuo">￥{{item.price.maizuo}}.00</div>
        <div class="cinema">￥{{item.price.cinema}}.00</div>
      </div>
      <div class="whiteborder"></div>
    </div>
    <div class="tong" @click="GoTotong">
      <span>什么是通兑票</span>
      <i class="iconfont icon-wenhao"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    data () {
      return {
        msg: '',
        msgData: [],
        intro: ['2D', '3D']
      }
    },
    methods: {
      GoTotong () {
        this.$router.push('/help/ticket')
      },
      getData () {
        for (let i = 0; i < this.msg.length; i++) {
          if (this.msg[i].type === 1) {
            this.msgData.push(this.msg[i])
          }
        }
      }
    },
    mounted () {
      let time = new Date().getTime()
      this.$request({
        type: 'get',
        url: `/api/cinema/${this.$route.params.id}/item?__t=${time}`,
        success: function (res) {
          this.msg = res.data.data.items
          this.getData()
          console.log(this.msg)
        },
        failed: function (error) {
          console.log(error)
        }
      })
    }
  }
</script>

<style scoped lang="less">
  .wrap {
    position: absolute;
    background-color: #e1e1e1;
    width: 100%;
    min-height: 100%;
  }

  .wrap-body {
    padding: 10px;
    display: flex;
    justify-content: flex-start;
  }

  .imgfirst {
    width: 5%;
    height: 108px;
    background-image: url("../../common/img/blueborder.png");
    background-repeat: no-repeat;
  }

  .text{
    background-image: url("../../common/img/bluebox.png");
    box-sizing: border-box;
    height: 108px;
    width: 63%;
    padding: 30px 10px;
    color: #fff;
  }

  .text-top{
    font-size: 16px;
  }

  .text-bottom{
    margin-top: 15px;
    font-size: 12px;
    opacity: 0.5;
  }

  .huaborder{
    background-image: url("../../common/img/huaborder.png");
    background-repeat: no-repeat;
    height: 108px;
    width: 1%;
  }
  .whitebox{
    box-sizing: border-box;
    background-image: url("../../common/img/whitebox.png");
    height: 108px;
    width: 35%;
    padding-left: 10px;
    text-align: center;
  }
  .maizuo{
    padding-top: 35px;
    font-size: 18px;
    color: #e36f0d;
  }

  .cinema{
    margin-top: 7px;
    font-size: 12px;
    color: #c6c6c6;
    text-decoration: line-through;
  }

  .whiteborder{
    background-image: url("../../common/img/whiteborder.png");
    height: 108px;
    width: 5%;
    background-repeat: no-repeat;
  }

  .tong{
    padding-right: 10px;
    float: right;
    color: #b4b4b4;
    font-size: 12px;
  }

  .tong i {
    font-size: 16px;
    color: #b4b4b4;
  }
</style>
