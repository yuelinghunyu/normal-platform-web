const moduleRoutes = [
  {
    path: "/demo",
    name: "demoRoute",
    component: () =>
      import(/* webpackChunkName: "Demo" */ "Src/views/demo/index.vue"),
  },
];
export { moduleRoutes };
