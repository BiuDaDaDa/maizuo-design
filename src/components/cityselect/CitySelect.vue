<template>
  <div class="wrap">
    <!--GPS定位城市-->
    <div>
      <div>
        <ul>
          <li class="CityTitle">GPS定位你所在城市</li>
        </ul>
      </div>
      <div>
        <ul>
          <li class="GPS-city CityBody">大连</li>
        </ul>
      </div>
      <!--热门城市-->
    </div>
    <div class="HotCity">
      <div class="CityTitle">热门城市</div>
      <ul class="Hot-city">
        <li class="CityBody" v-for="(hot,index) in HotCity" @click="hotSetcookie(index)">{{hot}}</li>
      </ul>
    </div>
    <!--按字母排序选择城市-->
    <div class="SortCity">
      <div>
        <div>
          <ul>
            <li class="CityTitle">按字母排序</li>
          </ul>
        </div>
        <div class="CitySortParent">
          <div v-for="Item in cityItem">
            <ul>
              <li class="CitySort CityBody" v-for="cityLetter in Item.letter">
                <div @click="naver(cityLetter, $event)" ref="LetterPos">
                  {{cityLetter}}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!--分类好的城市-->
      <div>
        <div v-for="Item in cityItem">
          <ul class="cityItemLetterParent ">
            <li :id="cityLetter" class="cityItemLetter CityTitle" v-for="cityLetter in Item.letter">
              {{cityLetter}}
            </li>
          </ul>
          <ul class="cityItemNameParent">
            <li class="cityItemName CityBody" v-for="cityEvery in Item.citylist">
              <div @click.stop.prevent="changeCity">{{cityEvery.name}}</div>
              <span style="display: none">{{cityEvery.id}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Bus from '@/common/js/eventBus'
  import {mapMutations} from 'vuex'

  export default {
    name: 'CitySelect',
    data () {
      return {
        cities: '',
        cityItem: '',
        myHref: '',
        HotCity: ['北京', '上海', '广州', '深圳'],
        HotId: []
      }
    },
    methods: {
      ...mapMutations(['changeCity']
      ),
//      获得城市拼音的首字母
      GetFirstLetter (str) {
        str = str.charAt(0)
        return str
      },
//     创建26个对象,用于储存字母和该字母打头的城市列表
      buildLetter: function () {
        let letter = []
        for (let i = 0; i < 26; i++) {
          let obj = {}
          obj.letter = String.fromCharCode((65 + i))
          obj.citylist = []
          letter.push(obj)
        }
        return letter
      },
//    为每个对象添加城市
      bulidCity () {
//        调用函数 buildLetter 获取相应的对象
        let cityobj = this.buildLetter()
        for (let i = 0; i < cityobj.length; i++) {
          for (let j = 0; j < this.cities.length; j++) {
            let index = Number(this.GetFirstLetter(this.cities[j].pinyin).charCodeAt() - 65)
            if (i === index) {
              cityobj[i].citylist.push(this.cities[j])
            }
          }
        }
//      将空对象移除
        cityobj = cityobj.filter(function (value) {
          let len = value.citylist.length
          return len > 0
        })
        return cityobj
      },
//      滚动页面
      naver (id, event) {
//        let obj = document.getElementById(id)
//        let oPos = obj.offsetTop
//        return window.scrollTo(0, oPos)
        let obj = document.getElementById(id)
        let oPos = obj.offsetTop
        console.log(oPos)
        let nowTop = event.target.offsetTop
        console.log(nowTop)
        let timer = setInterval(function () {
          nowTop += 45
          if (nowTop + 40 >= oPos) {
            clearInterval(timer)
          } else {
            return window.scrollTo(0, nowTop)
          }
        }, 0)
      },
      setCookie (e) {
        window.document.cookie = `cityId=${e.target.parentNode.lastChild.innerHTML}`
        window.document.cookie = `cityName=${e.target.innerHTML}`
        this.$router.push('/')
//        let cityName = e.target.innerHTML
//        Bus.$emit('GetCityName', cityName)
      },
      hotGet () {
        for (let j = 0; j < this.HotCity.length; j++) {
          for (let i = 0; i < this.cities.length; i++) {
            if (this.cities[i].name === this.HotCity[j]) {
              this.HotId[j] = this.cities[i].id
            }
          }
        }
      },
      hotSetcookie (index) {
        console.log(this.HotId)
        window.document.cookie = `cityId=${this.HotId[index]}`
        window.document.cookie = `cityName=${this.HotCity[index]}`
        console.log(this.HotId[index])
        Bus.$emit('GetCityName', this.HotCity[index])
        this.$router.push('/')
      }
    },
    mounted () {
//    读取接口,获取所有城市列表数据
//    --------------------------
      let time = new Date().getTime()
      this.$request({
        type: 'get',
        url: `/api/city?__t=${time}`,
        success: function (res) {
          this.cities = res.data.data.cities
//          console.log(this.cities)
          this.cityItem = this.bulidCity()
          this.hotGet()
        },
        failed: function (error) {
          console.log(error)
        }
      })
    }
  }
</script>

<style scoped lang="less">
  ul, li {
    list-style: none;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  .wrap {
    width: 100%;
    background-color: #fff;
    overflow: hidden;
  }

  .CityTitle {
    padding-left: 15px;
    line-height: 45px;
    cursor: pointer;
    font-size: 14px;
    background-color: #ebebeb;
    box-sizing: border-box;
  }

  .CityBody {
    text-align: center;
    width: 25%;
    line-height: 45px;
    color: #838383;
    font-size: 16px;
    border-bottom: #ebebeb 1px solid;
    box-sizing: border-box;
  }

  .GPS-city {
    color: #e2941a;
  }

  .Hot-city {
    text-align: center;
    overflow: hidden;
  }

  .Hot-city li {
    float: left;
  }

  .CitySortParent {
    overflow: hidden;
  }

  .CitySortParent a {
    color: #838383;
    text-decoration: none;
  }

  .CitySort {
    float: left;
  }

  .cityItemLetterParent {
    background-color: #ebebeb;
  }

  .cityItemLetter {
    display: block;
    width: 100%;
  }

  .cityItemNameParent {
    overflow: hidden;
  }

  .cityItemName {
    text-align: center;
    float: left;
    transition: 3s;
  }

</style>
