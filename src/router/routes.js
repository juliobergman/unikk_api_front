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
        path: "/account",
        name: "account",
        component: () => import("pages/account.vue"),
        meta: {
          middlewares: [auth],
        },
      },
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("pages/Index.vue"),
        meta: {
          middlewares: [auth],
        },
      },
      {
        path: "/company",
        name: "company",
        component: () => import("pages/company.vue"),
        meta: {
          middlewares: [auth],
        },
      },
      {
        path: "/workgroup",
        name: "workgroup",
        component: () => import("pages/workgroup.vue"),
        meta: {
          middlewares: [auth],
        },
      },
      {
        path: "/pecc",
        name: "pecc",
        component: () => import("pages/pecc.vue"),
        meta: {
          middlewares: [auth],
        },
      },
      {
        path: "/target",
        name: "target",
        component: () => import("pages/target.vue"),
        meta: {
          middlewares: [auth],
        },
      },
      {
        path: "/contact",
        name: "contact",
        component: () => import("pages/contact.vue"),
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
