import type { RouteLocationNormalized, NavigationGuardNext, Router } from 'vue-router';

export const layoutMiddleware = async ({
  to,
  from,
  next,
  router
}: {
  to: RouteLocationNormalized;
  from: RouteLocationNormalized;
  next: NavigationGuardNext;
  router: Router;
}) => {
  const layout = to.meta.layout || 'LayoutDefault';

  // 加載layout
  try {
    const layoutComponent = await import(`@/layouts/${layout}.vue`);
    to.meta.layoutComponent = layoutComponent.default;
  } catch (error) {
    console.log("layoutComponent error", error);
  }

  next()
}