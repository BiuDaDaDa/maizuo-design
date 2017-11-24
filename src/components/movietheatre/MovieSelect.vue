<template>
  <iscroll-view id="scroller" @scrollStart="log" ref="iscroll">
    <ul id="title_ul">
      <li class="boxItem" v-for="(img, index) in msg.filmList" @click="light(index)">
        <div class="filmImage">
          <p style="display: none">{{index}}</p>
          <img :src="img.posterAddress" alt="" ref="myimg">
          <span class="mask" ref='mask'></span>
        </div>
        <div class="filmName">
         <p>{{img.filmName}}</p>
        </div>
      </li>
    </ul>
  </iscroll-view>
</template>

<script>
  import Vue from 'vue'
  import IScrollView from 'vue-iscroll-view'
  import IScroll from 'iscroll'
  Vue.use(IScrollView, IScroll)
  export default {
    name: 'MovieSelect',
    data () {
      return {
        msg: ''
      }
    },
    methods: {
      log () {},
      light (index) {
        if (this.$refs.myimg[index].offsetWidth === 150) {
          this.$refs.mask[index].style.backgroundColor = 'rgba(0,0,0,0)'
        }
      }
    },
    mounted () {
      let time = new Date().getTime()
      this.$request({
        type: 'get',
        url: `/api/cinema/${this.$route.params.id}/film?__t=${time}`,
        success: function (res) {
          this.msg = res.data.data
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
  @import '../../common/css/reset';
  @import '../../common/css/common-color';

  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;

  }

  html {
    -ms-touch-action: none;
  }

  body,
  ul,
  li {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    border: 0;
  }

  #scroller {
    position: absolute;
    z-index: 1;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    width: 1760px;
    padding: 20px;
    padding-left: 150px;
    background-color: #38403e;
    height: 155px;
  }

  #scroller ul {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    text-align: center;
  }

  #scroller li {
    position: relative;
    display: block;
    float: left;
    height: 100%;
    width: 92px;
    padding: 0 10px;
    color: white;
    font-size: 14px;
  }

  #scroller li img {
    border: 1px solid #fff;
    width: 100%
  }

  .filmImage{
    position: relative;
    width: 100%;
  }

  .mask {
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
  }

  .filmName p{
    /*display: none;*/
    margin: 10px -20px;
    text-align: center;
    white-space: nowrap;
    font-size: 13px;
  }

</style>
