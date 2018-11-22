<template>
  <div id="app">
    <top-header></top-header>
    <div style="width: 100%; height:75px;"></div>
    <router-view/>
  </div>
</template>

<script>
import TopHeader from './components/header'

export default {
  name: 'App',
  components: {
    TopHeader
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
