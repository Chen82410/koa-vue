<template>
  <div class="header-root">
    <mu-appbar class="top-bar" color="primary">
      <mu-button flat slot="right" :class="(router == '/home') ? 'active' : ''" @click="toRouter('/home')">首页</mu-button>
      <mu-button flat slot="right" :class="(router == '/release') ? 'active' : ''" @click="toRelease('/release')">发帖</mu-button>
      <mu-button flat slot="right" :class="(router == '/login') ? 'active' : ''" @click="toRouter('/login')">登陆</mu-button>
      <mu-button flat slot="right" :class="(router == '/register') ? 'active' : ''" @click="toRouter('/register')">注册</mu-button>
      <mu-button flat slot="right" @click="logOut()">退出</mu-button>
      <mu-button flat slot="right" :class="(router == '/mine') ? 'active' : ''" @click="toRouter('/mine')">个人中心</mu-button>
    </mu-appbar>
  </div>
</template>

<script type="text/ecmascript-6">
import Utils from '../utils/utils.js';
import Toast from "muse-ui-toast";

export default {
  data () {
    return {
      title: '',
      router: ''   
    }
  },
  mounted() {
    
  },
  methods: {
    toRouter(router) {
      this.$router.push(router)
    },
    logOut() {
      Utils.clearCookie('BLOG_CHEN')
      setTimeout(() => {
        this.$router.push('/login')
      }, 0);
    },
    toRelease() {
      if (!Utils.getCookie("BLOG_CHEN")) {
        Toast.info("请先登录!");
        this.$router.push("/login");
      } else {
        this.$router.push('/release')
      }
    }
  },
  watch: {
    $route(to, from) {
      this.router = to.path
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .top-bar
    width 100%
    height 75px
    position fixed
  .active
    font-size 24px
</style>
