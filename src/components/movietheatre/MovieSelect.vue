<template>
  <div class="wrap">
    <!--页面上方展示区域-->
    <div class="container">

    </div>
  </div>

</template>

<script>
  export default {
    name: 'MovieSelect',
    data () {
      return {
        msg: ''
      }
    },
    mounted () {
      let time = new Date().getTime()
      this.$request({
        type: 'get',
        url: `/api/cinema/${this.$route.params.id}/film?__t=${time}`,
        success: function (res) {
          this.msg = res.data.data
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

  @mainWidth: 100%;
  /*页面包裹层*/
  .wrap {
    width: @mainWidth;
    overflow: hidden;
  }

  /*页面上方展示区域*/
  .filmImg {
    overflow: hidden;
  }

  .img-body {
    float: left;

  }


</style>
