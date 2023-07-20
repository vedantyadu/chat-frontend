import axios from 'axios'

export function configureAxios() {
  axios.defaults.baseURL = 'http://localhost:3000'
  axios.defaults.withCredentials = true
}
