<template>
  <q-layout view="hHr lpR lFr">
    <q-header bordered class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="flex">
          <div class="row">
            <div class="col flex items-center q-mr-md">
              <ui-nav-logo />
            </div>
            <div class="col font-weight-regular">Front</div>
          </div>
        </q-toolbar-title>

        <q-btn dense flat round icon="settings" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <ui-left-drawer :open="leftDrawerOpen" />
    <ui-right-drawer :open="rightDrawerOpen" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useQuasar, Cookies } from "quasar";

const $q = useQuasar();
const $store = useStore();
$store.dispatch("res/actionCountries");
$store.dispatch("res/actionCurrencies");
if (!$store.state.user.authorized) {
  $store.dispatch("user/actionUser");
}

if (Cookies.get("dark")) {
  $store.commit("app/setDarkMode", Cookies.get("dark"));
}

const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);

function toggleLeftDrawer() {
  $store.commit("app/toggleLeftDrawer");
}

function toggleRightDrawer() {
  $store.commit("app/toggleRightDrawer");
}
</script>
<style scoped></style>
