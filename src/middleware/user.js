import { Cookies } from "quasar";
import { api } from "src/boot/axios";
import { Dialog } from "quasar";

export async function auth({ next, store }) {
  let token = Cookies.get("user_token");
  await api
    .get("/api/user/auth", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .catch((error) => {
      Dialog.create({
        color: "warning",
        dark: false,
        title: "Session Timeout",
        message: "You have been logged out because your session has expired",
        persistent: true,
      });

      return next({ name: "login" });
    });

  return next();
}
