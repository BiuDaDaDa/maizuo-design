<template>
  <div>
    <div class="line"></div>
    <!--内容-->
    <div class="active-contain">
      <div class="active-center">
        <div class="active-left" v-for="(item,index) in activeData">
          <div class="active-left-content">
            <a @click="activeGo(index)">
              <img :src="item.imageSrc">
            </a>
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
        activeData: [],
        id: []
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
            let str = allData[i].url
            this.id.push(str.split('active/')[1])
          }
        },
        failed: function (err) {
          console.log(err)
        }
      })
    },
    methods: {
      activeGo: function (index) {
        this.$router.push({name: 'MyStore2', query: {Id: this.id[index]}})
      }
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
