const actions = {
  currentState({ commit }, newState) {
    console.log("actions")
    console.log(newState)
    commit("currentState", newState)
  }
}
export default actions
