import { boot } from "quasar/wrappers";
import UiNavLogo from "../components/ui/icon/nav.vue";
import UiMainLogo from "../components/ui/icon/main.vue";
import LeftDrawer from "../components/ui/LeftDrawer.vue";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  // something to do
  app.component("ui-nav-logo", UiNavLogo);
  app.component("ui-main-logo", UiMainLogo);
  app.component("ui-left-drawer", LeftDrawer);
});
