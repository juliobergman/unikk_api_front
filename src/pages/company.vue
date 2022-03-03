<template>
  <q-page class="q-pa-xl">
    <div class="row">
      <div class="col-12 col-sm-4">
        <!-- Company Profile Image -->
        <profile-image
          :url="'/api/upload/avatar/company/' + company.id"
          :src="avatar"
          @uploaded="fileUploaded"
        />
        <!--  -->
      </div>
      <div
        :class="$mobile ? 'col-12 col-sm-8 q-pt-xl' : 'col-12 col-sm-8 q-pl-xl'"
      >
        <div class="row q-mb-md">
          <div class="col-12">
            <div class="row justify-between" v-show="!edit">
              <div class="col-auto">
                <div class="text-h5">{{ company.name }}</div>
                <div v-if="company.sector">{{ company.sector }}</div>
              </div>
              <q-avatar size="34px" square v-if="company.country">
                <q-img
                  class="rounded-borders"
                  :ratio="4 / 3"
                  :src="
                    $store.state.app.baseurl +
                    '/storage/factory/flags/4x3/' +
                    company.country +
                    '.svg'
                  "
                />
              </q-avatar>
            </div>
            <div class="row" v-show="edit">
              <div class="col-12">
                <q-input
                  label-color="accent"
                  v-model="company.name"
                  label="Company Name"
                  class="text-h5"
                />
                <q-input
                  label-color="accent"
                  v-model="company.sector"
                  label="Sector"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-sm-6">
            <q-input
              :label-color="edit ? 'accent' : ''"
              :borderless="!edit"
              v-model="company.phone"
              label="Phone"
              :readonly="!edit"
            />
            <q-input
              :label-color="edit ? 'accent' : ''"
              :borderless="!edit"
              v-model="company.email"
              label="Email"
              :readonly="!edit"
            />

            <q-input
              borderless
              v-show="!edit"
              v-model="company.currency_name"
              :prefix="company.currency_symbol"
              label="Currency"
              readonly
            />

            <q-select
              label-color="accent"
              v-show="edit"
              v-model="company.currency_id"
              option-value="id"
              option-label="name"
              emit-value
              map-options
              label="Currency"
              :options="$store.state.res.currencies"
              :rules="[required]"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

            <q-input
              :label-color="edit ? 'accent' : ''"
              :borderless="!edit"
              v-model="company.shares"
              label="Number of Shares"
              :readonly="!edit"
            />
            <q-input
              :label-color="edit ? 'accent' : ''"
              borderless
              v-model="company.taxrate"
              label="Effective Tax Rate"
              :readonly="!edit"
            />
          </div>
          <div class="col-12 col-sm-6">
            <q-input
              :borderless="!edit"
              v-model="company.country_region"
              label="Region"
              readonly
            />
            <q-input
              :borderless="!edit"
              v-model="company.country_subregion"
              label="Subregion"
              readonly
            />
            <q-input
              borderless
              v-model="company.country_name"
              label="Country"
              v-show="!edit"
              readonly
            />
            <q-select
              label-color="accent"
              v-show="edit"
              v-model="company.country"
              option-value="iso2"
              option-label="name"
              emit-value
              map-options
              label="Country"
              :options="$store.state.res.countries"
              :rules="[required]"
            >
              <!-- @filter="filterCountry" -->
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            <q-input
              :label-color="edit ? 'accent' : ''"
              :borderless="!edit"
              v-model="company.city"
              label="City"
              :readonly="!edit"
            />
            <q-input
              :label-color="edit ? 'accent' : ''"
              borderless
              autogrow
              v-model="company.address"
              label="Address"
              :readonly="!edit"
            />
          </div>
        </div>
      </div>
      <div :class="$mobile ? 'col-12' : 'col-12 q-mt-xl'">
        <q-input
          :label-color="edit ? 'accent' : ''"
          :borderless="!edit"
          autogrow
          v-model="company.info"
          label="Company Information"
          :readonly="!edit"
        />
      </div>
      <div class="col-12" v-if="showTargetData">
        <q-separator class="q-my-md" />
        <q-input
          :label-color="edit ? 'accent' : ''"
          :borderless="!edit"
          autogrow
          v-model="company.target_company_ov"
          label="Company Overview"
          :readonly="!edit"
        />
        <q-input
          :label-color="edit ? 'accent' : ''"
          :borderless="!edit"
          autogrow
          v-model="company.target_financial_ov"
          label="Financial Ov"
          :readonly="!edit"
        />
        <q-input
          :label-color="edit ? 'accent' : ''"
          :borderless="!edit"
          autogrow
          v-model="company.target_milestones"
          label="Milestones"
          :readonly="!edit"
        />
        <q-input
          :label-color="edit ? 'accent' : ''"
          :borderless="!edit"
          autogrow
          v-model="company.target_competitors"
          label="Competitors"
          :readonly="!edit"
        />
        <q-input
          :label-color="edit ? 'accent' : ''"
          :borderless="!edit"
          autogrow
          v-model="company.target_goals"
          label="Goals"
          :readonly="!edit"
        />
        <q-input
          :label-color="edit ? 'accent' : ''"
          :borderless="!edit"
          autogrow
          v-model="company.target_channels"
          label="Channels"
          :readonly="!edit"
        />
        <q-input
          :label-color="edit ? 'accent' : ''"
          :borderless="!edit"
          autogrow
          v-model="company.target_challenges"
          label="Challenges"
          :readonly="!edit"
        />
      </div>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab
        persistent
        icon="edit"
        direction="left"
        flat
        @update:model-value="toggleEdit"
      >
        <q-fab-action
          flat
          icon="save"
          @click="updateCompany"
          :disable="formValid"
        />
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { ref, computed, watchEffect } from "vue";
import { api } from "boot/axios";
import { useQuasar, Dialog } from "quasar";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

