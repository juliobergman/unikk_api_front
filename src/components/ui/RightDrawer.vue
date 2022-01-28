<template>
  <q-drawer v-model="drawer" side="right" overlay bordered>
    <q-scroll-area
      style="
        height: calc(100% - 51px);
        margin-top: 51px;
        border-right: 1px solid #ddd;
      "
    >
      <q-list>
        <q-item tag="label" v-ripple>
          <q-item-section avatar>
            <q-icon name="dark_mode" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dark Mode</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-toggle
              indeterminate-value="'auto'"
              color="secondary"
              v-model="darkMode"
            />
          </q-item-section>
        </q-item>

        <q-item to="account" clickable v-ripple active-class="text-secondary">
          <q-item-section avatar>
            <q-icon name="perm_identity" />
          </q-item-section>

          <q-item-section> My Account </q-item-section>
        </q-item>

        <expansion-item-company @updated="closeDrawer" />

        <q-item clickable v-ripple @click="logout">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>

          <q-item-section> Logout </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>

    <div class="absolute-top bg-primary" style="height: 51px">
      <div class="full-width full-height flex flex-center no-padding">
        <div class="col text-left q-px-xs">
          <q-btn
            flat
            rounded
            padding="xs"
            size="18px"
            color="white"
            icon="chevron_right"
            @click="closeDrawer"
          />
        </div>
      </div>
    </div>
  </q-drawer>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Cookies, useQuasar } from "quasar";
import ExpansionItemCompany from "../ExpansionItemCompany.vue";

const $q = useQuasar();
const $store = useStore();
const $router = useRouter();

let darkMode = computed({
  get: () => $q.dark.mode,
  set: (val) => $store.commit("app/setDarkMode", val),
});

let drawer = computed({
  get: () => $store.state.app.rightDrawer,
  set: (val) => {
    $store.commit("app/toggleRightDrawer", val);
  },
});

function closeDrawer() {
  drawer.value = false;
}

function logout() {
  $q.loading.show();
  Cookies.remove("user_authorization");
  Cookies.remove("user_token");
  setTimeout(() => {
    $q.loading.hide();
    $router.push({ name: "login" });
  }, 200);
}

const items = [
  {
    title: "Dashboard",
    icon: "dashboard",
    to: "dashboard",
    active: false,
  },
  {
    title: "Company",
    icon: "domain",
    to: "company",
    active: true,
  },
  {
    title: "Workgroup",
    icon: "people_alt",
    to: "workgroup",
    active: false,
  },
  {
    title: "Private Equity Funds",
    icon: "directions_boat",
    to: "pecc",
    active: false,
  },
  {
    title: "Targets",
    icon: "track_changes",
    to: "target",
    active: false,
  },
  {
    title: "Contacts",
    icon: "contacts",
    to: "contact",
    active: false,
  },
  // {
  //   title: "Charts",
  //   icon: "analytics",
  //   to: "charts",
  // },
  // {
  //   title: "Financial",
  //   icon: "monetization_on",
  //   to: "financialStatement",
  // },
];
</script>
