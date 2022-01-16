import { Cookies } from "quasar";
import { api } from "src/boot/axios";

export function actionUser({ commit }) {
  console.log("Actions SetUser");
  let token = Cookies.get("user_token");
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
