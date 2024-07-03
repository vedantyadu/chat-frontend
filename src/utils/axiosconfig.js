import axios from 'axios'

export function configureAxios() {
  axios.defaults.baseURL = 'https://chatappbackend.vedantyadu.online'
  axios.defaults.withCredentials = true
}
