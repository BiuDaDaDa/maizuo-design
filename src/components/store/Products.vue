<template>
  <div class="">
    <!--专区内容-->
    <div class="products-contain">
      <div class="active-center">
        <div class="active-left">
          <div class="price-left-content" v-if="productsData.length===3">
            <a @click="detailGo">
              <img :src="productsData[1].imageSrc">
            </a>
          </div>
        </div>
        <div class="active-left" v-if="productsData.length===3">
          <div class="top">
            <div @click="detalGOto">
            <router-link to="">
              <img :src="productsData['0'].imageSrc">
            </router-link>
            </div>
          </div>
          <div class="top">
            <div @click="detalGotoD">
            <router-link to="">
              <img :src="productsData['2'].imageSrc">
            </router-link>
            </div>
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
        productsData: [],
        id: 0,
        idL: 0,
        idD: 0
      }
    },
    mounted () {
      this.$request({
        type: 'get',
        url: '/app/ad/list',
        success: function (res) {
          let allData = res.data.data
          for (var i = 11; i < 14; i++) {
            this.productsData.push(allData[i])
          }
          console.log(allData[13].url)
          let str = allData[12].url
          let strL = allData[11].url
          let strD = allData[13].url
          this.id = str.split('active/')[1]
          this.idL = strL.split('item/')[1]
          this.idD = strD.split('item/')[1]
        },
        failed: function (err) {
          console.log(err)
        }
      })
    },
    methods: {
      detailGo: function () {
        this.$router.push({name: 'MobilePhoneShell', query: {Id: this.id}})
      },
      detalGOto: function () {
        this.$router.push(`mymsage/${this.idL}`)
      },
      detalGotoD: function () {
        console.log(this.idD)
        this.$router.push(`mymsage/${this.idD}`)
      }
    }
  }
</script>

<style scoped lang="less">
  .products-contain {
    padding-left: 10px;
    padding-right: 10px;
  }

  .active-left {
    float: left;
    width: 50%;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .active-left img {
    width: 100%;
    vertical-align: bottom;
  }

  .price-left-content {
    display: inline-block;
    width: 100%;
  }

  .top {
    margin-bottom: 9px;
    padding-left: 5px;
  }
</style>
