<template>
  <div class="register-root">
    <mu-container class="register-bg">
      <mu-form ref="form" :model="validateForm" class="mu-demo-form">
        <mu-form-item label="账号" help-text="帮助文字" prop="account" :rules="accountRules">
          <mu-text-field v-model="validateForm.account" prop="account"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="密码" prop="password" :rules="passwordRules">
            <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="isAgree" :rules="argeeRules">
          <mu-checkbox label="同意用户协议" v-model="validateForm.isAgree"></mu-checkbox>
        </mu-form-item>
        <mu-form-item>
          <mu-button color="primary" @click="submit">注册</mu-button>
          <mu-button @click="clear">重置</mu-button>
        </mu-form-item>
      </mu-form>
    </mu-container>
  </div>
</template>

<script>
  import {register, getInvitationList} from '../../service/index.js'
  import Utils from '../../utils/utils.js'
  import Toast from 'muse-ui-toast'

export default {
  data () {
    return {
      accountRules: [
        { validate: (val) => !!val, message: '必须填写用户名'},
        { validate: (val) => val.length >= 3, message: '用户名长度大于3'}
      ],
      passwordRules: [
        { validate: (val) => !!val, message: '必须填写密码'},
        { validate: (val) => val.length >= 3 && val.length <= 10, message: '密码长度大于3小于10'}
      ],
      argeeRules: [{ validate: (val) => !!val, message: '必须同意用户协议'}],
      validateForm: {
        account: '',
        password: '',
        isAgree: false
      }
    }
  },
  mounted() {
    
  },
  methods: {
    submit () {
      if (Utils.getCookie("BLOG_CHEN")) {
        Toast.info('您已登陆,请先退出!')
        return
      }
      this.$refs.form.validate().then((result) => {
        console.log('form valid: ', result)
        if (result) {
          register(this.validateForm.account, this.validateForm.password)
          .then(res => {
            console.log(res)
            if (res.status === 200) {
              Toast.info(res.data.errMsg)
              this.$router.push({
                path: '/login'
              })
            }
          })
          .catch(err => {
            console.log(err)
          })
        }
      });
    },
    clear () {
      this.$refs.form.clear();
      this.validateForm = {
        account: '',
        password: '',
        isAgree: false
      };
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .register-bg 
    display flex
    align-items center
    justify-content center
    .mu-demo-form 
      padding 16px 8px
      width 100%
      max-width 460px
      margin-top 100px
      border-radius 8px
      box-shadow 0 0 10px rgba(110, 100, 240, .5)
      background-color #ffffff
</style>
