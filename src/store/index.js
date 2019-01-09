import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: ''
  },
  mutations: {
    setCookie(state, data) {
      state.token = data
    },
    getCookie(state, data) {
      state.token = data
    }
  }
})

export default store