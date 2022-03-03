<template>
  <q-drawer show-if-above v-model="drawer" side="left">
    <q-scroll-area style="height: calc(100% - 195px); margin-top: 195px">
      <q-list padding>
        <!-- :active="item.active" -->
        <q-item
          :to="{ name: item.to }"
          v-for="(item, idx) in items"
          :key="idx"
          clickable
          v-ripple
          active-class="text-secondary"
        >
          <q-item-section avatar>
            <q-icon :name="item.icon" />
          </q-item-section>

          <q-item-section> {{ item.title }} </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>

    <q-img
      class="absolute-top"
      :src="$store.state.app.baseurl + '/storage/ui/abstract-001.png'"
      style="height: 195px"
    >
      <div class="full-width full-height flex flex-center no-margin no-padding">
        <div class="row full-height">
          <div class="text-center self-start q-mb-sm q-mt-md col-12">
            <q-avatar size="75px">
              <img :src="$store.state.app.baseurl + avatar" />
            </q-avatar>
          </div>
          <div class="col-12 text-center">
            <div class="avatar-name text-center">
              {{ userName }}
            </div>
            <div class="avatar-subtitle text-center q-my-xs">
              {{ userSubtitle }}
            </div>
          </div>
        </div>
      </div>
    </q-img>
  </q-drawer>
</template>

<script setup>
import { ref } from "vue";

import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import { Cookies, Platform } from "quasar";

// Platform
let $mobile = computed({
  get: () => (Platform.is.mobile ? true : false),
});

const $store = useStore();
const $router = useRouter();

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
  {
    title: "Account",
    icon: "person",
    to: "account",
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

let drawer = computed({
  get: () => $store.state.app.leftDrawer,
  set: (val) => {
    $store.commit("app/toggleLeftDrawer", val);
  },
});

if ($mobile.value) drawer.value = false;

let avatar = computed({
  get: () =>
    $store.state.user.user.profile_pic || "/storage/ui/abstract-001.png",
  set: (val) => {
    $store.commit("app/toggleLeftDrawer", val);
  },
});
let userName = computed({
  get: () => $store.state.user.user.name || "User Name",
  set: (val) => {
    $store.commit("app/toggleLeftDrawer", val);
  },
});
let userSubtitle = computed({
  get: () => $store.state.user.currentMembership.job_title || "Job Title",
  set: (val) => {
    $store.commit("app/toggleLeftDrawer", val);
  },
});
</script>
