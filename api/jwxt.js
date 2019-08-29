import axios from './base'

export class JwxtApi {
  static getValideCode() {
    return axios.get('/jwxt/valideCode')
  }

  static login(username, password, code) {
    return axios.post('/jwxt/login', {
      username,
      password,
      code
    })
  }

  static logout() {
    return axios.post('/jwxt/logout')
  }
}
