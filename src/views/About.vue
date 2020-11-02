<template>
  <div class="about page d-flex align-center pa-4 mx-auto" style="height: 100%">
    <v-container>
      <h1 class=".col-md-12 d-flex justify-center">Scannez votre carte ou entrez votre numero de carte</h1>
      <div class="numeroCarte">
        {{ numeroCarte }}
      </div>
      
      <v-row>
        <v-col class=".col-md-6 justify-center">
          <v-row>
            <v-col>
              <v-btn class="bouton" @click="clique('1')">1</v-btn>
            </v-col>
            <v-col>
              <v-btn class="bouton" @click="clique('2')">2</v-btn>
            </v-col>
            <v-col>
              <v-btn class="bouton" @click="clique('3')">3</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn class="bouton" @click="clique('4')">4</v-btn>
            </v-col>
            <v-col>
              <v-btn class="bouton" @click="clique('5')">5</v-btn>
            </v-col>
            <v-col>
              <v-btn class="bouton" @click="clique('6')">6</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn class="bouton" @click="clique('7')">7</v-btn>
            </v-col>
            <v-col>
              <v-btn class="bouton" @click="clique('8')">8</v-btn>
            </v-col>
            <v-col>
              <v-btn class="bouton" @click="clique('9')">9</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn class="bouton" @click="clique('0')">0</v-btn>
            </v-col>
            <v-col>
              <v-btn class="bouton orange" @click="effacer()">R</v-btn>
            </v-col>
            <v-col>
              <v-btn class="bouton green" @click="valider()">V</v-btn>
            </v-col>
          </v-row>
        </v-col>

        <v-col class=".col-md-6">
          <img src="../assets/scan.png" width="100%" />
        </v-col>
      </v-row>

      <div class="error">
        {{ message }}
      </div>
    </v-container>
  </div>
</template>

<script>
import axios from "axios"
export default {
  data() {
    return {
      numeroCarte: "",
      message: "",
    }
  },
  created: {
    setFocus() {
      this.$refs.numCarte.$el.focus()
    },
  },
  mounted() {

    const self = this; 

    window.addEventListener('keyup', function(ev) {
        console.log(typeof(ev.key));
        ev.key === "Enter" ? self.valider() : self.clique(ev.key); // declared in your component methods
    });
},
  methods: {
    clique(numero) {
      console.log(numero)
      this.numeroCarte = this.numeroCarte + numero
    },
    valider() {
      console.log("http://localhost:8080/commandes/" + this.numeroCarte)
      axios.get("http://localhost:8080/commandes/" + this.numeroCarte).then((resp) => {
        this.clientValider(resp.data.message)
      })
    },
    effacer() {
      console.log("oui")
      this.numeroCarte = this.numeroCarte.substring(0, this.numeroCarte.length - 1)
    },
    clientValider(carte) {
      this.$store.dispatch("cartesStore/currentState", carte)
      this.$router.push("Waiting")
    },
  },
}
</script>
<style>
.page {
  background-color: #0077b2 !important;
}
.bouton{
  height: 100% !important;
}
.numeroCarte{
  background-color: #fff !important;
  width: 25% !important;
}
</style>