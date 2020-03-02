import Vue from 'vue'
import axios from 'axios'
import { Notify } from 'quasar'


//Create a baseURL for Axios
const axiosInstace = axios.create({
    baseURL: 'http://localhost:8000/api/'
  })

// Intercept request to send the authorization in the headers
axiosInstace.interceptors.request.use(config => {
  let token = localStorage.getItem('token')
  if(token !== null){
    config['headers']['Authorization'] = 'Bearer ' + token
  }
  return config
}, error => {
  return Promise.reject(error)
})

//Export Axios like an instance of Vue
  export default ({ Vue }) => {
    Vue.prototype.$axios = axiosInstace
  }