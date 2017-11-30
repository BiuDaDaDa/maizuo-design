<template>
  <div class="app-store">
    <div class="banner">
      <div class="scoll-slider">
        <mt-swipe :auto="2000" :show-indicators="false">
          <mt-swipe-item><img :src="slider"></mt-swipe-item>
          <mt-swipe-item><img :src="slider"></mt-swipe-item>
        </mt-swipe>
      </div>
    </div>
    <ul class="shops">
      <li class="shop" v-for="(item,index) in this.shopList">
        <a @click="shopGo(index)"><img :src="item.imageSrc"></a>
        <div class="category-name">{{item.name}}</div>
      </li>
    </ul>
    <!--活动-->
    <div class="active clear">
      <!--活动组件-->
      <active-view></active-view>
      <!--end-->
    </div>
    <!--end-->
    <!--产品-->
    <div class="app-products clear">
      <div class="line"></div>
      <div class="active-title">—&nbsp;有品专区&nbsp;—</div>
      <!--产品组件-->
      <my-products></my-products>
    </div>
    <!--end-->
    <!--主题-->
    <div class="app-subject">
      <!--主题组件-->
      <my-subject></my-subject>
    </div>
    <!--end-->
    <!--推荐-->
    <div class="recommend">
      <!--推荐组件-->
      <my-recommend></my-recommend>
    </div>
    <!--end-->

  </div>

</template>

<script>
  import ActiveView from '../../components/store/Active.vue'
  import myProducts from '../../components/store/Products.vue'
  import mySubject from '../../components/store/Subject.vue'
  import myRecommend from '../../components/store/Recommend.vue'

  export default {
    name: '',
    data () {
      return {
        slider: '', // 轮播数据
        shopList: [], // 导航列表数据
        id: []
      }
    },
    components: {
      ActiveView,
      myProducts,
      mySubject,
      myRecommend
    },
    mounted () {
      this.$request({
        type: 'get',
        url: '/app/ad/list',
        success: function (res) {
          this.slider = res.data.data[8].imageSrc
          let allData = res.data.data
          for (var i = 0; i < 8; i++) {
            this.shopList.push(allData[i])
            let str = allData[i].url
            this.id.push(str.split('category/')[1])
          }
        },
        failed: function (err) {
          console.log(err)
        }
      })
    },
    methods: {
      shopGo: function (index) {
        this.$router.push({name: 'MyStore', query: {Id: this.id[index]}})
      }
    }
  }
</script>

<style scoped lang="less">
  .clear {
    clear: both;
  }

  /*内容*/
  .app-store {
    overflow-x: hidden;
  }

  .banner {
    width: 100%;
  }

  .scoll-slider {
    height: 119px;
  }

  .scoll-slider img {
    width: 100%;
    text-align: center;
    margin: 0 auto;
  }

  .shops {
    background-color: #fff;
    padding: 15px 0;
  }

  .shop {
    width: 25%;
    height: 100%;
    margin: 8px 0;
    text-align: center;
    display: inline-block
  }

  .shop img {
    width: 40px;
  }

  .category-name {
    font-size: 12px;
    text-align: center;
    color: #323232;
  }
  .app-products {

  }

  .line {
    height: 8px;
    background: #f2f2f2;
  }

  /*产品专区*/
  .active-title {
    height: 13px;
    font-size: 13px;
    line-height: 13px;
    text-align: center;
    margin-top: 10px;
    color: #323232;
  }

  .app-subject {
    width: 100%;
  }
</style>
