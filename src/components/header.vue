<template>
  <div class="header-root">
    <mu-appbar class="top-bar" color="primary">
      <!-- <mu-button flat icon slot="left">
        <mu-icon value="menu"></mu-icon>
      </mu-button> -->
      <span slot="default">{{pageName}}</span>
      <mu-menu slot="left" :open.sync="open">
        <mu-button flat icon>
          <mu-icon value="menu"></mu-icon>
        </mu-button>
        <mu-list slot="content">
          <mu-list-item button @click="toRouter('/home')">
            <mu-list-item-content>
              <mu-list-item-title>首页</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-list-item button @click="toRelease('/release')">
            <mu-list-item-content>
              <mu-list-item-title>发帖</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-list-item button @click="toRouter('/login')">
            <mu-list-item-content>
              <mu-list-item-title>登陆</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-list-item button @click="toRouter('/register')">
            <mu-list-item-content>
              <mu-list-item-title>注册</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-list-item button @click="logOut()">
            <mu-list-item-content>
              <mu-list-item-title>退出</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-list-item button @click="toRouter('/mine')">
            <mu-list-item-content>
              <mu-list-item-title>个人中心</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
      </mu-menu>

      <!-- <mu-button flat slot="right" :class="(router == '/home') ? 'active' : ''" @click="toRouter('/home')">首页</mu-button>
      <mu-button flat slot="right" :class="(router == '/release') ? 'active' : ''" @click="toRelease('/release')">发帖</mu-button>
      <mu-button flat slot="right" :class="(router == '/login') ? 'active' : ''" @click="toRouter('/login')">登陆</mu-button>
      <mu-button flat slot="right" :class="(router == '/register') ? 'active' : ''" @click="toRouter('/register')">注册</mu-button>
      <mu-button flat slot="right" @click="logOut()">退出</mu-button>
      <mu-button flat slot="right" :class="(router == '/mine') ? 'active' : ''" @click="toRouter('/mine')">个人中心</mu-button> -->
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
      router: '',
      open: false,
      pageName: '首页'
    }
  },
  mounted() {
    
  },
  methods: {
    toRouter(router) {
      this.$router.push(router)
      this.open = !this.open
    },
    logOut() {
      Utils.clearCookie('BLOG_CHEN')
      setTimeout(() => {
        this.$router.push('/login')
        this.open = !this.open
      }, 0);
    },
    toRelease() {
      if (!Utils.getCookie("BLOG_CHEN")) {
        Toast.info("请先登录!");
        this.$router.push("/login");
        this.open = !this.open
      } else {
        this.$router.push('/release')
        this.open = !this.open
      }
    },
  },
  watch: {
    $route(to, from) {
      this.router = to.path
      console.log(to.path)
      switch(to.path) {
        case '/home': 
          this.pageName = '首页'
          break;
        case '/release':
          this.pageName = '发帖'
          break;
        case '/login':
          this.pageName = '登陆'
          break;
        case '/register':
          this.pageName = '注册'
          break;
        case '/mine':
          this.pageName = '个人中心'
          break;
        case '/invitationDetail':
          this.pageName = '帖子详情'
          break;
      }
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
  .mu-appbar-title
    text-align center !important
</style>
