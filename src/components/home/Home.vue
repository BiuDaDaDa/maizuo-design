<template>
  <div>
    <div class="wrap">
      <div class="top">
        <mt-swipe :auto="4000" :show-indicators="false">
          <mt-swipe-item v-for="(val, index) in thisdata" :key="index">
            <img :src="val.imageUrl" alt="">
          </mt-swipe-item>
          <mt-swipe-item v-for="(val, index) in thisdata" :key="index">
            <img :src="val.imageUrl" alt="">
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="content">
        <ul>
          <li v-for="(val, index) in thisfilm" ref="playing" @click="playingclicked(index)">
            <router-link to="/film">
              <img :src="val.cover.origin" alt="">
              <div class="film_name">
                <p v-html="val.name"></p>
                <p style="color: #9a9a9a;">{{val.cinemaCount}}家影院上映&nbsp;{{val.watchCount}}人购票</p>
              </div>
              <h2 class="film_grade">{{val.grade}}</h2>
            </router-link>
          </li>
        </ul>
        <button class="now_playing">更多热映电影</button>
        <div class="coming_line">
          <div class="upcoming">即将上映</div>
        </div>
        <ul>
          <li v-for="(val, index) in thiscoming">
            <img :src="val.cover.origin" alt="">
            <div class="film_coming">
              <div v-html="val.name" style="font-size: 13px;float: left;margin-left: 10px"></div>
              <div v-html="getLocalTime(val.premiereAt) + '上映'"
                   style="font-size: 14px;color: rgb(245, 162, 125);float: right;margin-right: 50px"></div>
            </div>
          </li>
        </ul>
        <button class="now_playing">更多即将上映电影</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data () {
      return {
        thisdata: '',
        time: '',
        thisfilm: '',
        thiscoming: '',
        thisid: ''
      }
    },
    methods: {
      getLocalTime: function (nS) {
        return (new Date(parseInt(nS)).getMonth() + 1) + '月' + (new Date(parseInt(nS)).getDate() + '日')
      },
      playingclicked: function (index) {
        this.thisid = this.thisfilm[index].id
        this.$router.push('/film/' + this.thisid)
      }
    },
    mounted () {
      this.time = Date.parse(new Date())
      this.$request({
        type: 'get',
        url: '/api/billboard/home?__t=' + this.time,
        headers: {},
        params: {},
        success: function (res) {
          this.thisdata = res.data.data.billboards
        },
        failed: function (err) {
          console.log(err)
        }
      })
      this.$request({
        type: 'get',
        url: '/api/film/now-playing?__t=' + this.time + '&page=1&count=5',
        headers: {},
        params: {},
        success: function (res) {
          this.thisfilm = res.data.data.films
        },
        failed: function (err) {
          console.log(err)
        }
      })
      this.$request({
        type: 'get',
        url: '/api/film/coming-soon?__t=' + this.time + '&page=1&count=3',
        headers: {},
        params: {},
        success: function (res) {
          this.thiscoming = res.data.data.films
        },
        failed: function (err) {
          console.log(err)
        }
      })
    }
  }
</script>
<style scoped lang="less">
  @import "../../common/css/common-color";
  .top {
    width: 100%;
    height: 232.88px;
  }

  .top img {
    width: 100%;
  }

  mt-swipe {
    border: 0;
  }

  .wrap {
    background-color: #ebebeb;
  }

  ul {
    padding: 18px;
    padding-bottom: 0;
  }

  li {
    width: 380px;
    margin-bottom: 18px;
    background-color: #ffffff;
    overflow: hidden;
    box-shadow: 0.5px 0.5px 1px #a8a8a8;
  }

  li img {
    width: 100%;
  }

  .film_name p {
    font-size: @font-size-small;
    line-height: 15px;
  }

  .film_name {
    float: left;
    padding: 10px;
    text-align: left;
  }

  h2 {
    float: right;
    color: #f78360;
    line-height: 50px;
    font-size: @font-size-large;
    margin-right: 15px;
  }

  .content {
    width: 100%;
    text-align: center;
  }

  .now_playing {
    width: 160px;
    height: 30px;
    border: 1px solid #aaa;
    border-radius: 15px;
    margin: 0 auto 30px;
    text-align: center;
    line-height: 25px;
    font-size: 12px;
    color: #616161;
    background-color: #ebebeb;
  }

  .upcoming {
    width: 65px;
    height: 20px;
    margin: 0 auto;
    margin-bottom: -10px;
    border-radius: 5px;
    font-size: 10px;
    line-height: 20px;
    text-align: center;
    color: #eee;
    background-color: #a7a7a7;
  }

  .coming_line {
    position: relative;

    margin-bottom: 30px;
    border-bottom: 1px solid #a8a8a8;
  }

  .film_coming {
    overflow: hidden;
    line-height: 35px;
  }
</style>
