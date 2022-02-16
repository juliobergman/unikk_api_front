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
  state.shares = company.shares;
  state.taxrate = company.taxrate;
  state.currency_name = company.currency_name;
  state.currency_symbol = company.currency_symbol;
  state.currency_code = company.currency_code;
  state.country_name = company.country_name;
  state.country_region = company.country_region;
  state.country_subregion = company.country_subregion;
  state.country_latitude = company.country_latitude;
  state.country_longitude = company.country_longitude;
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
export function setShares(state, shares) {
  state.shares = shares;
}
export function setTaxRate(state, taxrate) {
  state.taxrate = taxrate;
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
export function setCountryRegion(state, country_region) {
  state.country_region = country_region;
}
export function setCountrySubregion(state, country_subregion) {
  state.country_subregion = country_subregion;
}
export function setCountryLatitude(state, country_latitude) {
  state.country_latitude = country_latitude;
}
export function setCountryLongitude(state, country_longitude) {
  state.country_longitude = country_longitude;
}

export function resetState(state) {
  state.id = "";
  state.currency_id = "";
  state.name = "";
  state.type = "";
  state.address = "";
  state.city = "";
  state.sector = "";
  state.country = "";
  state.phone = "";
  state.email = "";
  state.website = "";
  state.info = "";
  state.logo = "";
  state.shares = "";
  state.taxrate = "";
  state.currency_name = "";
  state.currency_symbol = "";
  state.currency_code = "";
  state.country_name = "";
  state.country_region = "";
  state.country_subregion = "";
  state.country_latitude = "";
  state.country_longitude = "";
}
