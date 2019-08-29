export default function({ store, route, redirect }) {
  if (!store.state.username) {
    redirect('/login')
  }
}
