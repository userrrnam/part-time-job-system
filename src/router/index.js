import { createRouter, createWebHistory } from 'vue-router'
const routes = [{
    path: '/',
    redirect: '/user/login'
  },
  {
    path: '/user/login',
    name: 'user',
    meta: {
      title: '登录 | 注册'
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
  },
  {
    path: '/company/home',
    name: "Company",
    meta: {
      title: '爱兼职 | 公司管理平台'
    },
    component: () => import("@/views/company/CompanyHome.vue"),
    children:[
      {
        path: '/company',
        redirect: '/company/home'
      },
      {
        path: '/company/jobManage',
        name: "jobManage",
        meta: {
          title: '职位管理'
        },
        component: () => import("@/views/company/job-manage/JobManage.vue")
      },
      {
        path: '/company/applyManage',
        name: 'ApplyManange',
        meta: {
          title: "申请管理"
        },
        component: () => import("@/views/company/apply-manage/ApplyManage.vue")
      },
      {
        path: '/company/companyInfo',
        name: 'CompanyInfo',
        meta: {
          title: "公司信息"
        },
        component: () => import("@/views/company/company-info/CompanyInfo.vue")
      }
    ]
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