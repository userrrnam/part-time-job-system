import { createRouter, createWebHistory } from 'vue-router'
const routes = [{
    path: '/',
    redirect: '/user/login'
  },
  {
    path: '/user/login',
    name: 'user',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/user/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    meta: {
      title: '爱兼职'
    },
    component: () => import('@/views/home/Home.vue')
  },
  {
    path: '/user/register',
    name: 'Register',
    meta: {
      title: '注册'
    },
    component: () => import('@/views/user/Register.vue')
  },
  {
    path: '/user/person',
    name: 'Person',
    meta: {
      title: '爱兼职 | 个人信息'
    },
    component: () => import('@/views/user/person-info/PersonnalInfo.vue')
  },
  {
    path: '/user/apply',
    name: 'Apply',
    meta: {
      title: '爱兼职 | 我的申请'
    },
    component: () => import('@/views/user/my-apply/Apply.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, _, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
})
export default router