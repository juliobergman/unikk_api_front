import { Cookies, Dark } from "quasar";

export function toggleLeftDrawer(state) {
  state.leftDrawer = !state.leftDrawer;
}
export function toggleRightDrawer(state) {
  state.rightDrawer = !state.rightDrawer;
}
export function setDarkMode(state, payload) {
  Cookies.set("dark", payload);
  Dark.set(payload);
  state.darkmode = payload;
}
