import {
  createRouter,
  createWebHistory
} from 'vue-router'
import {
  getToken
} from '../util/storage'
const routes = [{
    path: '/',
    redirect: '/user/login'
  },
  {
    path: '/user/login',
    name: 'user',
    component: () => import('@/views/user/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/Home.vue')
  },
  {
    path: '/user/register',
    name: 'Register',
    component: () => import('@/views/user/Register.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path === '/user/register' || to.path === '/user/login') {
    return next();
  }
  const token = getToken();
  if (!token) {
    return next('/user/login');
  }
  next();
})
export default router