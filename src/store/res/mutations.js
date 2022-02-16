export function setCountries(state, payload) {
  state.countries = payload;
}
export function setCurrencies(state, payload) {
  state.currencies = payload;
}
export function resetState(state) {
  state.countries = [];
  state.currencies = [];
}
