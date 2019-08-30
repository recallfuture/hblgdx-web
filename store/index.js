export const state = () => ({
  title: '',
  username: localStorage.getItem('username') || null,
  jwxtPassword: localStorage.getItem('jwxtPassword') || null,
  jxxtPassword: localStorage.getItem('jxxtPassword') || null,
  isLogin: localStorage.getItem('isLogin') || false,
  isJwxtLogin: false,
  isJxxtLogin: false,
  isMyncmcLogin: false,
  courses: localStorage.getItem('courses')
    ? JSON.parse(localStorage.getItem('courses'))
    : [],
  scoreReport: localStorage.getItem('scoreReport')
    ? JSON.parse(localStorage.getItem('scoreReport'))
    : null
})

export const mutations = {
  updateTitle(state, title) {
    state.title = title
  },

  updateUser(state, { username, jwxtPassword, jxxtPassword }) {
    state.username = username
    state.jwxtPassword = jwxtPassword
    state.jxxtPassword = jxxtPassword

    localStorage.setItem('username', username)
    localStorage.setItem('jwxtPassword', jwxtPassword)
    localStorage.setItem('jxxtPassword', jxxtPassword)
  },

  logout(state) {
    state.isLogin = false
    state.isJwxtLogin = undefined
    state.isJxxtLogin = undefined
    state.isMyncmcLogin = undefined

    localStorage.setItem('isLogin', false)
    localStorage.removeItem('isJwxtLogin')
    localStorage.removeItem('isJxxtLogin')
    localStorage.removeItem('isMyncmcLogin')
  },

  updateIsLogin(state, isLogin) {
    state.isLogin = isLogin
    localStorage.setItem('isLogin', isLogin)
  },

  updateJwxtLogin(state, isJwxtLogin) {
    state.isJwxtLogin = isJwxtLogin
    localStorage.setItem('isJwxtLogin', isJwxtLogin)
  },

  updateJxxtLogin(state, isJxxtLogin) {
    state.isJxxtLogin = isJxxtLogin
    localStorage.setItem('isJxxtLogin', isJxxtLogin)
  },

  updateMyncmcLogin(state, isMyncmcLogin) {
    state.isMyncmcLogin = isMyncmcLogin
    localStorage.setItem('isMyncmcLogin', isMyncmcLogin)
  },

  updateCourses(state, courses) {
    state.courses = courses
    localStorage.setItem('courses', JSON.stringify(courses))
  },

  removeCourses(state) {
    state.courses = undefined
    localStorage.removeItem('courses')
  },

  updateScoreReport(state, scoreReport) {
    state.scoreReport = scoreReport
    localStorage.setItem('scoreReport', JSON.stringify(scoreReport))
  },

  removeScoreReport(state) {
    state.scoreReport = undefined
    localStorage.removeItem('scoreReport')
  }
}
