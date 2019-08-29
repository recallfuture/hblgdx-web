import axios from 'axios'

axios.defaults.baseURL = '/api'
axios.defaults.validateStatus = (status) => {
  return status >= 200 && status < 500
}
axios.defaults.withCredentials = true

export default axios
