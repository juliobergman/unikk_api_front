export function setAuth(state, auth) {
  state.authorized = auth;
}
export function setToken(state, token) {
  state.token = token;
}
export function setUser(state, user) {
  state.user = user;
}
export function setCurrentMembership(state, currentMembership) {
  state.currentMembership = currentMembership;
}
export function setUserMemberships(state, userMemberships) {
  state.userMemberships = userMemberships;
}
export function setUserName(state, payload) {
  state.user.name = payload;
}
export function resetState(state) {
  state.authorized = false;
  state.token = false;
  state.user = {};
  state.currentMembership = {};
  state.userMemberships = {};
}
