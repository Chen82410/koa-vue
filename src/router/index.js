import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 注册
const Register = (resolve) => {
  import('../pages/register/register').then((module) => {
    resolve(module)
  })
}

// 登陆
const Login = (resolve) => {
  import('../pages/login/login').then((module) => {
    resolve(module)
  })
}

// 首页
const Home = (resolve) => {
  import('../pages/home/home').then((module) => {
    resolve(module)
  })
}

// 个人中心
const Mine = (resolve) => {
  import('../pages/mine/mine').then((module) => {
    resolve(module)
  })
}

// 发帖
const Release = (resolve) => {
  import('../pages/release/release').then((module) => {
    resolve(module)
  })
}

// 帖子中心
const InvitationDetail = (resolve) => {
  import('../pages/invitationDetail/invitationDetail').then((module) => {
    resolve(module)
  })
}

// 404
const NotFound = (resolve) => {
  import('../pages/404.vue').then((module) => {
    resolve(module)
  })
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
      name: 'Register',
      component: Register
    },
    // 注册
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    // 登陆
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    // 首页
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    //帖子详情页
    {
      path: '/invitationDetail',
      name: 'InvitationDetail',
      component: InvitationDetail
    },
    // 个人中心
    {
      path: '/mine',
      name: 'Mine',
      component: Mine
    },
    // 发帖
    {
      path: '/release',
      name: 'Release',
      component: Release
    },
    // 404
    {
      path: '/404',
      name: "404",
      component: NotFound
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})

