import Vue from "vue"
import App from "@/App"
import router from "@/router"
import store from "@/store/index"
import errorHandler from "@/services/errors/globalErrorHandler"
// Lib composants et css
import vuetify from "@/plugins/vuetify"
import "@u-iris/iris-front-ui"
import "@u-iris/iris-front-ui/dist/iris-front-ui.css"
import "@mdi/font/css/materialdesignicons.min.css"

Vue.config.productionTip = false
// Gestion globales des erreurs
errorHandler.addGlobalErrorHandling()

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app")
