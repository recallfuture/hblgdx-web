export const state = () => ({
  title: '',
  username: localStorage.getItem('username') || null,
  jwxtPassword: localStorage.getItem('jwxtPassword') || null,
  jxxtPassword: localStorage.getItem('jxxtPassword') || null,
  isJwxtLogin: false,
  isJxxtLogin: false,
  isMyncmcLogin: false,
  courses: localStorage.getItem('courses') || [],
  scoreReport: localStorage.getItem('scoreReport') || null
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
    localStorage.setItem('courses', courses)
  },

  updateScoreReport(state, scoreReoprt) {
    state.scoreReoprt = scoreReoprt
    localStorage.setItem('scoreReoprt', scoreReoprt)
  }
}
