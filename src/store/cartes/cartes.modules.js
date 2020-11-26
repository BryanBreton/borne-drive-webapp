import states from "./cartes.states"
import actions from "./cartes.actions"
import mutations from "./cartes.mutations"

const cartesStore = {
  namespaced: true,
  states,
  actions,
  mutations
}

export default cartesStore
