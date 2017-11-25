<template>

  <article class="schedule-panel">
    <div class="mask" @click="changeShow"></div>
    <div class="schedule-view">
      <div class="schedule-title">
        当天其它场次
      </div>
      <!--场次列表-->
      <ul class="schedule-list">
        <li v-for="item in allData[0]">
          <div class="schedule-list-left">
            <span class="show-time">14:30</span>
            <span class="desc">预计16:16结束/{{item.film.language}}{{item.imagery}}/5号厅</span>
          </div>
          <div class="schedule-list-right">
            <div class="price">
              <span>￥{{item.price.min}}.00</span>
              <span class="origin-price">￥{{item.price.cinema}}.00</span>
            </div>
          </div>
        </li>
      </ul>
      <!--end-->
    </div>
  </article>

</template>

<script>
  export default {
    props: ['isBus'],
    name: '',
    data () {
      return {
        allData: {} // 换场数据
      }
    },
    methods: {
      changeShow: function () {
        this.$emit('changeMask')
      }
    },
    watch: {
      isBus (newValue) {
        this.allData = newValue
        console.log(this.allData)
      }
    }
  }
</script>

<style scoped lang="less">
  body {
    margin: 0;
    padding: 0;
    line-height: 1.42857143;

  }

  .schedule-panel {
    position: fixed;
    width: 100%;
    height:100%;
    z-index: 5;
  }
  .mask {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    background-color: black;
    opacity: 0.4;
    z-index: 1000;
  }

  .schedule-view {
    position: absolute;
    width: 100%;
    height: 45%;
    background-color: #ffffff;
    bottom: 0;
    z-index: 1000;
    overflow-y: scroll;
  }

  .schedule-title {
    text-align: center;
    color: #666;
    padding: 8px;
    border-bottom: 1px solid #ededed;
  }

  /*列表*/
  .schedule-list {
    list-style: none;
    margin: 0;
    padding: 0 20px 50px;
  }

  .schedule-list li {
    height: 60px;
    padding-top: 8px;
    box-sizing: border-box;
    border-bottom: 1px dashed #ededed;
  }

  .schedule-list-left {
    display: inline-block;
    width: 70%;
    box-sizing: border-box;
    line-height: 1.42857143;
  }

  .schedule-list-right {
    width: 24%;
    text-align: center;
    display: inline-block;
    box-sizing: border-box;
  }

  .schedule-list-left .show-time {
    color: #1b1b1b;
    font-size: 16px;
    display: block;
  }

  .schedule-list-left .desc {
    color: #6d6d6d;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
  }

  .price {
    color: #f67222;
    font-size: 16px;
  }

  .origin-price {
    color: #c6c6c6;
    display: block;
    text-decoration: line-through;
  }
</style>