// Platform
import { Platform } from "quasar";
let $mobile = computed({
  get: () => (Platform.is.mobile ? true : false),
});

const $q = useQuasar();
const $store = useStore();
const $router = useRouter();
const $route = useRoute();
let loading = computed({
  get: () => $store.state.loading,
  set: (val) => {
    $store.commit("loading", val);
  },
});
loading.value = false;

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

let showTargetData = computed(() =>
  $route.params.type === "target" ? true : false
);

// Edit
let company = ref({});
let edit = ref(false);
let formValid = ref(false);
let fetchId = ref(null);

let avatar = computed({
  get: () => (company.value.logo ? company.value.logo : ""),
});

function fileUploaded(payload) {
  companyData();
}

function companyData() {
  if (currentMembership.value.company_id && !$route.params.id) {
    fetchId.value = currentMembership.value.company_id;
  }
  if (currentMembership.value.company_id && $route.params.id) {
    fetchId.value = $route.params.id;
  }

  if (fetchId.value) {
    let uri = "api/company/show/" + fetchId.value;
    if ($route.params.type === "target") {
      console.log("Target Data");
      uri += "/target";
    }
    $q.loading.show();
    api
      .get(uri, {
        headers: {
          Authorization: "Bearer " + userToken.value,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          company.value = response.data;
          if (response.data.type === "active") {
            $store.commit("company/setCompany", response.data);
          }
        }
      })
      .then(() => {
        $q.loading.hide();
      })
      .catch((error) => {
        $q.loading.hide();
        Dialog.create({
          dark: $q.dark.isActive,
          color: "negative",
          title: "Error",
          message: error.response.data.message,
          persistent: true,
        });
      });
  }
}
watchEffect(() => companyData(currentMembership.value));

function updateCompany() {
  $q.loading.show();
  const data = company.value;
  if (fetchId.value) {
    api
      .post("api/company/update/" + fetchId.value, data, {
        headers: {
          Authorization: "Bearer " + userToken.value,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          Dialog.create({
            dark: $q.dark.isActive,
            color: "positive",
            title: "Success",
            message: response.data.message,
            persistent: true,
          });
          if (response.data.company.type === "active") {
            $store.commit("company/setCompany", response.data.company);
          }
          companyData();
        }
      })
      .then(() => {
        $q.loading.hide();
      })
      .catch((error) => {
        $q.loading.hide();
        Dialog.create({
          dark: $q.dark.isActive,
          color: "negative",
          title: "Error",
          message: error.response.data.message,
          persistent: true,
        });
      });
  }
  $q.loading.hide();
}

function toggleEdit(payload) {
  if (!payload) {
    companyData();
  }
  edit.value = payload;
}
// Validation Rules
function formError() {
  console.log("formError");
}
function formSuccess() {
  console.log("formSuccess");
}
function required(val) {
  if (val === null) {
    return "You must make a selection!";
  }
}
</script>
