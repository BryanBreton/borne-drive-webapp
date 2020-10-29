const mutations = {
  currentState(state, newState) {
    console.log("mutation")
    state.currentState = newState
    console.log(state.currentState)
  }
}
export default mutations
