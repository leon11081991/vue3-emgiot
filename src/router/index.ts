import type { RouteLocationNormalized } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router'

import IndexView from '@/views/IndexView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: IndexView,
    meta: {
      middleware: [],
    }
  }
]

const scrollBehavior = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  savedPosition: any
) => {
  if (savedPosition) {
    return savedPosition;
  } else {
    return { top: 0 };
  }
};


export const createAppRouter = () => {

  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior
  })

  // 設置middleware
  router.beforeEach((to, from, next) => {

    if (!to.meta.middleware) {
      // 沒有設定middleware，允許路由繼續
      return next()
    }

    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];
    const context = { to, from, next };
    let idx = 0; // 初始化中間件索引

    // 定義執行中間件的函數
    const run = () => {
      if (idx < middleware.length) {
        const mw = middleware[idx]; // 獲取當前中間件
        mw({
          ...context,
          next: () => {
            idx++; // 移動到下一個中間件
            run(); // 繼續執行下一個中間件
          }
        });
      } else {
        next(); // 所有中間件執行完畢，繼續路由導航
      }
    };
    run(); // 開始執行中間件
  })

  return { router }
}
