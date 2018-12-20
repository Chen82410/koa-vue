<template>
  <div id="app">
    <top-header></top-header>
    <div style="width: 100%; height:75px;"></div>
    <router-view/>
  </div>
</template>

<script>
import TopHeader from './components/header'
import bus from './bus.js'

export default {
  name: 'App',
  components: {
    TopHeader
  },
  created() {
    bus.$on('goto', (url) => {
      this.$router.push(url)
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
