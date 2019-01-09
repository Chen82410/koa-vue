<template>
  <div class="home-root">
    <mu-container class="release-bg">
      <mu-form :model="form" class="mu-demo-form" :label-position="labelPosition" label-width="100">
        <mu-form-item prop="title" label="标题">
          <mu-text-field v-model="form.title"></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="content" label="内容">
          <mu-text-field multi-line :rows="3" :rows-max="6" v-model="form.content"></mu-text-field>
        </mu-form-item>
        <mu-form-item>
          <mu-button color="primary" @click="submit()">发表</mu-button>
          <mu-button @click="clear()">清空</mu-button>
        </mu-form-item>
      </mu-form>
    </mu-container>
  </div>
</template>

<script>
  import {releaseInvitation} from '../../service/index.js'
  import BASE64 from '../../utils/base64.js'
  import Utils from '../../utils/utils.js'
  import Toast from "muse-ui-toast"

export default {
  data () {
    return {
      labelPosition: 'top',
      form: {
        title: '',
        content: ''
      }
    }
  },
  methods: {
    submit() {
      let that = this
      let account = BASE64.decode(this.$store.state.token)
      // if (!account) {
      //   Toast.info('请先登陆!')
      //   this.$router.push('/login')
      //   return
      // } else if (!this.form.content.length) {
      //   Toast.info('内容不能为空!')
      //   return
      // }
      releaseInvitation(account, JSON.stringify(this.form))
      .then(res => {
        console.log(res)
        if (res.status === 200 && res.data.retcode === 1) {
          Toast.info(res.data.errMsg)
          that.$router.push('/home')
        }
      })
      .catch(error => {
        Toast.info(res.data.errMsg)
      })
    },
    clear() {
      this.form = {
        title: '',
        content: ''
      }
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .release-bg 
    display flex
    align-items center
    justify-content center
    .mu-demo-form 
      padding 16px 8px
      width 100%
      max-width 460px
      margin-top 100px
      border-radius 8px
      box-shadow 0 0 10px rgba(80, 200, 100, .5)
      background-color #ffffff
      .mu-form-item-content
        display flex
        justify-content center !important 
</style>
