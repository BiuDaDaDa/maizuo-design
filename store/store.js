import Vue from 'vue'
import Vuex from 'vuex'
import router from '../src/router/index'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    count: 1,
    city: '深圳',
    title: '卖座电影',
    lists: [
      {'content': '首页', 'url': '/', 'title': '卖座电影'},
      {'content': '影片', 'url': '/film/now-playing', 'title': '卖座电影'},
      {'content': '影院', 'url': '/cinema', 'title': '全部影院'},
      {'content': '商城', 'url': '/store', 'title': '卖座商城'},
      {'content': '我的', 'url': '/login', 'title': '我的'},
      {'content': '卖座卡', 'url': '/card', 'title': '查询/绑定/激活卖座卡'}
    ],
    storeLists: [
      {'content': '首页', 'url': '/store', 'title': '卖座商城'},
      {'content': '影票', 'url': '/', 'title': '卖座电影'},
      {'content': '我的', 'url': '/login', 'title': '我的'},
      {'content': '卖座卡', 'url': '/card', 'title': '查询/绑定/激活卖座卡'}
    ]
  },
  mutations: {
    changeNavTitle (state, val) {
      state.title = val
      if (state.title === '卖座商城') {
        state.lists = state.storeLists
      } else {
        state.lists = [
          {'content': '首页', 'url': '/', 'title': '卖座电影'},
          {'content': '影片', 'url': '/film/now-playing', 'title': '卖座电影'},
          {'content': '影院', 'url': '/cinema', 'title': '全部影院'},
          {'content': '商城', 'url': '/store', 'title': '卖座商城'},
          {'content': '我的', 'url': '/login', 'title': '我的'},
          {'content': '卖座卡', 'url': '/card', 'title': '查询/绑定/激活卖座卡'}
        ]
      }
    },
    changeCity (state, e) {
      window.document.cookie = `cityId=${e.target.parentNode.lastChild.innerHTML}`
      window.document.cookie = `cityName=${e.target.innerHTML}`
      state.city = e.target.innerHTML
      router.push('/')
      state.title = '卖座电影'
    },
    changeTitle (state, cinema) {
      state.title = cinema.name
      router.push('/cinema/' + cinema.id)
    },
    cityTitle (state) {
      state.title = '选择城市'
    }
  }
})
