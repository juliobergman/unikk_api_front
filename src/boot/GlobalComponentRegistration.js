import { boot } from "quasar/wrappers";
import UiNavLogo from "../components/ui/icon/nav.vue";
import UiMainLogo from "../components/ui/icon/main.vue";
import ProfileImage from "../components/ProfileImage.vue";
import LeftDrawer from "../components/ui/LeftDrawer.vue";
import RightDrawer from "../components/ui/RightDrawer.vue";
import ExpansionItemCompany from "../components/ExpansionItemCompany.vue";
//Transitions
import fadeFromBottom from "../components/transitions/fade-from-bottom.vue";
import flipV from "../components/transitions/flip-v.vue";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  // something to do
  app.component("ui-nav-logo", UiNavLogo);
  app.component("ui-main-logo", UiMainLogo);
  app.component("ui-left-drawer", LeftDrawer);
  app.component("ui-right-drawer", RightDrawer);
  app.component("expansion-item-company", ExpansionItemCompany);
  app.component("profile-image", ProfileImage);
  // Transitions
  app.component("fade-bottom-transition", fadeFromBottom);
  app.component("flip-v-transition", flipV);
});
