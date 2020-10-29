<template>
  <div class="about d-flex align-center pa-4 mx-auto" style="height: 100%">
    <v-container>
      <div class="clavier d-flex align-center pa-4 mx-auto">
        <h1>{{ currentState }}</h1>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  computed: {
    ...mapState("cartesStore", ["currentState"]),
  },
  methods: {},
}
</script>
<style>
.about{
  background-color: #0077b2;
}
</style>