<template>
<v-container>
  <div class="about d-flex align-center pa-4 mx-auto" style="height: 100%">
      <img :src="imgAffichee" class="image"/>
      <div class="message d-flex align-center pa-4 mx-auto">
        <h1 align=center>{{ message }}</h1>
      </div>
  </div>

  </v-container>
</template>

<script>
import { mapState } from "vuex"
import axios from "axios"
export default {
  computed: {
    ...mapState("cartesStore", ["currentState"]),
  },
  mounted(){console.log(process.env.VUE_APP_PREFIXE_IMAGE);
    this.message = this.currentState
    axios.get('http://u3antu773.groupement.systeme-u.fr/SmartNews-FidAu/1mLHnbnM9c5nWYDR68EgaT8nTLt_hNwpr/borneDrive.json').then(res => {
      this.imgs = res.data
      this.nextImage()
    })
    this.test()
  },
  methods: {
    test(){
      axios.get("http://" + window.location.hostname + ":8080/commandes/" + this.numeroCarte + "/borne/1").then((resp) => {
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
      numeroCarte: localStorage.numeroCarte
    }
  },
}
</script>
<style>
.about {
    color: #007d8f;
    align: center;
}
.image{
  width: 100%;
  height: 25% !important;
  position: absolute;
  top: 0;
  left: 0;
}
.message {
 font-family:    Vollkorn, sans-serif;
 font-size:      20px;
 font-weight:    bold;
  position: absolute;
   top: 250px; left: 30px; width: 960px;

}
.aide {
  border: none !important;
  position: absolute;
  top: 660px;
  left: 940px;
}
body::-webkit-scrollbar {
  display: none;
}
</style>
