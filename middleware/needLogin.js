export default function({ store, redirect }) {
  if (!store.state.username) {
    redirect('/login')
  }
}
