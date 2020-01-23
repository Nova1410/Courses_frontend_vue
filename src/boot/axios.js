import Vue from 'vue'
import axios from 'axios'
import { Notify } from 'quasar'


//Create a baseURL for Axios
const axiosInstace = axios.create({
    baseURL: 'http://localhost:8000/api/'
  })

//Export Axios like an instance of Vue
  export default ({ Vue }) => {
    Vue.prototype.$axios = axiosInstace
  }