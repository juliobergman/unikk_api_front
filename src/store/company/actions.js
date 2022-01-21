import { Cookies } from "quasar";
import { api } from "src/boot/axios";

export async function actionCompany({ commit, state }, payload = "hola") {
  let token = Cookies.get("user_token");
  console.log("actionCompany");
  return await api
    .get("/api/company/show/" + state.id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        commit("setCompany", response.data);
      }
    })
    .catch((error) => {
      console.log(error.response);
    });
}
