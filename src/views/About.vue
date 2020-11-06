<template>
  <div class="about page d-flex align-center pa-4 mx-auto" style="height: 100%">
    <v-container>
      <div class="image">
        <img :src="image.src" alt="">
      </div>
        <v-dialog
        v-model="visible"
        width="500"
      >
        <v-card>
          <v-card-title class="headline grey lighten-2">
            Nous allons venir a votre aide
          </v-card-title>

          <v-card-text>
            Veuillez patientez, quelqu'un va venir vous aider       
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="visible = false"
            >
              Ok
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <h1 class=".col-md-12 d-flex justify-center">Scannez votre carte ou entrez votre numero de carte</h1>
      <div class="numeroCarte">
        {{ numeroCarte }}
      </div>
      
      <v-row>
        <v-col class=".col-md-6 justify-center">
          <v-row>
            <v-col>
              <v-btn x-large class="bouton ma-0" @click="clique('1')">1</v-btn>
            </v-col>
            <v-col>
              <v-btn x-large class="bouton ma-0" @click="clique('2')">2</v-btn>
            </v-col>
            <v-col>
              <v-btn x-large class="bouton ma-0" @click="clique('3')">3</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn x-large class="bouton ma-0" @click="clique('4')">4</v-btn>
            </v-col>
            <v-col>
              <v-btn x-large class="bouton ma-0" @click="clique('5')">5</v-btn>
            </v-col>
            <v-col>
              <v-btn x-large class="bouton ma-0" @click="clique('6')">6</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn x-large class="bouton ma-0" @click="clique('7')">7</v-btn>
            </v-col>
            <v-col>
              <v-btn x-large class="bouton ma-0" @click="clique('8')">8</v-btn>
            </v-col>
            <v-col>
              <v-btn x-large class="bouton ma-0" @click="clique('9')">9</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn x-large class="bouton ma-0" @click="clique('0')">0</v-btn>
            </v-col>
            <v-col>
              <v-btn x-large class="bouton orange ma-0" @click="effacer()">R</v-btn>
            </v-col>
            <v-col>
              <v-btn x-large class="bouton green ma-0" @click="valider()">V</v-btn>
            </v-col>
          </v-row>
        </v-col>

        <v-col class=".col-md-6">
          <img src="../assets/scan.png" width="100%" />
        </v-col>
      </v-row>
      <v-row>
        <v-col class=".col-md-6">
          
        </v-col>
        <v-col class=".col-md-6">
          <v-row @click="help()">
            <img src="../assets/aide.png" alt="aide">
          </v-row>
          <v-row>
            Besoin d'aide
          </v-row>
            
            
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
      image: {},
      visible: false
    }
  },
  created: {
    
  },
  mounted() {
    console.log("yayayay");
    axios.get("http://u3antu773.groupement.systeme-u.fr/SmartNews-FidAu/1mLHnbnM9c5nWYDR68EgaT8nTLt_hNwpr/accueil.json").then(res => {
      console.log(res.data[0]);
      this.image = { src: process.env.VUE_APP_PREFIXE_IMAGE + res.data[0].src, delai: res.data[0].delai }
    })
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
      console.log("http://localhost:8080/commandes/" + this.numeroCarte + "/borne/1")
      axios.get("http://localhost:8080/commandes/" + this.numeroCarte + "/borne/1").then((resp) => {
        this.clientValider(resp.data.message)
      })
    },
    effacer() {
      console.log("oui")
      this.numeroCarte = this.numeroCarte.substring(0, this.numeroCarte.length - 1)
    },
    clientValider(carte) {
      this.$store.dispatch("cartesStore/currentState", carte)
      localStorage.numeroCarte = this.numeroCarte
      this.$router.push("Waiting")
    },
    help(id) {
      // axios.post() 
      console.log("appel api");
      axios.get("http://localhost:8080/bornes/help/1").then(this.visible = true)
    }
  },
}
</script>
<style>
.page {
  background-color: #0077b2 !important;
}
.bouton{
  width: 100% !important;
  font-size: 300% !important;

}
.numeroCarte{
  background-color: #fff !important;
  width: 25% !important;
}
.help{
  background-image: url('../assets/aide.png');
}
.image{
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  max-width: 100% !important;
}
</style>