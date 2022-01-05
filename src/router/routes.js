// Middlewares
import { auth } from "../middleware/user";

const routes = [
  {
    path: "/",
    component: () => import("layouts/login.vue"),
    children: [
      { path: "", name: "login", component: () => import("pages/login.vue") },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/main.vue"),
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("pages/Index.vue"),
        meta: {
          middlewares: [auth],
        },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
