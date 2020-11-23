<template>
  <div class="page" @click="start()" style="height:100%">
    <img alt="Vue logo" width="100%" height="70%" src="../assets/accueil.png">

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  methods:{
    start(){
      console.log('ouiiiiiiiii')
      this.$router.push('about')
    }
  }
}
</script>

<style>
.page{
  background-color: #0077b2 !important;
}
body::-webkit-scrollbar {
  display: none;
}
</style>
