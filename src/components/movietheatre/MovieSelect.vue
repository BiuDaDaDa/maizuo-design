<template xmlns="http://www.w3.org/1999/html">
  <div>
    <swiper :options="swiperOption"  ref="mySwiper" class="main">
      <swiper-slide v-for="(film, index) in filmList" :key="index" class="main-slide" ref="slideDiv">
        <div class="slide-img">
          <img :src="film.posterAddress" alt="" ref="slideImg" :class="{liang :index === 0}">
          <img src="../../common/img/youhui.png" alt="" class="discounts">
        </div>
        <div class="slide-text">
          <p ref="slideText" :class="{liangzi: index === 0}">{{film.filmName}}</p>
        </div>
      </swiper-slide>
    </swiper>
    <!--下方电影场次-->
    <div class="container">
      <div class="selectDay">
        <div class="today" v-for="(day,index) in weekDay" @click="clickTab(index)" :class="{active:index === num}">
          <div>
            <span ref="empty">{{weekDayText[index]}}({{day}})</span>
          </div>
        </div>
      </div>
      <div class="day">
        <div v-for="(film, filmindex) in Arr" v-if="filmindex === Ifirst">
          <div v-for="(day, dayindex) in film.filmlist" v-if="dayindex === engLish[num]">
            <span style="display: none;" ref="oneday">{{dayindex}}</span>
            <div class="session" v-for="session in day" @click="GoToSelectSeat(session)">
              <div class="session_wrap">
                <div class="top">
                  <div class="top_first">{{getLocalHours(session.stopSellingAt)}}</div>
                  <div class="top_second ">
                    <div class="discounts" v-if="session.labels.length !== 0 ">{{session.labels[0].name}}</div>
                  </div>
                  <div class="top_third">￥{{session.price.maizuo + session.price.premium}}</div>
                </div>
                <div class="bottom">
                  <div class="bottom_first">预计{{getLocalHours(session.stopSellingAt + session.film.mins * 60 * 1000)}}结束/{{session.film.language}}{{session.imagery}}/{{session.hall.name}}</div>
                  <div class="bottom_second">￥{{session.price.cinema}}</div>
                  <i class="iconfont icon-xiayibu"> </i>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  let that = {}
  export default {
    components: {
      swiper,
      swiperSlide
    },
    data () {
      return {
//
        weekDay: [],
        weekDayText: ['今天', '明天', '后天'],
        engLish: ['today', 'tomorrow', 'afterTomorrow'],
        Arr: [],
        filmList: '',
        schedules: '',
        passShow: false,
        Ifirst: 0,
        num: 0,
//        showeveryDay: '',
        swiperOption: {
//          允许通过计算属性获取当前Swiper对象
          notNextTick: true,
//          每页的显示数量
          slidesPerView: 4,
//          每条之间的margin
          spaceBetween: 0,
//          居中设置
          centeredSlides: true,
//          设置键盘事件
          keyboardControl: true,
//          点击之后选中
          slideToClickedSlide: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
//          swiper回调函数,滑动结束后触发
          onSlideChangeEnd: function (swiper) {
            for (let i = 0; i < that.$refs.slideDiv.length; i++) {
              if (i === swiper.activeIndex) {
                that.$refs.slideImg[i].style.opacity = '1'
                that.$refs.slideText[i].style.display = 'block'
                that.Ifirst = i
              } else {
                that.$refs.slideImg[i].style.opacity = '0.6'
                that.$refs.slideText[i].style.display = 'none'
              }
            }
          }
        }
      }
    },
    beforeCreate () {
      that = this
    },
    methods: {
//      跳转选座
      GoToSelectSeat (session) {
        this.$router.push({name: 'Chooseseat', query: {shopId: session.id, cinemaId: session.cinema.id, filmId: session.film.id}})
//        console.log(session.id)
//        console.log(session.cinema.id)
//        console.log(session.film.id)
      },
//      tab切换
      clickTab (index) {
        this.num = index
      },
//      获取cookie
      getCookie (name) {
        let arr
        let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
        if (arr === document.cookie.match(reg)) {
          return unescape(arr[2])
        } else {
          return null
        }
      },
//      获取影片个数
      filmSort () {
        let filmTimeArr = []
        for (let i = 0; i < this.filmList.length; i++) {
          let obj = {}
          obj.filmId = this.filmList[i].filmID
          obj.listArr = []
          obj.filmlist = {
            today: [],
            tomorrow: [],
            afterTomorrow: []
          }
          filmTimeArr.push(obj)
        }
        return filmTimeArr
      },
//      转换时间戳
      getLocalTime: function (nS) {
//        return (new Date(parseInt(nS)).getMonth() + 1) + '/' + (new Date(parseInt(nS)).getDate())
        let month = new Date(parseInt(nS)).getMonth() + 1
        let day = new Date(parseInt(nS)).getDate()
        month = month < 10 ? '0' + month : month
        day = day < 10 ? '0' + day : day
        return `${month}/${day}`
      },
//      时间戳转换
      getLocalHours: function (nS) {
        let hour = new Date(parseInt(nS)).getHours()
        let mins = (new Date(parseInt(nS)).getMinutes() + 1)
        hour = hour < 10 ? '0' + hour : hour
        mins = mins < 10 ? '0' + mins : mins
        return `${hour}/${mins}`
      },
//      通过电影ID寻找场次
      GetSortDay () {
        for (let j = 0; j < this.Arr.length; j++) {
          for (let i = 0; i < this.schedules.length; i++) {
            if (Number(this.Arr[j].filmId) === Number(this.schedules[i].film.id)) {
              this.Arr[j].listArr.push(this.schedules[i])
            }
          }
        }
      },
//      将电影场次分成三天
      GetFilmSession () {
//        let tomorrow = []
//        let afterTomorrow = []
//        let today = []
        let curTime = new Date().getTime()
        for (let j = 0; j < this.Arr.length; j++) {
          for (let i = 0; i < this.Arr[j].listArr.length; i++) {
            let furTime = this.getLocalTime(this.Arr[j].listArr[i].stopSellingAt)
//            console.log('电影时间' + furTime)
            if (furTime === this.getLocalTime(curTime)) {
              this.Arr[j].filmlist.today.push(this.Arr[j].listArr[i])
              if (this.weekDay.indexOf(furTime) === -1) {
                this.weekDay.push(furTime)
              }
            }
            if (furTime === this.getLocalTime(curTime + 3600 * 24 * 1000)) {
              this.Arr[j].filmlist.tomorrow.push(this.Arr[j].listArr[i])
              if (this.weekDay.indexOf(furTime) === -1) {
                this.weekDay.push(furTime)
              }
            }
            if (furTime === this.getLocalTime(curTime + 3600 * 24 * 1000 * 2)) {
              this.Arr[j].filmlist.afterTomorrow.push(this.Arr[j].listArr[i])
              if (this.weekDay.indexOf(furTime) === -1) {
                this.weekDay.push(furTime)
              }
            }
          }
        }
        console.log('显示日期: ' + this.weekDay)
      }
    },
    computed: {
      swiper () {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted () {
      let time = new Date().getTime()
      this.$request({
        type: 'get',
        url: `/api/cinema/${this.$route.params.id}/film?__t=${time}`,
        success (res) {
          this.filmList = res.data.data.filmList
          console.log(this.filmList)
          this.Arr = this.filmSort()
        },
        failed (err) {
          console.log(err)
        }
      })
      this.$request({
        type: 'get',
        url: `/api/schedule?__t=${time}&film=0&cinema=${this.$route.params.id}`,
        success (res) {
          this.schedules = res.data.data.schedules
          console.log(this.schedules)
          this.GetSortDay()
          this.GetFilmSession()
        },
        failed (err) {
          console.log(err)
        }
      })
    }
  }
</script>

<style lang="less">
  @import '../../common/css/swiper.min.css';
  .main{
    background-color: #38403e;
    padding-top: 10px;
    padding-bottom: 5px;
    height: 145px;
  }

  .main-slide{
    box-sizing: border-box;
    width: 92px;
    padding: 0 10px;
  }

  .slide-img{
    width: 100%;
    position: relative;
  }

  .slide-img img {
    width:100%;
    border: 1px solid #ccc;
    opacity: 0.6;
  }

  .slide-img .discounts{
    position: absolute;
    top: -2px;
    right: -5px;
    width: 40px;
    height: 40px;
    border: 0 solid #fff;
    z-index: 10;
  }

  .slide-text{
    width: 100%;
  }

  .slide-text p{
    text-align: center;
    margin: 10px -20px;
    font-size: 12px;
    color: #fff;
    white-space: nowrap;
    display: none;
  }
  .slide-img .liang{
    opacity: 1;
  }


  .slide-text .liangzi{
    display: block;
  }

  .container{
    width: 100%;
  }

  .session{
    padding: 11px 20px 0;
    cursor: pointer;
  }

  .session_wrap{
    border-bottom: 1px dashed rgba(85,85,85,0.3);
    padding-right: 20px;
  }

  .top{
    position: relative;
    display: flex;
    justify-content: space-between;
    line-height: 25px;
    font-size: 16px;
  }

  .top_first{
    color: #000;
  }

  .top_second {
    position: absolute;
    left: 200px;
    margin-left: -30px;
  }
  .discounts{
    border: 1px solid #ff9658;
    color: #ff9658;
    font-size: 10px;
    border-radius: 3px;
    padding: 0 4px;
    height: 15px;
    margin: 3px auto;
    line-height: 15px;
  }

  .top_third{
    color: #f67222;
  }

  .bottom{
    position: relative;
    display: flex;
    justify-content: space-between;
    line-height: 18px;
    padding-bottom: 20px;
    padding-top: 5px;
  }

  .bottom_first{
    font-size: 8px;
    color: #727272;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 90%;
  }

  .bottom_second{
    margin-top: -5px;
    text-decoration: line-through;
    font-size: 8px;
    float: right;
    color: #c6c6c6;
  }

  .bottom i {
    position: absolute;
    top: -5px;
    right: -25px;
    font-size: 25px;
    color:#c6c6c6 ;
  }

  .selectDay{
    overflow: hidden;
  }
  .today{
    border-bottom: 1px solid #e9681f;
    float: left;
    width: 33%;
  }

  .today div{
    height: 25px;
    margin: 5px 15px;
    display: inline-block;
    font-size: 10px;
    line-height: 25px;
    text-align: center;
    color: #555;
    cursor: pointer;
  }

  .active{
    margin-top: -4px;
    border-bottom: 5px solid #e9681f;
  }


</style>
