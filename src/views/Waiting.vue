<template>
  <div class="about d-flex align-center pa-4 mx-auto" style="height: 100%">
    <v-container>
      <img :src="imgAffichee" class="image"/>
      <div class="clavier d-flex align-center pa-4 mx-auto">
        <h1>{{ message }}</h1>
        <v-btn @click="test()">test actu</v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex"
import axios from "axios"
export default {
  computed: {
    ...mapState("cartesStore", ["currentState"]),
  },
  mounted(){
    console.log(process.env.VUE_APP_PREFIXE_IMAGE);
    this.message = this.currentState
    axios.get('http://u3antu773.groupement.systeme-u.fr/SmartNews-FidAu/1mLHnbnM9c5nWYDR68EgaT8nTLt_hNwpr/borneDrive.json').then(res => {
      this.imgs = res.data
    })
    this.nextImage()
  },
  methods: {
    test(){
      axios.get("http://localhost:8080/commandes/" + this.numeroCarte).then((resp) => {
        console.log("jsuis la")
        this.message = resp.data.message
        setTimeout(() => {
          this.test()
        }, 3000);
      })
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
  },
  data() {
    return {
      message: "",
      indeximage: 0,
      imgs: [
        "/img/accueil.24d282dd.png",
        "/img/logo.82b9c7a5.png",
        "/img/scan.2052df9d.png",
        ],
      imgDefaut: process.env.VUE_APP_PREFIXE_IMAGE + '/1U-rh5VycJ7X0gFteMn_59GoVXBipKSif4yyxLY0yChQ-1.png?2020-10-30T16:44:53',
      imgAffichee: process.env.VUE_APP_PREFIXE_IMAGE + '/1U-rh5VycJ7X0gFteMn_59GoVXBipKSif4yyxLY0yChQ-1.png?2020-10-30T16:44:53',
      numeroCarte: 123456789
    }
  },
}
</script>
<style>
.about {
  background-color: #0077b2;
}
.image{
  width: 100%;
  height: 25% !important;
  position: absolute;
  top: 0;
  left: 0;
}
</style>