import Vue from "vue";
import VueRouter from "vue-router";
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
VueRouter.prototype.replace = function push(location) {
  return originalReplace.call(this, location).catch((err) => err);
};
Vue.use(VueRouter);
const moduleRoutes = [];
const files = require.context("./modules", false, /\.js$/);
files.keys().forEach((key) => {
  const moduleRs = files(key).moduleRoutes;
  if (moduleRs && moduleRs.length) moduleRoutes.push(...moduleRs);
});
const router = new VueRouter({
  routes: [
    {
      path: "/",
      redirect: "/demo",
    },
    ...moduleRoutes,
  ],
});
export default router;
