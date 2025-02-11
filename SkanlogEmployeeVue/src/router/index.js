import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/skanlog-employee-dashboard',
      name: 'employee-management',
      component: () => import('../views/EmployeeManagementView.vue'),
    },
    // {
    //   path: '/employee-management',
    //   name: 'employeeManagement',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/EmployeeManagementView.vue'),
    // },
  ],
})

export default router
