<template>
  <q-layout>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useStore } from "vuex";
import { Cookies } from "quasar";

const $store = useStore();

if (Cookies.get("dark")) {
  $store.commit("app/setDarkMode", Cookies.get("dark"));
}
</script>
