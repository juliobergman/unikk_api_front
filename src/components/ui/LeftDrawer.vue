<template>
  <q-drawer show-if-above v-model="drawer" side="left">
    <q-scroll-area
      style="
        height: calc(100% - 195px);
        margin-top: 195px;
        border-right: 1px solid #ddd;
      "
    >
      <q-list padding>
        <q-item
          :to="item.to"
          v-for="(item, idx) in items"
          :key="idx"
          clickable
          v-ripple
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
      src="http://apiunikk:8080/storage/ui/abstract-001.png"
      style="height: 195px"
    >
      <div class="full-width full-height flex flex-center no-margin no-padding">
        <div class="row full-height">
          <div class="text-center self-start q-mb-sm q-mt-md col-12">
            <q-avatar size="75px">
              <img :src="'http://apiunikk:8080/' + avatar" />
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

import { Cookies } from "quasar";

const $store = useStore();
const $router = useRouter();

const items = [
  {
    title: "Dashboard",
    icon: "dashboard",
    to: "dashboard",
  },
  {
    title: "Company",
    icon: "domain",
    to: "company",
  },
  {
    title: "Workgroup",
    icon: "people_alt",
    to: "workgroup",
  },
  // {
  //   title: "Charts",
  //   icon: "analytics",
  //   to: "charts",
  // },
  {
    title: "Private Equity Funds",
    icon: "directions_boat",
    to: "pecc",
  },
  {
    title: "Targets",
    icon: "track_changes",
    to: "target",
  },
  // {
  //   title: "Financial",
  //   icon: "monetization_on",
  //   to: "financialStatement",
  // },
  {
    title: "Contacts",
    icon: "contacts",
    to: "contact",
  },
];

let drawer = computed({
  get: () => $store.state.app.leftDrawer,
  set: (val) => {
    $store.commit("app/toggleLeftDrawer", val);
  },
});

const avatar = $store.state.user.user.profile_pic;
const userName = $store.state.user.user.name;
const userSubtitle = $store.state.user.currentMembership.job_title;
</script>
