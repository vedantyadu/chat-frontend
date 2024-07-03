import axios from 'axios'

export function configureAxios() {
  axios.defaults.baseURL = 'http://139.59.240.247:3000'
  axios.defaults.withCredentials = true
}
