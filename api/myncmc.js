import axios from './base'

export class MyncmcApi {
  static login(username, password) {
    return axios.post('/myncmc/login', {
      username,
      password
    })
  }

  static logout() {
    return axios.post('/myncmc/logout')
  }

  static getScoreReport() {
    return axios.get('/myncmc/score')
  }
}
