<template>
  <div
    v-infinite-scroll="loadMores"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="100"
    class="being-list-s">
    <div v-for="as in update" class="being-list">
      <div class="being-itme-img">
        <div class="being-itme-url">
          <img :src="as.poster.origin" alt="">
        </div>
      </div>

      <div class="being-desc">
        <div class="being-next">
          <div class="being-name">{{as.name}}</div>
          <div class="being-grade">
            <span class="being-symbol" style="font-weight: 100;color: #c6c6c6;line-height: 29px">&gt;</span>
          </div>
        </div>
        <div class="being-intro">{{as.intro}}</div>

        <div class="premiere-data">
          <span class="">{{getLocalTime(as.premiereAt)}}上映</span>
          &nbsp;&nbsp;
          <span>星期五</span>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BeAboutto',
    data () {
      return {
        showing: '',
        showing1: '',
        showing2: '',
        lists: 1,
        loading: false,
        update: [],
        newday: [
          {'content': '星期一'},
          {'content': '星期二'},
          {'content': '星期三'},
          {'content': '星期四'},
          {'content': '星期五'},
          {'content': '星期六'},
          {'content': '星期日'}
        ],
        week: '',
        urly: ''
      }
    },
    mounted () {
      this.$request({
        type: 'get',
        url: 'api/film/coming-soon?page=' + this.lists + '&count=7',
        headers: {},
        params: {},
        success: function (res) {
          this.showing = res.data.data.films
          this.showing2 = res.data.data.page
          this.update = this.showing
        },
        failed: function (res) {
          console.log(res)
        }
      })
    },
    methods: {
      loadMores () {
        if (this.lists === this.showing2.total) {
          this.lists = this.showing2.total
        } else {
          this.loading = true
          this.lists++
          console.log(this.lists)
          this.$request({
            type: 'get',
            url: 'api/film/coming-soon?page=' + this.lists + '&count=7',
            headers: {},
            params: {},
            success: function (res) {
              this.showing1 = res.data.data.films
              this.update = this.update.concat(this.showing1)
            },
            failed: function (res) {
              console.log(res)
            }
          })
          this.loading = false
        }
      },
      // 时间戳转换
      getLocalTime: function (nS) {
        this.week = this.newday[(new Date(parseInt(nS)).getDay()) - 1]
        return (new Date(parseInt(nS)).getMonth() + 1) + '月' + (new Date(parseInt(nS)).getDate() + '日')
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../common/css/reset";
  @import "../../common/css/common-color";

  /*.header-select .header-left {*/
  /*border: 0;*/
  /*!*color: #6a6a6a;*!*/
  /*}*/

  /*.header-select .header-right {*/
  /*border: 0;*/
  /*!*color: #6a6a6a;*!*/
  /*}*/

  .being-list {
    width: 100%;
    padding: 20px 0;
    border-bottom: dashed 1px #c9c9c9;
    cursor: pointer;
    overflow: hidden;
  }

  .being-itme-img {
    width: 60px;
    float: left;
    overflow: hidden;
  }

  .being-itme-url {
    background-size: 100%;
    background: url("beijing.png") no-repeat;
    height: auto;
    width: 100%;
  }

  .being-itme-url img {
    width: 100%;
  }

  .being-desc {
    padding-left: 15px;
    display: inline-block;
    width: 75%;
  }

  .being-next {
    font-size: @font-size-normal;
    line-height: 32px;
    color: #000;
    overflow: hidden;
  }

  .being-name {
    float: left;
    width: 200px;
    height: 32px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .being-grade {
    float: right;
    line-height: 32px
  }

  .being-grade > span {
    color: #fc7103;
  }

  .being-name .being-symbol {
    line-height: 29px;
    color: #c6c6c6
  }

  .being-intro {
    height: 24px;
    line-height: 24px;
    color: #8e8e8e;
    font-size: @font-size-small;
    overflow: hidden;
  }

  .being-counts {
    line-height: 24px;
    margin-top: 5px;
    color: #8e8e8e;
    font-size: @font-size-small;
  }

  .being-color1 {
    color: #8aa2bf;
  }

  .premiere-data {
    line-height: 30px;
    color: #ffb375;
    font-size: 12px;
    height: 30px;
  }
</style>
