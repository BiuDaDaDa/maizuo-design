import Vue from 'vue'
import Vuex from 'vuex'
import router from '../src/router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 1,
    city: '大连',
    title: '卖座电影'
  },
  mutations: {
    changeNavTitle (state, val) {
      state.title = val
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
