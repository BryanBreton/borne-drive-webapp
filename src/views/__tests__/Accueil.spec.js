import { shallowMount } from "@vue/test-utils"
import Accueil from "@/views/Accueil"
import Vue from "vue"
Vue.config.ignoredElements = ["v-card"]

describe("Accueil.vue", () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Accueil, {})
  })

  describe("Component", () => {
    it("components are Vue instances", () => {
      expect(wrapper.isVueInstance()).toBeTruthy()
    })
    it("is a Accueil component", () => {
      expect(wrapper.is(Accueil)).toBe(true)
    })
  })
})
