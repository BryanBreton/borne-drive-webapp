const actions = {
  currentState({ commit }, newState) {
    console.log("actions")
    commit('currentState', newState)
  },
}
export default actions
