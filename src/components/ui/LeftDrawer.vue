<template>
  <q-drawer show-if-above v-model="drawer" side="left" bordered>
    <q-scroll-area
      style="
        height: calc(100% - 150px);
        margin-top: 150px;
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
      src="http://apiunikk:8080/storage/ui/nav-back.jpg"
      style="height: 150px"
    >
      <div class="absolute-bottom bg-transparent">
        <q-avatar size="56px" class="q-mb-sm">
          <img
            src="http://apiunikk:8080/storage/factory/avatar/misc/avatar-user.jpg"
          />
        </q-avatar>
        <div class="text-weight-bold">Razvan Stoenescu</div>
        <div>@rstoenescu</div>
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
    to: "users",
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
  {
    title: "Financial",
    icon: "monetization_on",
    to: "financialStatement",
  },
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
</script>
