<template>
  <div>
    <div class="wrap" v-if="thisdata != ''">
      <img :src="thisdata.cover.origin">
      <div class="content" style="padding-top: 15px">
        <p style="border-left: 16px solid rgb(228, 200, 156);padding-left: 4px;line-height: 18px;font-size: 16px;">影片简介</p>
        <div class="film_content">
          <p class="film_word">
            <span>导</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>演：</span><span>{{thisdata.director}}</span>
          </p>
          <p class="film_word" style="overflow: hidden;white-space: nowrap">
            <span>主</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>演：</span><span v-for="val in thisdata.actors">{{val.name}}  </span>
          </p>
          <p class="film_word">
            <span>地区语言：</span><span>{{thisdata.nation}}</span><span>({{thisdata.language}})</span>
          </p>
          <p class="film_word">
            <span>类</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>型：</span><span>{{thisdata.category}}</span>
          </p>
          <p class="film_word">
            <span>上映日期：</span><span v-html="getLocalTime(thisdata.premiereAt)"></span><span>上映</span>
          </p>
          <p class="film_word">{{thisdata.synopsis}}</p>
        </div>
      </div>
      <div class="button" v-if="buy"  >
        <router-link :to="'/film/' + thisid + '/cinema'"><button @click="cinemaclicked">立即购票</button></router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PlayFilm',
    data () {
      return {
        thisdata: '',
        time: '',
        now: '',
        buy: false,
        thisid: ''
      }
    },
    mounted () {
      this.time = Date.parse(new Date())
      this.$request({
        type: 'get',
        url: '/api/film/' + this.$route.params.id + '?__t=' + this.time,
        headers: {},
        params: {},
        success: function (res) {
          this.thisdata = res.data.data.film
//          console.log(this.thisdata)
          this.thisid = this.thisdata.id
          if (this.thisdata.premiereAt <= this.time) {
            this.buy = true
          }
        },
        failed: function (err) {
          console.log(err)
        }
      })
    },
    methods: {
      getLocalTime: function (nS) {
        return (new Date(parseInt(nS)).getMonth() + 1) + '月' + (new Date(parseInt(nS)).getDate() + '日')
      },
      cinemaclicked: function () {
        this.$router.push('/film/' + this.thisid + '/cinema')
      }
    }
  }
</script>

<style scoped lang="less">

  img{
    width: 100%;
  }

  .wrap{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    background-color: #e1e1e1;
    padding-top: 50px;
  }
  .film_content{
    padding: 20px;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: 0.02em;
    padding-right: 15px;
  }
  .content{

  }
  .film_word{
    margin-bottom: 10px;
  }
  button{
    font-size: 14px;
    min-width: 156px;
    height: 36px;
    line-height: 36px;
    border: none;
    background-color: #fe8233;
    padding: 0;
    margin: 0;
    border-radius: 18px;
    color: #fff;
    -webkit-transition: 0.5s ease;
    outline: none;
  }
  .button{
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 20px;
    text-align: center;
    margin: 0 auto;
  }
</style>
