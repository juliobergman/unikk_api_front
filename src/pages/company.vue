<template>
  <q-page class="q-pa-xl">
    <div class="row">
      <div class="col-12 col-md-4">
        <q-img
          width="100%"
          :ratio="1"
          src="http://apiunikk:8080/storage/ui/abstract-001.png"
          spinner-color="white"
        >
        </q-img>
      </div>
      <div class="col-12 col-md-8 q-px-xl">
        <q-btn @click="company"> get </q-btn>
        <div class="text-h5">{{ name }}</div>
        <div>{{ name }}</div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { api } from "boot/axios";
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const $store = useStore();
const $router = useRouter();

let userToken = computed({
  get: () => $store.state.user.token,
  set: (val) => {
    $store.commit("user/setToken", val);
  },
});

let currentMembership = computed({
  get: () => $store.state.user.currentMembership,
  set: (val) => {
    $store.commit("user/setCurrentMembership", val);
  },
});

let id = ref("");
let currency_id = ref("");
let name = ref("");
let type = ref("");
let address = ref("");
let city = ref("");
let sector = ref("");
let country = ref("");
let phone = ref("");
let email = ref("");
let website = ref("");
let info = ref("");
let logo = ref("");
let currency_name = ref("");
let currency_symbol = ref("");
let currency_code = ref("");
let country_name = ref("");

function company() {
  api
    .get("/api/company/show/" + currentMembership.value.company_id, {
      headers: {
        Authorization: "Bearer " + userToken.value,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        console.log("setting/show");

        id.value = response.data.id;
        currency_id.value = response.data.currency_id;
        name.value = response.data.name;
        type.value = response.data.type;
        address.value = response.data.address;
        city.value = response.data.city;
        sector.value = response.data.sector;
        country.value = response.data.country;
        phone.value = response.data.phone;
        email.value = response.data.email;
        website.value = response.data.website;
        info.value = response.data.info;
        logo.value = response.data.logo;
        currency_name.value = response.data.currency_name;
        currency_symbol.value = response.data.currency_symbol;
        currency_code.value = response.data.currency_code;
        country_name.value = response.data.country_name;
      }
    })
    .catch((error) => {
      console.log(error.response);
    });
}
</script>
