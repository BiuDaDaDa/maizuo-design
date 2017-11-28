<template>
  <div class="wrap">
    <div class="image">
      <img src="//static.m.maizuo.com/v4/static/app/asset/66461d1a02a9eaa64876c90952c42aed.png" alt="">
    </div>
    <div class="wrapMiddle">
      <!--预定电影-->
      <div class="Book">
        <div class="Book-left">
          <i class="iconfont icon-yizizhengmian"></i>
        </div>
        <div class="Book-right">
          <h3>订座票</h3>
          <span>选好场次及座位，到影院自助机取票</span>
        </div>
        <button class="buy buyBook" @click="GoToMovieSelect">立即订座</button>
      </div>
      <!--通兑票-->
      <div class="ticket" v-if="showticket">
        <div class="ticket-left">
          <i class="iconfont icon-piaoquan"></i>
        </div>
        <div class="ticket-right">
          <h3>通兑票</h3>
          <span>有效期内到影院前台兑换影票</span>
        </div>
        <button class="buy buyticket" @click="GoToItem">立即订票</button>
      </div>
      <!--小卖品-->
      <div class="goods" v-if="showgoods">
        <div class="goods-left">
          <i class="iconfont icon-iconfontcola"></i>
        </div>
        <div class="goods-right">
          <h3>小卖品</h3>
        </div>
        <button class="buy buygoods">购买</button>
      </div>
      <!--电影院地址框-->
      <div class="address">
      <div class="address-left">
        <i class="iconfont icon-dingwei"></i>
      </div>
      <div class="address-right">
        <h4>{{msg.address}}</h4>
      </div>
    </div>

      <!--电话框-->
      <div class="phone">
        <div class="phone-left">
          <i class="iconfont icon-dianhua"></i>
        </div>
        <div class="phone-right">
          <h4 v-for="phone in msg.telephones">
            {{phone}}
          </h4>
        </div>
      </div>
    </div>

    <div class="TabTag">
      <ul class="tabBody">
        <li class="box" v-for="(item,index) in 5" @click="clickTab(index)" :class="{active:index === num}">
          <div class="liwrap">
                <span :class="{isActive: index === num}">
                  <i class="iconfont" :class="iName[index]"></i>
                </span>
            <div>{{spanName[index]}}</div>
          </div>
        </li>
      </ul>
      <div class="tabcontainer">
        <div class="selectTab" v-for="(item,index) in 5" v-show="index === num">
          {{container[index]}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    data () {
      return {
        showticket: false,
        showgoods: false,
        msg: '',
        itemMsg: '',
        iName: ['icon-piaowu', 'icon-Dyanjing', 'icon-wode-tingche', 'icon-shengrilibao-copy', 'icon-piaowu'],
        spanName: ['取票', '3D', '停车', '优惠', '交通'],
        spanNameCopy: ['取票', '3D', '停车', '优惠', '公交'],
        container: [],
        num: 0,
        bodyContainer: ''
      }
    },
    methods: {
      setshow () {
        for (let i = 0; i < this.itemMsg.length; i++) {
          if (this.itemMsg[i].type === 1 || this.itemMsg[i].type === 17) {
            this.showticket = true
          }
          if (this.itemMsg[i].type === 6) {
            this.showgoods = true
          }
        }
      },
      clickTab (index) {
        this.num = index
      },
      GetData () {
        let arr = this.msg.services
        for (let i = 0; i < this.spanNameCopy.length; i++) {
          for (let j = 0; j < arr.length; j++) {
            if (this.spanNameCopy[i] === arr[j].name) {
              this.container[i] = arr[j].description
            }
          }
          if (this.container[i] === undefined) {
            this.container[i] = '暂无信息'
          }
        }
      },
      GoToMovieSelect () {
        this.$router.push(`/cinema/${this.$route.params.id}/film`)
      },
      GoToItem () {
        this.$router.push(`/cinema/${this.$route.params.id}/film/item`)
      }
    },
    mounted () {
      let time = new Date().getTime()
      this.$request({
        type: 'get',
        url: `/api/cinema/${this.$route.params.id}/?__t=${time}`,
        success: function (res) {
          this.msg = res.data.data.cinema
          this.GetData()
        },
        failed: function (error) {
          console.log(error)
        }
      })
      this.$request({
        type: 'get',
        url: `/api/cinema/${this.$route.params.id}/item?__t=${time}`,
        success: function (res) {
          this.itemMsg = res.data.data.items
          console.log(this.itemMsg)
          this.setshow()
        },
        failed: function (error) {
          console.log(error)
        }
      })
    }
  }
