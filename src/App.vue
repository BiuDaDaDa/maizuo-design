<template>
  <div id="app">

    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app'
//    methods: {
//      fecthHomeData () {
//        this.$request({
//          type: 'get',
//          url: '',
//          headers: {},
//          params: {},
//          success: function () {},
//          failed: function () {}
//        })
//      }
//    }
  }
</script>

<style>
@import "common/css/common-color.less";
@import "common/css/reset.less";
</style>
