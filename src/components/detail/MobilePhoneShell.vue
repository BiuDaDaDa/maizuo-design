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
      this.$request({
        type: 'GET',
        url: '/apt/active-detail?id=1190',
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
