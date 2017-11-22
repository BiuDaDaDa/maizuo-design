<template>
  <div>
    <div class="nav">
      <div class="list" @click="list_content_clicked"></div>
      <div class="nav_content" @click="list_show">
        <div class="title">卖座电影</div>
        <div class="me"></div>
        <router-link to="/CitySelect">
            <div class="city" ref="city">大连</div>
        </router-link>
      </div>
    </div>
    <div class="nav_desk"></div>
    <div class="list-content" :style="list_style">
      <ul v-for="val in this.lists" >
        <router-link :to="val.url"><li @click="list_show" :style="li_style">{{val.content}}</li></router-link>
      </ul>
    </div>
    <div class="desk" :style="desk_style" @click="list_show"></div>
  </div>
</template>

<script>
  import Bus from '../../common/js/eventBus'
  export default {
    name: 'Nav',
    data () {
      return {
        lists: [

          {'content': '首页', 'url': '/'},
          {'content': '影片', 'url': '/film/now-playing'},
          {'content': '影院', 'url': '/cinema'},
          {'content': '商城', 'url': '/store'},
          {'content': '我的', 'url': '/login'},
          {'content': '卖座卡', 'url': ''}
        ],
        list_style: {
          opacity: 0,
          right: 100 + '%'
        },
        desk_style: {
          opacity: 0,
          display: 'none'
        },
        li_style: {
          paddingLeft: 16 + 'px',
          paddingRight: 16 + 'px'
        }
      }
    },
    methods: {
      list_content_clicked: function () {
        if (this.list_style.opacity === 0) {
          this.list_style.opacity = 1
          this.list_style.right = 110 + 'px'
          this.li_style.paddingLeft = 16 + 'px'
          this.li_style.paddingRight = 16 + 'px'
          this.desk_style.opacity = 0.5
          this.desk_style.display = 'block'
        } else {
          this.list_style.opacity = 0
          this.list_style.right = 100 + '%'
          this.desk_style.opacity = 0
          this.desk_style.display = 'none'
          this.li_style.paddingLeft = 0
          this.li_style.paddingRight = 0
        }
      },
      list_show: function () {
        if (this.list_style.opacity === 1) {
          this.list_style.opacity = 0
          this.list_style.right = 100 + '%'
          this.desk_style.opacity = 0
          this.desk_style.display = 'none'
          this.li_style.paddingLeft = 0
          this.li_style.paddingRight = 0
        }
      }
    },
    created () {
      let that = this
      Bus.$on('GetCityName', function (cityName) {
        that.$refs.city.innerHTML = cityName
      })
    }

  }
</script>

<style scoped lang="less">
  @import "../../common/css/common-color";

  .nav {
    background: #282828;
    position: fixed;
    z-index: 500;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: auto;
    height: 50px;
    line-height: 50px;
    overflow: hidden;
  }

  .nav_desk{
    height: 50px;
  }

  .list {
    background-image: url(../../assets/liimg/list.png);
    background-repeat: no-repeat;
    background-position: center center;
    height: 50px;
    width: 48px;
    background-size: 17px;
    float: left;
    border-right: 1px solid #222;
    box-shadow: 1px 0 1px #363636;
    color: #999;
  }

  .title {
    color: white;
    font-size: @font-size-little;
    width: 84px;
    text-align: center;
    float: left;
  }

  .city {
    width: 80px;
    font-size: @font-size-little;
    text-align: center;
    color: #999999;
    float: right;
    background-image: url(../../assets/liimg/down.png);
    background-repeat: no-repeat;
    -webkit-background-size: 20px;
    background-size: 20px;
    background-position: right center;
  }

  .me {
    background-image: url(../../assets/liimg/User.png);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 17px;
    float: right;
    width: 48px;
    height: 50px;
  }

  .nav_content{
    overflow: hidden;
  }

  .list-content {
    border-top: 1px solid #222;
    box-shadow: 0 1px 1px #363636 inset;
    background: #282828;
    position: fixed;
    /*opacity: 1;*/
    top: 50px;
    bottom: 0;
    left: 0;
    transition: all ease 0.4s;
    z-index: 2;
  }

  li {
    color: #999;
    font-size: @font-size-little;
    border-bottom: 1px dotted #333;
    line-height: 50px;
    background-image: url(../../assets/liimg/right.png);
    background-repeat: no-repeat;
    background-size: 17px;
    background-position: 270px center;
  }

  .desk{
    background-color: black;
    opacity: 0.5;
    position: fixed;
    height: 100%;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    transition: all ease 0.4s;
    display: none;
  }
</style>
