import { createRouter, createWebHashHistory } from 'vue-router'
export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/projects'
    },
    {
      path: '/projects',
      name: 'projects',
      component: (): Promise<typeof import('*.vue')> => import('@/views/projects.vue')
    },
    {
      path: '/setting',
      name: 'setting',
      component: (): Promise<typeof import('*.vue')> => import('@/views/setting.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: (): Promise<typeof import('*.vue')> => import('@/views/about.vue')
    }
  ]
})
