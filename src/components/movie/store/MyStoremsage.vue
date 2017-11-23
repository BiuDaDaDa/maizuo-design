<template>
  <div class="items">
    <div class="item-detail">
      <div class="item-body">
        <!--轮播图的-->
        <div class="carousel">
          <div class="slick-initialized">
            <mt-swipe :auto="3000" :show-indicators="true" :speed="500" :stopPropagation="true">
              <mt-swipe-item v-for="(image, index) in msagedata2.images" :key="index">
                <img :src="image" alt="">
              </mt-swipe-item>
            </mt-swipe>
          </div>
        </div>
        <!--商品介绍-->
        <div class="item-info">
          <div class="name">{{msagedata2.masterName}}</div>
          <div class="subname">{{msagedata2.slaveName}}</div>
          <div class="price">
            <div class="price">￥{{msagedata2.marketPrice / 100}}.00</div>
          </div>
          <div class="tips">
            <div class="express-fee" style="text-align: left">快递:{{msagedata2.score}}.00&nbsp;元</div>
            <div class="sold-amount">销量:{{msagedata2.salesCount}}</div>
            <div class="location" style="text-align: right">全国</div>
          </div>
        </div>
        <!--选择样式-->
        <div @click="attribute = true" class="sku-pick">
          <span>已选择:{{msagedata2.masterName}}</span>
          <span class="count-num">x 1</span>
          <div class="iconfont icon-arrow-right">&gt;</div>
        </div>
        <!--下边的图片展示-->
        <div class="img-all" v-html="msagedata3.desc"></div>
        <!--点击属性时的菜单-->
        <div v-if="attribute === true" class="sku-box">
          <div class="box-body">
            <div class="box-sku-info">
              <div class="box-sku-head clearfix">
                <div class="sku-pic">
                  <img :src="msagedata2.images" alt="">
                </div>
                <div class="sku-context">
                  <div class="price">￥{{msagedata2.marketPrice / 100}}.00</div>
                  <div class="name">选择&nbsp;&nbsp;规格&nbsp;&nbsp;数量</div>
                </div>
                <div>
                  <div @click="attribute = false" class="iconfont icon-close">×</div>
                </div>
              </div>
            </div>
            <!--款式-->
            <div class="sku-select">
              <div class="box-shu-list">
                <div class="option-name">{{msagedata4.name}}</div>
                <div v-for="(options, index) in msagedata4.item" @click="transform(index)" class="option-list">
                  <span ref="thisstyle">{{options}}</span>
                </div>
              </div>
            </div>
            <!--选择数量-->
            <div class="box-count">
              <div class="count-title">选择数量</div>
              <div class="count-body">
                <div class="count-type">
                  <span class="icon disable left" :style="jianstyle" @click="clicked">-</span>
                  <span class="center">{{amount}}</span>
                  <span class="count-no-border icon" @click="styleclick">+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--下面的购买-->
        <div class="item-bottom">
          <div class="item-footer-left">
            <div class="item-footer-home">
              <img class="iconfont icon-home" src="../store/img/shouye.png" alt="">
              <div class="foot-icon-text">首页</div>
            </div>
          </div>
          <div class="item-footer-right">立即购买</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MyStoremsage',
    data () {
      return {
        msagedata1: '',
        msagedata2: '',
        msagedata3: '',
        msagedata4: '',
        attribute: false,
        xiabiao: 0,
        amount: 0,
        jianstyle: 'border: 1px solid rgba(0, 0, 0, .4);color: #000;border-right: none;'
      }
    },
    mounted () {
      let idL = window.location.href.split('=')[1]
      this.$request({
        type: 'get',
        url: 'app/item?id=' + idL,
        headers: {},
        params: {},
        success: function (res) {
          this.msagedata1 = res.data.data
          this.msagedata2 = res.data.data.skuList[0]
          this.msagedata4 = res.data.data.options[0]
        },
        failed: function (err) {
          console.log(err)
        }
      })
      this.$request({
        type: 'get',
        url: '/app/item/desc?id=' + idL,
        headers: {},
        params: {},
        success: function (res) {
          this.msagedata3 = res.data.data
        },
        failed: function (err) {
          console.log(err)
        }
      })
    },
    methods: {
      transform: function (index) {
        this.xiabiao = index
        for (let i in this.msagedata4.item) {
          this.$refs.thisstyle[i].style.border = '1px solid rgba(0, 0, 0, 0.3)'
          this.$refs.thisstyle[i].style.color = ''
        }
        this.$refs.thisstyle[index].style.border = '1px solid #ff5000'
        this.$refs.thisstyle[index].style.color = '#ff5000'
        let idL = window.location.href.split('=')[1]
        this.$request({
          type: 'get',
          url: 'app/item?id=' + idL,
          headers: {},
          params: {},
          success: function (res) {
            this.msagedata2 = res.data.data.skuList[this.xiabiao]
          },
          failed: function (err) {
            console.log(err)
          }
        })
      },
      clicked: function () {
        if (this.amount < 2) {
          this.jianstyle = 'color: rgba(0,0,0,.3);border: 1px solid rgba(0,0,0,.3);border-right: none;'
          this.amount = 0
        } else {
          this.amount -= 1
        }
      },
      styleclick: function () {
        this.amount++
        this.jianstyle = 'border: 1px solid rgba(0, 0, 0, .4);color: #000;border-right: none;'
      }
    }
  }
</script>

