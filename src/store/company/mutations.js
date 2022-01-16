/*
export function someMutation (state) {
}
*/
export function setCompany(state, company) {
  state.id = company.id;
  state.currency_id = company.currency_id;
  state.name = company.name;
  state.type = company.type;
  state.address = company.address;
  state.city = company.city;
  state.sector = company.sector;
  state.country = company.country;
  state.phone = company.phone;
  state.email = company.email;
  state.website = company.website;
  state.info = company.info;
  state.logo = company.logo;
  state.currency_name = company.currency_name;
  state.currency_symbol = company.currency_symbol;
  state.currency_code = company.currency_code;
  state.country_name = company.country_name;
}
export function setId(state, id) {
  state.id = id;
}
export function setCurrencyId(state, currency_id) {
  state.currency_id = currency_id;
}
export function setName(state, name) {
  state.name = name;
}
export function setType(state, type) {
  state.type = type;
}
export function setAddress(state, address) {
  state.address = address;
}
export function setCity(state, city) {
  state.city = city;
}
export function setSector(state, sector) {
  state.sector = sector;
}
export function setCountry(state, country) {
  state.country = country;
}
export function setPhone(state, phone) {
  state.phone = phone;
}
export function setEmail(state, email) {
  state.email = email;
}
export function setWebsite(state, website) {
  state.website = website;
}
export function setInfo(state, info) {
  state.info = info;
}
export function setLogo(state, logo) {
  state.logo = logo;
}
export function setCurrencyName(state, currency_name) {
  state.currency_name = currency_name;
}
export function setCurrencySymbol(state, currency_symbol) {
  state.currency_symbol = currency_symbol;
}
export function setCurrencyCode(state, currency_code) {
  state.currency_code = currency_code;
}
export function setCountryName(state, country_name) {
  state.country_name = country_name;
}
