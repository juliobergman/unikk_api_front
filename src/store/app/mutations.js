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
export function resetState(state) {
  state.baseurl = process.env.API_BASE_URL;
  state.loading = false;
  state.leftDrawer = true;
  state.rightDrawer = false;
  state.darkmode = "auto";
}
