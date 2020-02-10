import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

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
        axios({url: 'https://abrom-booking.herokuapp.com/api/v1/login', data: user, method: 'POST' })
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
        axios({url: 'https://abrom-booking.herokuapp.com/api/v1/users/add', data: user, method: 'POST' })
            .then(resp => {
              //const token = resp.data.token
              //const user = resp.data.user
              //localStorage.setItem('token', token)
              //axios.defaults.headers.common['Authorization'] = token
              //commit('auth_success', token, user)
              resolve(resp)
            })
            .catch(err => {
              //commit('auth_error', err)
              //localStorage.removeItem('token')
              reject(err)
            })
      })
    },
    logout({commit}) {
       return new Promise((resolve) => {
           commit('logout')
           axios({url: 'https://abrom-booking.herokuapp.com/api/v1/logout', method: 'POST'})
           localStorage.removeItem('token')
           localStorage.removeItem('admin')
           delete axios.defaults.headers.common['Authorization']
           resolve()
       })
    },
    sendDates({commit} , dates) {
        return new Promise((resolve, reject) => {
                //?token=XlZGRSAkIF
            axios({url: 'https://abrom-booking.herokuapp.com/api/v1/date-intervals/add', data: dates, method: 'POST'})
                .catch(err => {
                    reject(err)
                })

        })
    }
  },
  modules: {
  },
  getters : {
    isAdmin: state => state.role,
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  }
})
