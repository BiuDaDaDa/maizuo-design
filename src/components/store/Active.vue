<template>
  <div>
    <div class="line"></div>
    <!--内容-->
    <div class="active-contain">
      <div class="active-center">
        <div class="active-left" v-for="item in activeData">
          <div class="active-left-content" >
            <img :src="item.imageSrc">
          </div>
        </div>
      </div>
      <div class="clear"></div>
    </div>
    <!--end-->
  </div>
</template>

<script>
  export default {
    name: '',
    data () {
      return {
        activeData: []
      }
    },
    mounted () {
      this.$request({
        type: 'get',
        url: 'app/ad/list',
        success: function (res) {
          let allData = res.data.data
          for (var i = 9; i < 11; i++) {
            this.activeData.push(allData[i])
          }
        },
        failed: function (err) {
          console.log(err)
        }
      })
    }
  }
</script>

<style scoped lang="less">
  .clear {
    clear: left;
  }

  /*线*/
  .line {
    height: 8px;
    background: #f2f2f2;
  }

  .active-contain {
    padding-left: 10px;
    padding-right: 10px;
  }

  .active-left {
    float: left;
    width: 49%;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-left: 3.5px;
  }

  .active-left-content {
    display: inline-block;
    width: 100%;

  }

  .active-left-content img {
    width: 100%;
    vertical-align: bottom;
  }

</style>
