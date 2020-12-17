import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const IndexPage  = () => import('../views/index')
const DiagramDesign = () => import('../views/DiagramDesign/DiagramDesign')
const Home = () => import('../views/Home/Home')
const Profile = () => import('../views/Profile/Profile')
const Draggable = () => import('../views/Draggable/Draggable')


const routes = [
  {
    path: '/',
    meta: {title: '首页'},
    redirect: '/index' /*redirect重定向*/
  },

  {path: '/index', meta: {title: '引导页'}, component: IndexPage},
  {path: '/home', meta: {title: '首页'}, component: Home},
  {path: '/profile', meta: {title: '个人中心'}, component: Profile},
  {path: '/draggable', meta: {title: '拖拽示例'}, component: Draggable},
  {path: '/diagram-design', meta: {title: '可视化设计'}, component: DiagramDesign}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
