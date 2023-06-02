import axios from 'axios'

export function configureAxios() {
  axios.defaults.baseURL = 'http://127.0.0.1:3000'
  axios.defaults.withCredentials = true
}
