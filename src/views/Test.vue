<template>
  <div class="about page d-flex align-center pa-4 mx-auto" style="height: 100%">
    <v-container>
      <div style="border: none !important; position: absolute; top: 0px; left: 0px">
        <img src="../assets/fond.jpg" alt="" />
      </div>
      <img :src="imgAffichee" class="image" style="height: 200px !important" />

      <div class="image" style="border: none !important; position: absolute; top: 0px; left: 0px">
        <img :src="image.src" alt="" />
      </div>
      <v-dialog v-model="visible" width="500">
        <v-card>
          <v-card-title class="headline grey lighten-2"> Veuillez patientez, quelqu'un va venir vous aider </v-card-title>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="visible = false"> Ok </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <div style="border: none !important; position: absolute; top: 320px; left: 100px; width: 290px">
        <v-btn class="mx-2 bouton" fab dark outlined block elevation="1" rounded text color="#007d8f">{{ numeroCarte }}</v-btn>
      </div>

      <div style="border: none !important; position: absolute; top: 410px; left: 100px">
        <v-btn class="mx-2 bouton" fab dark color="#007d8f" @click="clique('1')">1</v-btn>
      </div>
      <div style="border: none !important; position: absolute; top: 410px; left: 200px">
        <v-btn class="mx-2 bouton" fab dark color="#007d8f" @click="clique('2')"> 2 </v-btn>
      </div>
      <div style="border: none !important; position: absolute; top: 410px; left: 300px">
        <v-btn class="mx-2 bouton" fab dark color="#007d8f" @click="clique('3')"> 3 </v-btn>
      </div>
      <div style="border: none !important; position: absolute; top: 480px; left: 100px">
        <v-btn class="mx-2 bouton" fab dark color="#007d8f" @click="clique('4')"> 4 </v-btn>
      </div>
      <div style="border: none !important; position: absolute; top: 480px; left: 200px">
        <v-btn class="mx-2 bouton" fab dark color="#007d8f" @click="clique('5')"> 5 </v-btn>
      </div>
      <div style="border: none !important; position: absolute; top: 480px; left: 300px">
        <v-btn class="mx-2 bouton" fab dark color="#007d8f" @click="clique('6')"> 6 </v-btn>
      </div>
      <div style="border: none !important; position: absolute; top: 550px; left: 100px">
        <v-btn class="mx-2 bouton" fab dark color="#007d8f" @click="clique('7')"> 7 </v-btn>
      </div>
      <div style="border: none !important; position: absolute; top: 550px; left: 200px">
        <v-btn class="mx-2 bouton" fab dark color="#007d8f" @click="clique('8')"> 8 </v-btn>
      </div>
      <div style="border: none !important; position: absolute; top: 550px; left: 300px">
        <v-btn class="mx-2 bouton" fab dark color="#007d8f" @click="clique('9')"> 9 </v-btn>
      </div>
      <div style="border: none !important; position: absolute; top: 620px; left: 100px">
        <v-btn class="mx-2 bouton" fab dark color="#e22019" @click="effacer()"> c </v-btn>
      </div>
      <div style="border: none !important; position: absolute; top: 620px; left: 200px">
        <v-btn class="mx-2 bouton" fab dark color="#007d8f" @click="clique('0')"> 0 </v-btn>
      </div>
      <div style="border: none !important; position: absolute; top: 620px; left: 300px">
        <v-btn class="mx-2 bouton" fab dark color="#6bbdae" @click="valider()"> v </v-btn>
      </div>
      <div style="border: none !important; position: absolute; top: 660px; left: 940px" @click="help()">
        <img src="../assets/aide.png" alt="aide" />
      </div>
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
      indeximage: 0,
      imgs: ["/img/accueil.24d282dd.png", "/img/logo.82b9c7a5.png", "/img/scan.2052df9d.png"],
      imgDefaut: process.env.VUE_APP_PREFIXE_IMAGE + "/1U-rh5VycJ7X0gFteMn_59GoVXBipKSif4yyxLY0yChQ-1.png?2020-10-30T16:44:53",
      imgAffichee: process.env.VUE_APP_PREFIXE_IMAGE + "/1U-rh5VycJ7X0gFteMn_59GoVXBipKSif4yyxLY0yChQ-1.png?2020-10-30T16:44:53",
      numeroCarte: "",
      message: "",
      image: {},
      visible: false
    }
  },
  created: {},
  mounted() {
    localStorage.idBorne = this.$_GET("idBorne")
    console.log("page test")
    axios.get(process.env.VUE_APP_PREFIXE_IMAGE + "/accueil.json").then(res => {
      this.imgs = res.data
      this.nextImage()
    })
    //axios.get("http://u3antu773.groupement.systeme-u.fr/SmartNews-FidAu/1mLHnbnM9c5nWYDR68EgaT8nTLt_hNwpr/accueil.json").then(res => {
    //  console.log(res.data[0]);
    //  this.image = { src: process.env.VUE_APP_PREFIXE_IMAGE + res.data[0].src, delai: res.data[0].delai }
    //})
    const self = this

    window.addEventListener("keyup", function(ev) {
      console.log(typeof ev.key)
      if (ev.key >= "0" && ev.key <= "9") self.clique(ev.key)
      if (ev.key === "Enter") self.valider() // declared in your component methods
    })
  },
  methods: {
    $_GET(param) {
      const params = "?" + window.location.hash.split("?")[1]
      const urlParams = new URLSearchParams(params)
      const par = urlParams.get(param)
      return par
    },
    nextImage() {
      const nbElement = this.imgs.length
      if (nbElement != 0) {
        // si on a qqch dans le tableau
        if (this.indeximage >= nbElement - 1) {
          // si on est rendu a la fin du tableau
          this.indeximage = 0 // on revient au debut
          this.imgAffichee = process.env.VUE_APP_PREFIXE_IMAGE + "/" + this.imgs[this.indeximage].src
          setTimeout(this.nextImage, 3000)
        } else {
          // sinon on affiche la suivante
          this.indeximage = this.indeximage + 1
          this.imgAffichee = process.env.VUE_APP_PREFIXE_IMAGE + "/" + this.imgs[this.indeximage].src
          setTimeout(this.nextImage, 3000)
        }
      } else {
        // sinon on affiche une image par defaut
        console.log("tableau d'image vide")
        this.imgAffichee = this.imgDefaut
        setTimeout(this.nextImage, 30000)
      }
    },
    clique(numero) {
      console.log(numero)
      this.numeroCarte = this.numeroCarte + numero
    },
    valider() {
      console.log("http://" + window.location.hostname + ":3001/commandes/" + this.numeroCarte + "/borne/" + localStorage.idBorne)
      axios.get("http://" + window.location.hostname + ":3001/commandes/" + this.numeroCarte + "/borne/" + localStorage.idBorne).then(resp => {
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
    help() {
      // axios.post()
      console.log("appel api")
      axios.get("http://" + window.location.hostname + ":3001/bornes/help/" + localStorage.idBorne).then((this.visible = true))
    }
  }
}
</script>
<style>
.page {
  background-color: #0077b2 !important;
}
.bouton {
  font-size: 200% !important;
}
.numeroCarte {
  background-color: #fff !important;
  width: 20% !important;
  height: 30px;
  font-size: 15px;
}
.help {
  background-image: url("../assets/aide.png");
}
.image {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  max-width: 100% !important;
}

body::-webkit-scrollbar {
  display: none;
}
</style>
