import axios from './base'

export class JxxtApi {
  static login(username, password) {
    return axios.post('/jxxt/login', {
      username,
      password
    })
  }

  static logout() {
    return axios.post('/jxxt/logout')
  }

  static getReminderList() {
    return axios.get('/jxxt/reminders')
  }

  static getHomeworkList(courseId) {
    return axios.get(`/jxxt/homeworks/${courseId}`)
  }

  static getHomeworkDetail(homeworkId) {
    return axios.get(`/jxxt/homeworks/detail/${homeworkId}`)
  }

  static getAllCourses() {
    return axios.get('/jxxt/courses')
  }

  static getResourceList(courseId, folderId = '0') {
    return axios.get(
      `/jxxt/resources?courseId=${courseId}&folderId=${folderId}`
    )
  }
}
