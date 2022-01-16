import { Cookies } from "quasar";
import { api } from "src/boot/axios";

export function actionCompany({ commit }) {
  console.log("Actions SetCompany");
  let token = Cookies.get("user_token");

  return;

  api
    .get("/api/user", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        commit("setAuth", response.data.auth);
        commit("setToken", response.data.token);
        commit("setUser", response.data.user);
        commit("setCurrentMembership", response.data.currentMembership);
        commit("setUserMemberships", response.data.userMemberships);
      }
    })
    .catch((error) => {
      console.log(error.response);
    });
}