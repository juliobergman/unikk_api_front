// export function setUser (state) {
// }
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
