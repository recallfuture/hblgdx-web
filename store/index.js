export const state = () => ({
  title: ''
})

export const mutations = {
  changeTitle(state, title) {
    state.title = title
  }
}
