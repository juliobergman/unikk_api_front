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

    <q-drawer v-model="rightDrawerOpen" side="right" overlay bordered>
      <q-btn icon="close" @click="toggleRightDrawer"></q-btn>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";

import { useStore } from "vuex";

const $store = useStore();

const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);

function toggleLeftDrawer() {
  $store.commit("app/toggleLeftDrawer");
}

function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value;
}
</script>
<style scoped></style>
