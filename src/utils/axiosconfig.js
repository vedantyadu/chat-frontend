import axios from 'axios'

export function configureAxios() {
  axios.defaults.baseURL = 'https://chat-backend-71wr.onrender.com:3000'
  axios.defaults.withCredentials = true
}
