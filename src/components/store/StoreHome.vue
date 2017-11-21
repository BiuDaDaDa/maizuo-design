<template>

  <div class="app-store">

    <div class="banner">
      <div class="scoll-slider">
        <mt-swipe :auto="4000">
          <mt-swipe-item><img :src="slider"></mt-swipe-item>
        </mt-swipe>
      </div>
    </div>
  </div>

</template>

<script>
  import { Swipe, SwipeItem } from 'mint-ui'

  export default {
    name: '',
    data () {
      return {
        slider: ''
      }
    },
    components: {
      Swipe,
      SwipeItem
    },
    mounted () {
      this.$request({
        type: 'get',
        url: 'app/ad/list',
        success: function (res) {
          console.log(res.data.data)
          console.log(res.data.data[8].imageSrc)
          this.slider = res.data.data[8].imageSrc
        }
      })
    }
  }
</script>

<style scoped lang="less">

  .app-store {
    overflow-x: hidden;
  }
  .scoll-slider {
    height: 119px;
  }
  .scoll-slider img {
    width: 100%;
    text-align: center;
    margin: 0 auto;

  }


</style>
