import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import('../views/Home/Home')
const Profile = () => import('../views/Profile/Profile')

const routes = [
  {
    path: '/',
    meta: {title: '首页'},
    redirect: '/home' /*redirect重定向*/
  },
  {path: '/home', meta: {title: '首页'}, component: Home},
  {path: '/profile', meta: {title: '个人中心'}, component: Profile},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
