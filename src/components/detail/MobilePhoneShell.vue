<template>
  <div class="wrap" v-html="msg">
  </div>
</template>

<script>
  export default {
    name: 'MobilePhoneShell',
    data () {
      return {
        msg: ''
      }
    },
    mounted () {
      let Id = window.location.href.split('=')[1]
      this.$request({
        type: 'GET',
        url: '/apt/active-detail?id=' + Id,
        success: function (res) {
          this.msg = res.data.data.data.content
        },
        failed: function (error) {
          console.log(error)
        }
      })
    }
  }
</script>

<style scoped lang="less">

</style>
