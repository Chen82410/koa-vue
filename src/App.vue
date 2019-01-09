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
import Utils from './utils/utils'

export default {
  name: 'App',
  components: {
    TopHeader
  },
  created() {
    bus.$on('login',(url) => {
      if (url === '/login') {
        Utils.clearCookie('BLOG_CHEN')
        this.$router.push(url)
      }
    }),
    this.$store.state.token = Utils.getCookie('BLOG_CHEN')
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