</script>

<style scoped lang="less">
  @import '../../common/css/reset';
  @import '../../common/css/common-color';

  .image {
    width: 100%;
  }

  .image img {
    width: 100%;
  }

  .wrap {
    background-color: rgb(230, 230, 230);
    overflow: hidden;
  }

  .wrapMiddle {
    background-color: #f9f9f9;
    min-width: 286px;
  }

  /*购票按钮*/
  .buy {
    width: 94px;
    border-radius: 38px;
    height: 34px;
    border: none;
    font-size: 13px;
    position: absolute;
    background-color: #fe8233;
    color: @background-color-white;
    outline: none;
  }

  .buyticket{
    top: 35px;
    right: 50px;
    color: #fe8233;
    background-color: #fff;
    border: 1px solid #fe8233;
  }

  .buyBook{
    top: 35px;
    right: 50px;
  }

  .buygoods{
    top: 35px;
    right: 50px;
  }

  .wrapMiddle > div {
    width: 100%;
    padding: 25px 17px 0;
    display: flex;
    justify-content: space-between;
    text-align: center;
  }

  /*订座位*/
  .Book{
    position: relative;
  }
  .Book-left {
    color: #ff8160;
    font-size: 25px;
    width: 10%;
    margin: 23px 17px 0 0;
  }

  .Book-right {
    width: 85%;
    text-align: left;
    font-size: 12px;
    color: #737373;
    padding-bottom: 25px;
    border-bottom: 1px #d6d6d6 dotted;
  }

  .Book-right h3 {
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 15px;
    color: #000;
  }

  /*通兑票*/
  .ticket{
    position: relative;
  }
  .ticket-left {
    color: #7bafe1;
    font-size: 25px;
    width: 10%;
    margin: 23px 17px 0 0;
  }

  .ticket-right {
    width: 85%;
    text-align: left;
    font-size: 12px;
    color: #737373;
    padding-bottom: 25px;
    border-bottom: 1px #d6d6d6 dotted;
  }

  .ticket-right h3 {
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 15px;
    color: #000;
  }


  /*小卖品*/
  .goods{
    position: relative;
  }
  .goods-left {
    color: #7bafe1;
    font-size: 28px;
    width: 10%;
    margin: 23px 17px 0 0;
  }

  .goods-right {
    width: 85%;
    text-align: left;
    font-size: 12px;
    color: #737373;
    padding-bottom: 25px;
    border-bottom: 1px #d6d6d6 dotted;
  }

  .goods-right h3 {
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 15px;
    color: #000;
  }

  /*电影院地址*/
  .address-left {
    box-sizing: border-box;
    color: #7bafe1;
    font-size: 28px;
    width: 10%;
    margin: 15px 17px 0 0;
  }

  .address-right {
    box-sizing: border-box;
    width: 100%;
    text-align: left;
    padding-bottom: 25px;
    border-bottom: 1px #d6d6d6 dotted;
  }

  .address-right h4 {
    font-size: 14px;
    color: #000;
    margin: 10px 0;
    width: 90%;
  }

  /*电话*/
  .phone-left {
    color: #ff8160;
    font-size: 28px;
    width: 10%;
    margin: 15px 17px 0 0;
  }

  .phone-right {
    width: 85%;
    text-align: left;
    padding-bottom: 25px;
  }

  .phone-right h4 {
    font-size: 14px;
    color: #000;
    margin: 10px 0;
  }

  /*切换*/
  .TabTag {
    width: 100%;
    margin-top: 15px;
    background-color: #f9f9f9;
    padding: 15px 40px;
    box-sizing: border-box;
  }

  .myTag {
    width: 80%;
    display: flex;
    justify-content: space-between;
  }

  .active {
    border-bottom: 3px solid #fe8233;

  }

  .liwrap .isActive i {
    color: #fe8233;
  }

  .tabBody {
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
  }

  .tabBody li {
    padding: 0 12px;
  }

  .liwrap i {
    font-size: 38px;
    color: #ccc;
    border-radius: 50%;
  }

  .liwrap div {
    text-align: center;
    padding: 10px 0;
    font-size: 13px;
    color: #737373;
  }

  .tabcontainer {
    margin-top: 15px;
  }

  .selectTab{
    font-size: 12px;
    margin: 0 0 10px;
    color: #333;
  }


</style>
