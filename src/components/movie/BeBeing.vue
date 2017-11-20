<template>
  <div>
    <div class="all-body">
      <div class="being-body">
        <div class="header-select">
          <router-link :to="hohtshowingPath">
            <div class="select" :class="{'active': layout == 'header-left'}" @click="layout = 'header-left'">正在热映</div>
          </router-link>
          <router-link :to="beabouttoPath">
            <div class="select" :class="{'active': layout == 'header-right'}" @click="layout = 'header-right'">即将上映</div>
          </router-link>
          <div style="clear: both"></div>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BeBeing',
    computed: {
      hohtshowingPath () {
        return `${this.userPath}/${this.myHohtshowing}`
      },
      beabouttoPath () {
        return `${this.userPath}/${this.myBeaboutto}`
      }
    },
    data () {
      return {
        userPath: '/film',
        myHohtshowing: 'hotshowing',
        myBeaboutto: 'beaboutto',
        layout: 'header-left'
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../common/css/reset";
  @import "../../common/css/common-color";

  .all-body {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: #F9F9F9;
    z-index: 1;
  }

  .being-body {
    width: 345px;
    margin: 0 auto;
    z-index: 10;
  }

  .header-select {
    height: 46px;
    border-bottom: 1px solid #fe6e00;
  }

  .header-select .select {
    width: 172.5px;
    font-size: @font-size-normal;
    float: left;
    height: 93%;
    text-align: center;
    line-height: 46px;
  }

  .active {
    border-bottom: 5px solid #fe6e00;
    color: #fe6e00;
  }

</style>
