<template>

  <div class="content">
    <div class="content_title">{{thisdata.hall.name}}银幕方向</div>
    <div class="content_count" id="content_count"></div>
    <div class="content_seats" id="content_seats"></div>
  </div>

</template>

<script>
  export default {
    name: '',
    data () {
      return {
        time: '',
        thisdata: '',
        ceatingchart: ''
      }
    },
    methods: {
      getshowat: function (time) {
        return new Date(time).getFullYear() + '-' + (new Date(time).getMonth() + 1) + '-' + new Date(time).getDate() + ' ' + new Date(time).getHours() + ':' + new Date(time).getMinutes()
      }
    },
    mounted () {
      this.time = new Date().getTime()
      this.$request({
        type: 'get',
        url: '/api/schedule/' + '953185802' + '?__t=' + this.time,
        success: function (res) {
          this.thisdata = res.data.data.schedule
          console.log(res.data.data.schedule)
        },
        failed: function (error) {
          console.log(error)
        }
      })
      this.$request({
        type: 'get',
        url: '/api/seating-chart/' + '953185802' + '?__t=' + this.time + '&partyId=&fundingId=',
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
}

.content_title{
  width: 320px;
  color: rgba(0,0,0,0.26);
  text-align: center;
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.26);
  margin: 20px auto;
  line-height: 25px;
  font-size: 14px;
}

.content_seats{
  position: relative;
  float: left;
  margin-left: 10px;
}
.content_count{
  float: left;
  margin-left: 20px;
}

</style>
