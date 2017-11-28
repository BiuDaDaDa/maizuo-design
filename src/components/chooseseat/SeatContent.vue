<template>
  <div class="content" id="control" ref="contentWH">
    <div class="content_title">{{name}}银幕方向</div>
    <div class="content_count" id="content_count"></div>
    <div class="content_seats" id="content_seats"></div>
  </div>
</template>

<script>
  import bus from '../../common/js/eventBus'
  export default {
    props: ['isBusChangeContent'],
    name: '',
    data () {
      return {
        time: '',
        thisdata: '',
        ceatingchart: '',
        name: '',
        shopId: 0
      }
    },
    methods: {
      getUrl: function (name) {
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        let r = window.location.search.substr(1).match(reg)
        if (r !== null) return decodeURI(r[2])
        return null
      },
      getshowat: function (time) {
        return new Date(time).getFullYear() + '-' + (new Date(time).getMonth() + 1) + '-' + new Date(time).getDate() + ' ' + new Date(time).getHours() + ':' + new Date(time).getMinutes()
      },
      // 渲染数据
      drawData: function () {
        this.time = new Date().getTime()
        let shopId = this.getUrl('shopId')
        this.shopId = shopId
        this.$request({
          type: 'get',
          url: '/api/schedule/' + this.shopId + '?__t=' + this.time,
          success: function (res) {
            this.thisdata = res.data.data.schedule
            this.name = res.data.data.schedule.hall.name
          },
          failed: function (error) {
            console.log(error)
          }
        })
        this.$request({
          type: 'get',
          url: '/api/seating-chart/' + this.shopId + '?__t=' + this.time + '&partyId=&fundingId=',
          success: function (res) {
            console.log(res.data.data.seatingChart)
            this.ceatingchart = res.data.data.seatingChart
            for (let i = 1; i <= this.ceatingchart.height; i++) {
              let div1 = document.createElement('div')
              document.getElementById('content_count').appendChild(div1)
              div1.innerHTML = i
              div1.style.color = '#aaa'
              div1.style.fontSize = '12px'
              div1.style.lineHeight = '17px'
              div1.style.textAlign = 'left'
            }
            for (let i = 0; i < this.ceatingchart.seats.length; i++) {
              let div3 = document.createElement('div')
              document.getElementById('content_seats').appendChild(div3)
              div3.style.position = 'absolute'
              div3.style.left = ((this.ceatingchart.seats[i].column - 1) * 12) + ((this.ceatingchart.seats[i].column - 1) * 5) + 'px'
              div3.style.top = ((this.ceatingchart.seats[i].row - 1) * 12) + ((this.ceatingchart.seats[i].row - 1) * 5) + 'px'
              div3.style.width = '12px'
              div3.style.height = '12px'
              div3.style.border = '1px solid #b4b4b4'
              div3.style.borderRadius = '2px'
            }
          },
          failed: function (error) {
            console.log(error)
          }
        })
      }
    },
    watch: {
      isBusChangeContent (newValue) {
        this.shopId = newValue[0]
      }
    },
    mounted () {
      this.drawData()
      // 滚轮事件封装函数
      function MouseWheel (obj, callback) {
        var Firefox = window.navigator.userAgent.indexOf('Firefox')
        if (Firefox > 0) {
          // 火狐浏览器
          obj.addEventListener('DOMMouseScroll', progress, false)
        } else {
          // 非火狐浏览器
          obj.onmousewheel = progress
        }
        function progress (e) {
          var ef = e || window.event
          var down = true
          if (ef.detail) {
            // 火狐
            if (ef.detail < 0) {
              down = false
            }
          } else {
            // 非火狐
            if (ef.wheelDelta > 0) {
              down = false
            }
          }
          callback(down)
        }
      }
      MouseWheel(document, function (down) {
        if (down) {} else {}
      })
      let _this = this
      bus.$on('go', function () {
        _this.drawData()
      })
    }
  }
</script>

<style scoped lang="less">
  .content {
    width: 100%;
    overflow: hidden;
    background: #fff;
    position: absolute;
    top: 118px;
    left: 0;
    bottom: 0;
    right: 0;
    margin-top: 20px;
    overflow-x: scroll;
    overflow-y: scroll;
  }
  .content_title {
    width: 320px;
    color: rgba(0, 0, 0, 0.26);
    text-align: center;
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.26);
    margin: 20px auto;
    line-height: 25px;
    font-size: 14px;
  }
  .content_seats {
    position: relative;
    float: left;
    margin-left: 10px;
  }
  .content_count {
    float: left;
    margin-left: 20px;
  }

</style>
