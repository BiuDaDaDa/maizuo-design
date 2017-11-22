<template>
  <div class="container">
    <div class="title">—&nbsp;好货精选&nbsp;—</div>
    <div class="items">
      <div class="tailloader">
        <div class="item" v-for="item in RecommendData">
          <div class="item-pic">
            <img :src="item.skuList[0].image">
            <div class="name">{{item.masterName}}</div>
            <div class="content">
              <span class="item-price">￥{{item.skuList[0].price}}</span>
              <span class="inventory">
                已售:
              </span>
            </div>
          </div>
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
        RecommendData: [],
        show: '',
        loading: false,
        pageNum: 1,
        total: 377
      }
    },
    mounted () {
      // 数据请求
      this.$request({
        type: 'get',
        url: 'app/recommend/home?page=' + this.pageNum + '&num=20',
        success: function (res) {
          this.total = res.data.data.total
          this.RecommendData = res.data.data.list
        },
        failed: function (err) {
          console.log(err)
        }
      })
      // 封装的页面到达底部
      let _this = this
      window.document.body.onscroll = function () {
        // 获取
        var sTop = document.body.scrollTop || document.documentElement.scrollTop
        sTop = Math.floor(sTop)
        var winH = document.documentElement.clientHeight
        // 整体高度
        var pageH = document.documentElement.scrollHeight
        // 页面滚动到底部
        if (sTop + winH === pageH - 1 || sTop + winH === pageH) {
          _this.getData()
        }
      }
    },
    methods: {
      getData () {
        if (this.pageNum === this.total) {
          this.pageNum = this.total
        } else {
          this.getRequstData()
        }
      },
      getRequstData () {
        this.pageNum++
        console.log(this.pageNum)
        this.$request({
          type: 'get',
          url: 'app/recommend/home?page=' + this.pageNum + '&num=20',
          success: function (res) {
            this.total = res.data.data.total
            this.show = res.data.data.list
            this.RecommendData = this.RecommendData.concat(this.show)
          },
          failed: function (err) {
            console.log(err)
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  body {
    font-family: \\5FAE\8F6F\96C5\9ED1;
    margin: 0;
  }
  * {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font-weight: normal;
    vertical-align: baseline;
  }

  .clear {
    clear: both;
  }

  div {
    box-sizing: border-box;
  }

  .container {
    margin: 0 auto;
    max-width: 600px;
    min-width: 320px;
  }

  .title {
    height: 33px;
    background-color: #f2f2f2;
    line-height: 33px;
    font-size: 13px;
    text-align: center;
    color: #323232;
    margin-bottom: -5px;
  }

  .items {
    background-color: #f2f2f2;
    min-height: 100%;
    padding-right: 10px;
    padding-left: 10px;
    width: 100%;

  }

  .item {
    position: relative;
    float: left;
    width: 50%;
    text-align: center;
    padding-top: 5px;

  }

  .item-pic {
    display: inline-block;
    background: #fff;
    padding-left: 10px;
  }

  .item-pic img {
    width: 100%;
  }

  .name {
    font-size: 12px;
    height: 34px;
    color: #323232;
    text-align: left;
    padding-left: 6px;
  }

  .content {
    text-align: left;
    padding-bottom: 10px;
  }

  .item-price {
    font-size: 13px;
    color: #ff5000;
    padding-left: 6px;
    text-align: center;
  }

  .inventory {
    font-size: 9px;
    color: #999;
    margin-left: 15px;
  }

</style>