<style lang="less">
  .items {
    margin: 0;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #ebebeb;
  }

  .item-detail {
    width: 100%;
    overflow-x: hidden;
  }

  .item-body {
    width: 100%;
    overflow-x: hidden;
  }

  .mint-swipe-items-wrap {
    position: relative;
    overflow: hidden;
    height: 414px;
  }

  .mint-swipe-indicator {
    width: 10px;
    height: 10px;
    display: inline-block;
    border-radius: 100%;
    background-color: gray;
    opacity: 0.8;
    margin: 0 3px;
  }

  .mint-swipe-indicators .mint-swipe-indicator.is-active {
    background: #000;
  }

  .carousel img {
    width: 100%;
  }

  .item-info {
    padding: 4px 10px;
    background: #fff;
  }

  .name {
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 8px;
  }

  .subname {
    font-size: 12px;
    color: #757575;
    margin-top: 4px;
  }

  .price {
    margin-top: 4px;
    color: #ff5000;
    font-size: 21px;
    font-weight: 700;
  }

  .tips {
    margin: 2px 0;
    font-size: 12px;
  }

  .sold-amount, .location, .express-fee {
    text-align: center;
    display: inline-block;
    width: 32%;
    color: #757575;
  }

  .sku-pick {
    margin: 10px 0;
    height: 45px;
    line-height: 45px;
    font-size: 14px;
    padding: 0 12px;
    background-color: #fff;
  }

  .count-num {
    margin-left: 2px;
  }

  .iconfont {
    float: right;
  }

  .item-bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 48px;
    border-top: 1px solid #ececec;
    background-color: #fff;
    z-index: 100;
    max-width: 600px;
  }

  .item-footer-left {
    float: left;
    width: 66%;
    height: 100%;
    text-align: left;
    line-height: 24px;
  }

  .item-footer-home {
    text-align: center;
    display: inline-block;
    width: 30%;
    height: 35px;
    padding: 4px 0;
    position: relative;
    top: 5px;
  }

  .icon-home {
    width: 28px;
    height: 25px;
    display: block;
    position: absolute;
    top: 0;
    left: 25px;
  }

  .foot-icon-text {
    font-size: 10px;
    margin-top: -8px;
    position: absolute;
    bottom: -3px;
    left: 26px;
    opacity: .54;
  }

  .item-footer-right {
    color: #fff;
    font-size: 16px;
    float: right;
    width: 33%;
    height: 100%;
    text-align: center;
    line-height: 48px;
    background-color: #ff5000;
  }

  .img-all {
    width: 100%;
  }

  .img-all p img {
    width: 100% !important;
    height: 100% !important;
    display: inherit;
  }

  .sku-box {
    height: 100%;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
    background-color: rgba(0, 0, 0, .3);
    max-width: 600px;
  }

  .box-body {
    background-color: #fff;
    position: absolute;
    width: 100%;
    bottom: 48px;
    max-width: 600px;
  }

  .box-sku-info {
    padding: 10px 10px 0;
  }

  .box-sku-head {
    box-sizing: border-box;
    overflow: hidden;
  }

  .sku-pic {
    float: left;
    width: 88px;
    height: 88px;
    border: 1px solid #e1e1e1;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 10px;
  }

  .sku-pic img {
    width: 100%;
    display: block;
  }

  .sku-context {
    float: left;
    margin-left: 16px;
  }

  .sku-context .price {
    font-size: 18px;
    margin-top: 40px;
    color: #ff5000;
  }

  .icon-close {
    position: absolute;
    right: 12px;
    top: 12px;
    border-radius: 50%;
    border: 1px solid #a2a2a2;
    color: gray;
    padding: 4px;
    height: 16px;
    width: 16px;
    text-align: center;
    line-height: 12px;
    font-size: 19px;
  }

  .sku-select {
    padding: 0 10px;
    max-height: 200px;
    overflow-y: scroll;
  }

  .box-shu-list {
    border-top: 1px solid #f2f2f2;
    overflow: hidden;
  }

  .option-name {
    margin-top: 8px;
    font-size: 14px;
  }

  .option-list {
    margin-bottom: 4px;
    float: left;
  }

  .option-list span {
    border: 1px solid rgba(0, 0, 0, .3);
    padding: 8px 16px;
    border-radius: 2px;
    font-size: 10px;
    margin: 4px 8px 4px 0;
    display: inline-block;
  }

  .box-count {
    border-top: 1px solid #f2f2f2;
    margin: 0 10px;
  }

  .count-title {
    margin: 12px 0 4px;
    font-size: 14px;
  }

  .count-body {
    margin: 8px 0;
  }

  .count-type {
    display: inline-block;
  }

  .count-type .icon {
    font-size: 20px;
    line-height: 24px;
  }

  .count-type .left {
    border-right: none;
    border-bottom-left-radius: 2px;
    border-top-left-radius: 2px;
  }

  .count-type span {
    line-height: 28px;
    float: left;
    height: 28px;
    color: #000;
    width: 40px;
    text-align: center;
    border: 1px solid rgba(0, 0, 0, .4);
  }

  .count-type .center {
    line-height: 28px;
    float: left;
    height: 28px;
    color: #000;
    width: 40px;
    text-align: center;
    border: 1px solid rgba(0, 0, 0, .4);
  }

  .count-type .count-no-border {
    border-left: none;
    border-bottom-right-radius: 2px;
    border-top-right-radius: 2px;
  }

  /*.count-body .count-type .disable {*/
  /*color: rgba(0, 0, 0, .3);*/
  /*border: 1px solid rgba(0, 0, 0, .3);*/
  /*border-right: none;*/
  /*}*/
</style>
