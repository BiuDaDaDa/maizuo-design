<template>
  <div class="body">
    <div class="all">
      <div class="info clearfix">
        <div class="left">
          <img src="https://mall.s.maizuo.com/b08ea64ad248ffc6eb88ed56366fe3b4.jpg" alt="">
        </div>
        <div class="right">
          <div class="right-header">
            <span class="count">×1</span>
            <div class="name">休闲女包动漫百搭帆布鞋</div>
          </div>
          <div class="spe">狮子座</div>
          <div class="price">￥88.00</div>
        </div>
        <div class="info-dash"></div>
      </div>
      <div class="address">
        <div class="address-arrow-wrap">
          <div class="address-arrow-icon-wrap">
            <img class="iconfont icon-arrow-right arrow-right address-right-arrow" src="img/rightarrows.png" alt="">
          </div>
        </div>
        <div class="address-info clearfix">
          <div class="consignee">xxx</div>
          <div class="address-right">
            <div class="tel">18888888888</div>
            <div class="detail">地球🌎</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import bus from '../../../common/js/eventBus'

  export default {
    name: 'MyOrder',
    data () {
      return {
        pathlist: ''
      }
    },
    mounted () {
      var _this = this
      bus.$on('infoChange', function (busbyvalue) {
        _this.pathlist = busbyvalue
        console.log(this.pathlist)
      })
    }
  }
</script>

<style scoped lang="less">
  .body {
    position: relative;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #ebebeb;
    height: 100%;
    width: 100%;
  }
  .add_bg{
    background: #ebebeb;
  }

  .all {
    margin-bottom: 50px;
  }

  .info {
    width: 100%;
    padding: 10px 16px;
    background-color: #fff;
    position: relative;
  }

  .left {
    text-align: center;
    float: left;
  }

  .left img {
    height: 67px;
    width: 67px;
  }

  .righe {
    width: 76%;
    padding-left: 11px;
    float: left;
  }

  .right-header {
    height: 20px;
  }

  .count {
    float: right;
    line-height: 20px;
    font-size: 14px;
  }

  .name {
    line-height: 20px;
    font-size: 14px;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .spe {
    margin: 5px 0;
    font-size: 11px;
    line-height: 15px;
    color: #000;
    opacity: .54;
  }

  .price {
    font-size: 14px;
    line-height: 20px;
    color: #ff5000;
  }

  .info-dash {
    height: 3px;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    background: url("img/jiao.png") repeat-x bottom #fff;
  }
</style>
