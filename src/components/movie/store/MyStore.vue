<template>
  <div class="category">
    <!-- 上边的标题-->
    <div class="detail-title">
      <img :src="showing2.image" alt="">
      <p>{{showing2.name}}</p>
    </div>
    <!--下边的商品-->
    <div
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="100"
      class="being-list-s">
      <div v-for="item in updatea" class="clearfix">
        <div class="item clearfix even">
          <!--这里可以跳转下一页面-->
          <a :href="'#!/item/'+ item.id">
            <div v-if="item.skuList.length >= 0" class="logo">
              <img :src="item.skuList[0].image" alt="">
              <div class="name">{{item.masterName}}</div>
              <div class="content">
                <span class="price">{{item.skuList[0].price / 100}}.00</span>
                <span class="inventory">已售{{item.displaySalesCount}}</span>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div class="loading">页面正在加载中，请稍后...</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MyStore',
    data () {
      return {
        showing: '',
        showing1: '',
        showing2: '',
        updatea: [],
        lists: 1,
        loading: false
      }
    },
    mounted () {
      let userId1 = window.location.href.split('=')[1]
      this.$request({
        type: 'get',
        url: 'app/category?id=' + userId1 + '&page=' + this.lists,
        headers: {},
        params: {},
        success: function (res) {
          this.showing2 = res.data.data
        },
        failed: function (res) {
          console.log(res)
        }
      })
      this.$request({
        type: 'get',
        url: 'app/category/items?id=' + userId1 + '&page=' + this.lists + '&num=20',
        headers: {},
        params: {},
        success: function (res) {
          this.showing = res.data.data.list
          this.updatea = this.showing
        },
        failed: function (res) {
          console.log(res)
        }
      })
    },
    methods: {
      loadMore () {
        let userId2 = window.location.href.split('=')[1]
        this.loading = true
        this.lists++
        this.$request({
          type: 'get',
          url: 'app/category/items?id=' + userId2 + '&page=' + this.lists + '&num=20',
          headers: {},
          params: {},
          success: function (res) {
            this.showing1 = res.data.data.list
            this.updatea = this.updatea.concat(this.showing1)
          },
          failed: function (res) {
            console.log(res)
          }
        })
        this.loading = false
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../common/css/reset";
  @import "../../../common/css/common-color";

  .detail-title {
    padding: 17px 20px;
    margin-bottom: 3px;
    background: #fff url(../store/img/asset.png) no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
  }

  .detail-title img {
    width: 50px;
    height: 50px;
    float: left;
  }

  .detail-title p {
    font-size: 16px;
    margin: 16px 0 16px 30px;
    width: 70%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
  }

  .being-list-s {
    background-color: #f2f2f2;
    min-height: 510px;
    padding-right: 10px;
    padding-left: 10px;
    overflow: hidden;
  }

  h1 {
    height: 50px;
    font-size: 20px;
  }

  .item {
    position: relative;
    float: left;
    width: 49.3%;
    text-align: center;
    padding-top: 5px;
    padding-right: 2.5px;
  }

  .logo {
    display: inline-block;
    width: 100%;
    background: #fff;
  }

  .logo img {
    width: 100%;
  }

  .logo .name {
    font-size: 12px;
    height: 34px;
    color: #323232;
    text-align: left;
    padding-left: 6px;
  }

  .logo .content {
    font-size: 12px;
    height: 34px;
    color: #323232;
    text-align: left;
    padding-left: 6px;
  }

  .content .price {
    font-size: 13px;
    color: #ff5000;
    padding-left: 6px;
  }

  .content .inventory {
    font-size: 9px;
    color: #999;
    margin-left: 15px;
  }

  .loading {
    height: 20px;
    text-align: center;
    line-height: 20px;
    color: gray;
    font-size: 14px;
    font-weight: 800;
  }
</style>
