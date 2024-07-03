import axios from 'axios'

export function configureAxios() {
  axios.defaults.baseURL = 'https://139.59.240.247:3000'
  axios.defaults.withCredentials = true
}
