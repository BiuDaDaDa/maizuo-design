<template>
  <div>
    <!--主题专区-->
    <div v-for="(ite,index) in subjectDataT">
      <div class="line"></div>
      <div class="subject-center">
        <a @click="subjectGo(index)">
          <img :src="ite.imageSrc">
        </a>
        <div class="pic-list">
          <div class="subject-container">
            <div class="subject-item" v-for="(item, key) in ite.products">
              <a @click="detailGotoD(index,key)">
                <div class="item-box">
                  <div class="pic-area">
                    <div class="control-pic">
                      <img :src="item.image">
                    </div>
                  </div>
                  <p class="control-name">{{item.name}}}</p>
                  <p class="control-price">￥{{item.price/100}}.00</p>
                </div>
              </a>
            </div>
            <!--全部更多-->
            <div class="subject-item subject-all">
              <span class="pic-list-right">全部</span>
            </div>
            <!--end-->
          </div>
        </div>
      </div>
    </div>
    <!--end-->

  </div>
</template>

<script>
  export default {
    name: '',
    data () {
      return {
        subjectDataT: [],
        id: []
      }
    },
    mounted () {
      this.$request({
        type: 'get',
        url: '/app/ad/list',
        success: function (res) {
          var Data = res.data.data
          for (var i = 14; i < 19; i++) {
            this.subjectDataT.push(Data[i])
            let str = Data[i].url
            this.id.push(str.split('active/')[1])
          }
        },
        failed: function (err) {
          console.log(err)
        }
      })
    },
    methods: {
      subjectGo (index) {
        this.$router.push({name: 'MyStore2', query: {Id: this.id[index]}})
      },
      detailGotoD (index, key) {
        let idL = this.subjectDataT[index].products[key].id
        this.$router.push({name: 'MyStoremsage', query: {Id: idL}})
      }
    }
  }
</script>

<style scoped lang="less">

  .line {
    height: 8px;
    background: #f2f2f2;
  }

  .subject-center {
    padding: 10px;
    background: #fff;
  }

  .subject-center img {
    width: 100%;
  }

  /*主题产品*/
  .pic-list {
    width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
  }
  .subject-container {
  }

  .subject-item {
    display: inline-block;
    width: 30%;
  }

  .item-box {
    width: 85px;
    height: 85px;
  }

  .pic-area {
    width: 85px;
    height: 85px;
  }

  .control-pic {
    width: 100%;
  }

  .control-name {
    font-size: 12px;
    color: #323232;
    height: 11px;
  }

  .control-price {
    font-size: 13px;
    color: #ff6640;
  }

  .item-box p {
    display: block;
    overflow: hidden;
    height: 12px;
    -webkit-margin-before: 1em;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
  }

  .subject-all {
    line-height: 151px;
    vertical-align: top;
    text-align: center;
  }

  .pic-list-right {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    border: 1px solid #ccc;
    line-height: 50px;
    text-align: center;
    font-size: 12px;
    color: #ccc;
    display: inline-block;
    margin-top: 30px;
  }
</style>
