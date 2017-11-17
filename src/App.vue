<template>
  <div id="app">
    <my-nav></my-nav>
    <router-view/>

  </div>
</template>

<script>
  import MyNav from './components/public/Nav'
  export default {
    name: 'app',
    components: {
      MyNav
    }
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

@import "./common/css/common-color.less";
@import "./common/css/reset.less";
  #app {
    margin: 0;
    padding: 0;
  }

  html, body {
    padding: 0;
    margin: 0;
  }
</style>
