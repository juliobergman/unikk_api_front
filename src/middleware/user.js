import { Cookies } from "quasar";
/**
 * Auth middleware example.
 */
export function auth(/* { to, from, next, store } */ { next }) {
  let auth = Cookies.get("user_authorization");
  if (!auth) {
    return next({ name: "login" });
  }
  return next();
}
