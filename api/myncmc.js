import axios from './base'

export class MyncmcApi {
  login(username, password) {
    return axios.post('/myncmc/login', {
      username,
      password
    })
  }

  logout() {
    return axios.post('/myncmc/logout')
  }

  getScoreReport() {
    return axios.get('/myncmc/score')
  }
}
