<template>
  <div>
    <div
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="100"
      class="being-list-s">
      <div v-for="item in updatea" class="clearfix">
        <div class="item clearfix even">
          <!--这里可以跳转下一页面-->
          <a :href="'#!/item/'+ item.id">
            <div class="logo">
              <img :src="item.image" alt="">
              <div class="name">{{item.name}}</div>
              <div class="content">
                <span class="price">{{item.price / 100}}.00</span>
                <span class="inventory">已售{{item.salesCount}}</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div class="loading">貌似没有更多了~</div>
  </div>
</template>

<script>
  export default {
    name: 'MyStore2',
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
        url: 'app/active?id=' + userId1 + '&page=' + this.lists + '&pageSize=20',
        headers: {},
        params: {},
        success: function (res) {
          this.showing = res.data.data.products
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
          url: 'app/active?id=' + userId2 + '&page=' + this.lists + '&pageSize=20',
          headers: {},
          params: {},
          success: function (res) {
            this.showing1 = res.data.data.products
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
    font-size: 12px;
    font-weight: 800;
  }
</style>
