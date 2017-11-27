<template>
  <div class="wrap">
    <!--主页-->
    <div class="city">
      <!--表示一个地区-->
      <div class="district" v-for="(district,ind) in districts" ref="cinemas">
        <!--表示一个地区的名字-->
        <div class="disTitle">
          <ul>
            <li @click="ShowCinema(ind)">{{districts[ind].name}}</li>
          </ul>
        </div>
        <!--地区的所有电影院-->
        <div class="disBody" ref="show">
          <ul>
            <li class="box" v-for="(cinema,index) in district.cinemaList" ref="price">
              <div class="all" @click="showprice(ind, index)">
                <div class="liLeft">
                  <!--电影院名字-->
                  <div class="liLeft-top">
                    <span>{{cinema.name}}</span>
                    <span style="display: none">{{cinema.id}}</span>
                    <span class="zuo"></span>
                    <span class="tong"></span>
                  </div>
                  <!--电影院的优惠活动-->
                  <div class="liLeft-middle">
                  <span v-for="(label,index) in cinema.labels">
                    <span>{{label.name}}</span>
                  </span>
                  </div>
                  <!--电影院的地址-->
                  <div class="liLeft-bottom">
                    {{cinema.address}}
                  </div>
                  <!--电影院的距离-->
                  <div class="distance">
                    <span>距离未知</span> | <span>剩余{{cinema.avaliableSchedule}}场</span>
                  </div>
                </div>
                <div class="liRight">
                  <span class="price">￥{{cinema.minimumPrice}}</span>
                </div>
              </div>
              <div class="jiage">
                <div class="date" v-if="thisday != 0">
                  <span v-if="today != ''">今天({{thismonth + 1}}/{{thisday}})</span>
                  <span v-if="tomorrow != ''">明天({{thismonth + 1}}/{{thisday + 1}})</span>
                  <span v-if="aftertomorrow != ''">后天({{thismonth + 1}}/{{thisday + 2}})</span>
                  <span v-if="showat - thisday > 3">{{showat - thisday}}天后</span>
                </div>
                <div class="showlist" v-for="val in today" @click="isBusSelect">
                  <div class="showlist_top">
                    <div class="showlist_top_left">
                      <span>{{filmhours(val.showAt)}}</span>:<span>{{filmminutes(val.showAt)}}</span>
                    </div>
                    <div class="showlist_top_right">￥{{val.price.min + val.price.premium}}.00</div>
                  </div>
                  <div class="showlist_bottom">
                    <div class="showlist_bottom_left">
                      <span>预计</span><span>{{filmhours(val.showAt) + 2}}</span>:<span>{{filmminutes(val.showAt)}}</span>
                      <span>结束</span>/<span>{{val.film.language}}</span>
                      <span>{{val.imagery}}</span>/<span>{{val.hall.name}}</span>
                    </div>
                    <div class="showlist_bottom_right">
                      <span>￥{{val.price.cinema}}.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    data () {
      return {
        cinemas: '',
        districts: '',
        time: '',
        cinemasPrice: '',
        today: [],
        tomorrow: [],
        aftertomorrow: [],
        later: [],
        showat: '',
        thisday: '',
        thismonth: '',
        filmId: 0, // 电影id
        cinemaId: 0, // 影院影厅id
        shopId: 0 // 门店id
      }
    },
    methods: {
      filmhours (time) {
        return new Date(parseInt(time)).getHours()
      },
      filmminutes (time) {
        if (new Date(parseInt(time)).getMinutes() < 10) {
          return new Date(parseInt(time)).getMinutes() + '0'
        } else {
          return new Date(parseInt(time)).getMinutes()
        }
      },
      ShowCinema (ind) {
        if (this.$refs.show[ind].firstChild.style.display === 'block') {
          this.$refs.show[ind].firstChild.style.display = 'none'
        } else {
          this.$refs.show[ind].firstChild.style.display = 'block'
        }
      },
      showprice: function (ind, index) {
        if (this.$refs.cinemas[ind].lastChild.firstChild.childNodes[index].lastChild.style.display === 'block') {
          this.$refs.cinemas[ind].lastChild.firstChild.childNodes[index].lastChild.style.display = 'none'
        } else {
          this.$refs.cinemas[ind].lastChild.firstChild.childNodes[index].lastChild.style.display = 'block'

          this.$request({
            type: 'get',
            url: '/api/schedule?__t=' + this.time + '&film=' + this.$route.params.id + '&cinema=' + this.cinemas[index].id,
            success: function (res) {
              console.log(res.data.data.schedules[index].id)
              this.shopId = res.data.data.schedules[index].id // 门店id
              this.filmId = this.$route.params.id // 电影id
              this.cinemaId = this.cinemas[index].id // 影院id
              this.cinemasPrice = res.data.data.schedules
              this.thismonth = new Date(parseInt(this.time)).getMonth()
              this.today = []
              for (let i = 0; i < this.cinemasPrice.length; i++) {
                this.showat = new Date(parseInt(this.cinemasPrice[i].showAt)).getDate()
                this.thisday = new Date(parseInt(this.time)).getDate()
                if (this.showat === this.thisday) {
                  this.today.push(this.cinemasPrice[i])
                }
                if (this.showat === this.thisday + 1) {
                  this.tomorrow.push(this.cinemasPrice[i])
                }
                if (this.showat === this.thisday + 2) {
                  this.aftertomorrow.push(this.cinemasPrice[i])
                }
                if (this.showat > this.thisday + 2) {
                  this.later.push(this.cinemasPrice[i])
                }
              }
            },
            failed: function (error) {
              console.log(error)
            }
          })
        }
      },
//    找到所有的该城市的地区
      GetDistrict () {
        let district = []
        for (let i = 0; i < this.cinemas.length; i++) {
          if (district.indexOf(this.cinemas[i].district.name) === -1) {
            district.push(this.cinemas[i].district.name)
          }
        }
        return district
      },
//      创建districtObj对象
      GetDistrictCinema () {
        let districtLength = this.GetDistrict().length
        let districtName = this.GetDistrict()
        let quyu = []
        for (let i = 0; i < districtLength; i++) {
          let districtObj = {}
          districtObj.name = districtName[i]
          districtObj.cinemaList = []
          quyu.push(districtObj)
        }
        return quyu
      },
//    为districtObj的cinemaList添加数据
      GetDistrictCinemaFenqu () {
        let fenqu = this.GetDistrictCinema()
//      console.log('dianying:' + this.cinemas.length)
        for (let i = 0; i < this.cinemas.length; i++) {
          for (let j = 0; j < fenqu.length; j++) {
            if (this.cinemas[i].district.name === fenqu[j].name) {
              fenqu[j].cinemaList.push(this.cinemas[i])
            }
          }
        }
        return fenqu
      },
      isBusSelect: function () {
        this.$router.push({name: 'Chooseseat', query: {shopId: this.shopId, cinemaId: this.cinemaId, filmId: this.filmId}})
      }
    },
    mounted () {
      this.time = new Date().getTime()
      this.$request({
        type: 'get',
        url: '/api/film/' + this.$route.params.id + '/cinema?__t=' + this.time,
        success: function (res) {
          this.cinemas = res.data.data.cinemas
          this.districts = this.GetDistrictCinemaFenqu()
          this.thismonth = new Date(parseInt(this.time)).getMonth()
//          for (let i = 0; i < this.cinemasPrice.length; i++) {
//          console.log(this.cinemasPrice[i].showAt)
//            this.showat = new Date(parseInt(this.cinemasPrice[i].showAt)).getDate()
//            this.thisday = new Date(parseInt(this.time)).getDate()
//            if (this.showat === this.thisday) {
//              this.today.push(this.cinemasPrice[i])
//            }
//          }
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

  /*地区的名字*/
  .disTitle {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    padding-left: 16px;
    background-color: #e1e1e1;
    margin-bottom: 1px;
    color: #636363;
    cursor: pointer;
  }

  .disBody {
    cursor: pointer
  }

  .disBody ul {
    overflow: hidden;
    display: none;
  }

  /*一个地区的全部电影院信息*/
  .box {
    border-bottom: 1px solid #e1e1e1;
    width: 100%;
    min-width: 230px;
    float: left;
    cursor: pointer;
  }

  /*影院信息*/
  .liLeft {
    width: 75%;
    float: left;
  }

  /*影院名字*/
  .liLeft-top {
    margin-top: 5px;
  }

  .liLeft-top span:nth-child(1) {
    display: inline-block;
    max-width: 80%;
    font: @font-size-normal;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .liLeft-top .zuo {
    color: #fc8558;
    font-size: 18px;
  }

  .liLeft-top .tong {
    color: #88aec8;
    font-size: 18px;
  }

  /*优惠活动*/
  .liLeft-middle {
    margin-top: 10px;
    font-size: @font-size-small;
    color: @background-color-white;
  }

  .liLeft-middle span {
    display: inline-block;
    width: 58px;
    height: 15px;
    border-radius: 3px;
    text-align: center;
    line-height: 15px;
    margin: 0 5px;
    background-color: #ff9658;
  }

  /*地址*/
  .liLeft-bottom {
    margin-top: 10px;
    font-size: 12px;
    color: @background-color-gray;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  /*距离*/
  .distance {
    margin-top: 10px;
    font-size: 12px;
    color: @background-color-gray;
  }

  /*下拉箭头*/
  .liRight {
    margin-top: 5px;
    width: 20%;
    float: right;
    color: #c6c6c6;
    text-align: center;
  }

  .zuo{
    display: inline-block;
    background-image: url(../../assets/liimg/zuo.png);
    background-repeat:no-repeat;
    background-position: center center;
    -webkit-background-size: 16px;
    background-size: 16px;
    width: 16px;
    height: 16px;
  }

  .tong{
    display: inline-block;
    background-image: url(../../assets/liimg/tong.png);
    background-repeat:no-repeat;
    background-position: center center;
    -webkit-background-size: 16px;
    background-size: 16px;
    width: 16px;
    height: 16px;
  }

  .jiage{
    display: none;
    width: 100%;
  }

  .all{
    overflow: hidden;
    padding: 10px 0 12px 16px;
  }

  .price{
    font-size: 16px;
    color: #fc8637;
    margin-right: 25px;
  }

  .date span{
    display: inline-block;
    background-color: #ff6a19;
    color: #eee;
    height: 35px;
    width: 65px;
    margin: 5px 0 10px 0;
    padding: 0 15px;
    border-radius: 35px;
    font-size: 10px;
    line-height: 35px;
    text-align: center;
    cursor: pointer;
  }

  .date{
    padding-left: 15px;
  }

  .showlist{
    width: 370px;
    padding: 11px 20px 20px;
  }

  .showlist_top_left, .showlist_bottom_left{
    float: left;
  }

  .showlist_top_right, .showlist_bottom_right{
    float: right;
  }

  .showlist_top, .showlist_bottom{
    overflow: hidden;
  }

  .showlist_bottom_left{
    color: #959595;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 90%;
    font-size: 12px;
  }

  .showlist_top_right{
    font-size: 16px;
    color: #f67222;
  }

  .showlist_bottom_right{
    text-decoration: line-through;
    font-size: 8px;
    color: #c6c6c6;
    font-weight: bolder;
  }

  .showlist_top{
    margin-bottom: 10px;
  }
</style>
