import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const http = "http://rent-abrom.ru:8000";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user : {},
    role: localStorage.getItem('admin') || ''
  },
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, token, user , role){
      state.status = "status"
      state.token = token
      state.user = user
      state.role = role
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
      state.role = ''
    },
  },
  actions: {
      authorization({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: http + '/api/v1/login', data: user, method: 'POST' })
            .then(resp => {
              const token = resp.data.token
              const user = resp.data.user
              const role = resp.data.role
              localStorage.setItem('admin', role)
              localStorage.setItem('token', token)
              axios.defaults.headers.common['Authorization'] = token
              commit('auth_success', token, user , role)
              resolve(resp)
            })
            .catch(err => {
              commit('auth_error')
              localStorage.removeItem('token')
              reject(err)
            })
      })
    },
    register({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: http + '/api/v1/users/add', data: user, method: 'POST' })
            .then(resp => {
              resolve(resp)
            })
            .catch(err => {
                if (err.statusCode === '409') {
                    alert('Пользователь с таким логином или почтой уже есть')
                }
            })
      })
    },
    logout({commit}) {
       return new Promise((resolve) => {
           commit('logout')
           axios({url: http + '/api/v1/logout', method: 'POST'})
           localStorage.removeItem('token')
           localStorage.removeItem('admin')
           delete axios.defaults.headers.common['Authorization']
           resolve()
       })
    },
    sendDates({commit} , dates) {
        return new Promise((resolve, reject) => {
            axios({url: http + '/api/v1/date-intervals/add', data: dates, method: 'POST'})
                .catch(err => {
                    if (err.statusCode === '400') {
                        alert('выберите корректный промежуток')
                    }
                    else if (err.response.status === 409) {
                        alert('Промежуток перескается с забронированными датами')
                    }
                })

        })
    }
  },
  modules: {
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  }
})
