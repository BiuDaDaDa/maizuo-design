<template>
  <div>
    <div class="wrap" v-if="thisdata != ''">
      <img src="../../assets/logo.png" height="200" width="200"/>
    </div>
  </div>
</template>

<script>
  import bus from '../../common/js/eventBus'
  export default {
    name: 'PlayFilm',
    data () {
      return {
        thisdata: ''
      }
    },
    mounted () {
      bus.$on('foundplayfilmid', function (thisid) {
        this.$request({
          type: 'get',
          url: '/api/film/' + thisid,
          headers: {},
          params: {},
          success: function (res) {
            this.thisdata = res.data.data.film
            console.log(this.thisdata.cover.origin)
          },
          failed: function (err) {
            console.log(err)
          }
        })
      })
    }
  }
</script>

<style scoped lang="less">
  .top img{
    width: 100%;
  }
  .top{
    height: 200px;
  }
  #asdf{
    width: 200px;
    height: 200px;
  }
</style>
