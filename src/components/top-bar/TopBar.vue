<template>
  <v-app-bar app color="primary" dark>
    <v-spacer></v-spacer>

    <h2>Projet bornedrive</h2>

    <v-spacer></v-spacer>

    <iris-logout-dropdown :arrow="false" v-on:logoutEvent="logout()">
      <template slot="avatar">
        <iris-avatar
          :size="40"
          :username="`${utilisateurConnecte.prenom} ${utilisateurConnecte.nom}`"
          :background-color="backgroundColor"
          :color="fontColor"
        ></iris-avatar>
      </template>
    </iris-logout-dropdown>
  </v-app-bar>
</template>

<script>
import { mapState, mapActions } from "vuex"

export default {
  name: "TopBar",
  data: () => ({
    backgroundColor: "#056f90",
    fontColor: "white"
  }),
  computed: {
    ...mapState("commonStore", ["utilisateurConnecte"])
  },
  methods: {
    ...mapActions("commonStore", ["logout"])
  }
}
</script>
