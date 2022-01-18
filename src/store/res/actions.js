import { Cookies } from "quasar";
import { api } from "src/boot/axios";

export function actionCountries({ commit }) {
  let token = Cookies.get("user_token");
  if (token) {
    api
      .get("/api/country", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          commit("setCountries", response.data);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
}

export function actionCurrencies({ commit }) {
  let token = Cookies.get("user_token");
  if (token) {
    api
      .get("/api/currency", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          commit("setCurrencies", response.data);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
}
