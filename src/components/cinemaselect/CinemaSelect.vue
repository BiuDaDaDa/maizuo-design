<template>
  <div class="wrap">
    <!--主页-->
    <div class="city">
      <!--表示一个地区-->
      <div class="district" v-for="(district,index) in districts">
        <!--表示一个地区的名字-->
        <div class="disTitle">
          <ul>
            <li @click="ShowCinema">{{districts[index].name}}</li>
          </ul>
        </div>
        <!--地区的所有电影院-->
        <div class="disBody">
          <ul>
            <li class="box" v-for="(cinema,index) in district.cinemaList" v-show="showDisBody"
                @click="GoToCinema(cinema)">
              <div class="liLeft">
                <!--电影院名字-->
                <div class="liLeft-top">
                  <span>{{cinema.name}}</span>
                  <span style="display: none">{{cinema.id}}</span>
                  <i class="iconfont icon-zuowei zuo"></i>
                  <i class="iconfont icon-tong tong"></i>
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
                  <span>距离未知</span>
                </div>
              </div>
              <div class="liRight">
                <i class="iconfont icon-xiangyou"></i>
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
        showDisBody: false
      }
    },
    methods: {
      ShowCinema (e) {
        this.showDisBody = !this.showDisBody
      },
//      点击标砖
      GoToCinema (cinema) {
        this.$router.push({path: `/${cinema.id}`})
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
//      为districtObj的cinemaList添加数据
      GetDistrictCinemaFenqu () {
        let fenqu = this.GetDistrictCinema()
//        console.log('dianying:' + this.cinemas.length)
        for (let i = 0; i < this.cinemas.length; i++) {
          for (let j = 0; j < fenqu.length; j++) {
            if (this.cinemas[i].district.name === fenqu[j].name) {
              fenqu[j].cinemaList.push(this.cinemas[i])
            }
          }
        }
        return fenqu
      }
    },
    mounted () {
      let time = new Date().getTime()
      this.$request({
        type: 'get',
        url: `api/cinema?__t=${time}`,
        success: function (res) {
          this.cinemas = res.data.data.cinemas
          this.districts = this.GetDistrictCinemaFenqu()
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
  }

  /*一个地区的全部电影院信息*/
  .box {
    padding: 10px 0 12px 16px;
    border-bottom: 1px solid #e1e1e1;
    width: 100%;
    min-width: 230px;
    float: left;
    cursor: pointer;
    overflow: hidden;
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
    background-color: #51add0;
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
</style>
