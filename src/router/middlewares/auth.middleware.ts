import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';

export const authMiddleware = async ({
  to,
  from,
  next
}: {
  to: RouteLocationNormalized
  from: RouteLocationNormalized
  next: NavigationGuardNext
}) => {
  console.log("[authMiddleware]");
  console.log("to", to);
  console.log("from", from);

  next()
}