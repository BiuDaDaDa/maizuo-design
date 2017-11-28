<template>
  <div class="app-view">
    <section class="schedule-detail-view">
      <!--顶部信息栏-->
      <article class="information-wrapper">
        <div class="information">
          <div class="left">
            <h3>{{name}}</h3>
            <p>
              <span class="information-time">{{time}}</span>
              <span></span>
              <span class="information-type">{{type}}</span>
            </p>
          </div>
          <div class="right">
            <button class="change-schedule" @click="changePlace">换一场</button>
          </div>
        </div>
      </article>
      <!--end-->
      <!--选座区域-->
      <article class="seating-chart">
        <!--选坐组件区域-->
           <my-content :isBusChangeContent="[changeNum]"></my-content>
      </article>
      <!--end-->
      <!--底部换场-->
      <div v-show="this.changeShow">
        <my-footer @changeMask="changePlaceMask" :isBus="[changePriceData]" @changePbus="changePbus"></my-footer>
      </div>
      <!--end-->
    </section>
  </div>
</template>

<script>
  import myFooter from '../../components/chooseseat/Footer.vue'
  import myContent from '../../components/chooseseat/SeatContent.vue'
  export default {
    name: '',
    data () {
      return {
        changeShow: false, // 换场
        name: '', // 影院名称
        time: '', // 时间
        type: '', // 电影类型
        changePriceData: {}, // 换场数据
        allData: {},
        changeNum: 0
      }
    },
    components: {
      myFooter,
      myContent
    },
    mounted () {
      let shopId = this.getUrl('shopId')
      let nowDate = new Date()
      let time = nowDate.getTime()
      this.$request({
        type: 'get',
        url: '/api/schedule/' + shopId + '?__t=' + time,
        success: function (res) {
          let allData = res.data.data.schedule
          this.name = allData.cinema.name
          let time = res.data.data.schedule.showAt
          let nowTime = new Date(time)
          this.type = res.data.data.schedule.imagery
          this.time = nowTime.toLocaleString()
        },
        failed: function (res) {
          console.log(res)
        }
      })
    },
    methods: {
      // 换场按钮
      changePlace: function () {
        document.cookie = 'co=maizuo'
        let nowDate = new Date()
        let timeT = nowDate.getTime()
        this.changeShow = true
        let cinemaId = this.getUrl('cinemaId')
        let filmId = this.getUrl('filmId')
        this.$request({
          type: 'get',
          url: '/api/schedule?__t=' + timeT + '&film=' + filmId + '&cinema=' + cinemaId,
          success: function (res) {
            console.log(res.data.data)
            this.changePriceData = res.data.data.schedules
          },
          failed: function (res) {
            console.log(res)
          }
        })
      },
      changePlaceMask: function () {
        this.changeShow = false
      },
      changePbus: function (num) {
      //  console.log(data) // 从footer传过来换场信息
        this.changeNum = num
        let nowDate = new Date()
        let time = nowDate.getTime()
        this.$request({
          type: 'get',
          url: '/api/schedule/' + num + '?__t=' + time,
          success: function (res) {
            let allData = res.data.data.schedule
            this.allData = allData
            this.name = this.allData.cinema.name
            let time = res.data.data.schedule.showAt
            let nowTime = new Date(time)
            this.time = nowTime.toLocaleString()
            this.type = res.data.data.schedule.imagery
          },
          failed: function (res) {
            console.log(res)
          }
        })
        this.changeShow = false
      },
      // 获取网址信息函数
      getUrl: function (name) {
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        let r = window.location.search.substr(1).match(reg)
        if (r !== null) return decodeURI(r[2])
        return null
      }
    }
  }
</script>

<style scoped lang="less">
  body, html {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 14px;
    line-height: 1.42857143;
    color: #333;
    background-color: #fff;
    margin: 0;
    padding: 0;
  }
  .clear {
    clear: both;
  }
  .app-view {
    width: 100%;
  }

  .schedule-detail-view {
    overflow: hidden;
  }
  .information-wrapper {
    background-color: #ebebeb;
    width: 100%;
    height: 90px;
    position: fixed;
    z-index: 1;
  }

  .information {
    padding: 12px 14px 12px 16px;
    background: #fff;
    width: 100%;
    margin: 10px 0;
    position: absolute;
  }

  .left {
    width: 70%;
    float: left;
  }

  .left h3 {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin: 0;
    padding: 0;
    color: #1b1b1b;
    line-height: 24px;
    font-size: 16px;
  }

  .right {
    float: right;
    margin-right: 20px;
  }

  .change-schedule {
    border-radius: 18px;
    transition: 0.5s ease;
    background-color: rgba(255, 255, 255, 0);
    border: 1px solid rgba(0, 0, 0, 0.26);
    overflow: hidden;
    color: #36bfd1;
    width: 100px;
    height: 36px;
    font-size: 14px;
    margin-top: 4px;
    outline: none;
  }

  .information-time {
    margin: 0;
    padding: 0;
    color: #6d6d6d;
    line-height: 20px;
    font-size: 14px;
  }

  .information-type {
    margin: 0;
    padding: 0;
    color: #6d6d6d;
    line-height: 20px;
    font-size: 14px;
  }
  .seating-chart {
    width: 100%;
    height:100%;
  }

</style>
