<template>
  <q-page class="flex flex-center">
    <!-- Login Card -->
    <q-card flat class="logincard">
      <!-- <img src="https://cdn.quasar.dev/img/mountains.jpg" /> -->

      <q-card-section class="q-pa-xl flex flex-center">
        <ui-main-logo class="logo" fill="#646464" />
      </q-card-section>

      <q-card-section>
        <q-input
          @keyup="hideError"
          dense
          outlined
          v-model="email"
          label="Email"
        />

        <q-input
          @keyup="hideError"
          dense
          class="q-mt-sm"
          v-model="password"
          outlined
          :type="isPwd ? 'password' : 'text'"
          label="Password"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </q-card-section>
      <q-card-section class="q-pt-none text-right">
        <q-checkbox left-label v-model="remember" label="Remember Me" />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-btn
          unelevated
          class="full-width"
          icon-right="login"
          color="primary"
          label="Login"
          :loading="loading"
          :disable="loading"
          @click="login()"
        />
      </q-card-section>
      <q-card-section class="q-pt-none" v-if="errorMessage">
        <q-banner rounded dense class="text-white bg-red">
          <template v-slot:avatar>
            <q-icon name="highlight_off" color="white" />
          </template>
          {{ errorMessage }}
        </q-banner>
      </q-card-section>
    </q-card>
    <q-ajax-bar
      ref="AjaxBar"
      position="top"
      color="accent"
      size="5px"
      skip-hijack
    />
  </q-page>
</template>

<script setup>
import { ref, computed } from "vue";
import { api } from "boot/axios";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Platform, Cookies, useQuasar } from "quasar";

if (Cookies.has("user_token")) Cookies.remove("user_token");
if (Cookies.has("user_authorization")) Cookies.remove("user_authorization");

const $q = useQuasar();
const AjaxBar = ref(null);
const $store = useStore();
const $router = useRouter();
const device =
  Platform.is.name + "-" + Platform.is.platform + "-" + Platform.is.version;

let loading = computed({
  get: () => $store.state.loading,
  set: (val) => {
    $store.commit("loading", val);
  },
});

let userAuth = computed({
  get: () => $store.state.user.authorized,
  set: (val) => {
    $store.commit("user/setAuth", val);
  },
});

let userToken = computed({
  get: () => $store.state.user.token,
  set: (val) => {
    $store.commit("user/setToken", val);
  },
});

let user = computed({
  get: () => $store.state.user.user,
  set: (val) => {
    $store.commit("user/setUser", val);
  },
});

let company = computed({
  get: () => $store.state.company,
  set: (val) => {
    $store.commit("company/setCompany", val);
  },
});

let currentMembership = computed({
  get: () => $store.state.user.currentMembership,
  set: (val) => {
    $store.commit("user/setCurrentMembership", val);
  },
});
let userMemberships = computed({
  get: () => $store.state.user.userMemberships,
  set: (val) => {
    $store.commit("user/setUserMemberships", val);
  },
});

let isPwd = ref(true);
let email = ref("");
let password = ref("");
let remember = ref(false);
let errorMessage = ref("");

function hideError() {
  errorMessage.value = "";
  // console.log($router);
}

function login() {
  const bar = AjaxBar.value;
  loading.value = true;
  bar.start();

  api
    .post("/api/login", {
      remember: remember.value,
      email: email.value,
      password: password.value,
      device: device,
    })
    .then((response) => {
      if (response.status === 200) {
        bar.stop();
        loading.value = false;
        userAuth.value = true;
        userToken.value = response.data.token;
        user.value = response.data.user;
        company.value = response.data.company;
        currentMembership.value = response.data.currentMembership;
        userMemberships.value = response.data.userMemberships;
        Cookies.set("user_token", response.data.token);
        Cookies.set("user_authorization", response.data.auth);
        $router.push({ name: "dashboard" });
      }
    })
    .catch((error) => {
      bar.stop();
      loading.value = false;
      userAuth.value = false;
      if (Cookies.has("user_token")) Cookies.remove("user_token");
      if (Cookies.has("user_authorization"))
        Cookies.remove("user_authorization");
      if (error.response.status === 419) {
        errorMessage.value = "Login Failed, Access Denied";
      }
    });
}
</script>

<style scoped>
.logincard {
  width: 100%;
  max-width: 375px;
  background: transparent;
}
.logo {
  max-width: 175px;
}
</style>
