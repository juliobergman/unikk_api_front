<template>
  <q-page class="q-pa-xl">
    <div class="row">
      <div class="col-12 col-sm-4">
        <!-- User Profile Image -->
        <profile-image
          url="/api/upload/avatar/user"
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
                <div class="text-h5">{{ userProfile.name }}</div>
              </div>
              <q-avatar size="34px" square v-if="userProfile.country">
                <q-img
                  class="rounded-borders"
                  :ratio="4 / 3"
                  :src="
                    $store.state.app.baseurl +
                    '/storage/factory/flags/4x3/' +
                    userProfile.country +
                    '.svg'
                  "
                />
              </q-avatar>
            </div>
            <div class="row" v-show="edit">
              <div class="col-12">
                <q-input
                  label-color="accent"
                  v-model="userProfile.name"
                  label="Name"
                  class="text-h5"
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
              v-model="userProfile.phone"
              label="Phone"
              :readonly="!edit"
            />
            <q-input
              :label-color="edit ? 'accent' : ''"
              :borderless="!edit"
              v-model="userProfile.email"
              label="Email"
              :readonly="!edit"
            />
            <q-input
              :label-color="edit ? 'accent' : ''"
              :borderless="!edit"
              v-model="userProfile.site"
              label="Website"
              :readonly="!edit"
            />
          </div>
          <div class="col-12 col-sm-6">
            <q-input
              :borderless="!edit"
              v-model="userProfile.country_region"
              label="Region"
              readonly
            />
            <q-input
              :borderless="!edit"
              v-model="userProfile.country_subregion"
              label="Subregion"
              readonly
            />
            <q-input
              borderless
              v-model="userProfile.country_name"
              label="Country"
              v-show="!edit"
              readonly
            />
            <q-select
              label-color="accent"
              v-show="edit"
              v-model="userProfile.country"
              option-value="iso2"
              option-label="name"
              emit-value
              map-options
              label="Country"
              :options="$store.state.res.countries"
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
              v-model="userProfile.city"
              label="City"
              :readonly="!edit"
            />
            <q-input
              :label-color="edit ? 'accent' : ''"
              borderless
              autogrow
              v-model="userProfile.address"
              label="Address"
              :readonly="!edit"
            />
          </div>
        </div>
      </div>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab
        icon="keyboard_arrow_left"
        direction="left"
        flat
        v-model="edit"
        @update:model-value="toggleEdit"
      >
        <q-fab-action flat icon="save" @click.stop="updateUser" />
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { ref, computed, watchEffect } from "vue";
import { api } from "boot/axios";
import { useQuasar, Dialog } from "quasar";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

// Platform
import { Platform } from "quasar";
let $mobile = computed({
  get: () => (Platform.is.mobile ? true : false),
});

const $q = useQuasar();
const $store = useStore();
const $router = useRouter();

// Computed
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

// Edit
let userProfile = ref({});
let edit = ref(false);
let saveAvatar = ref(false);

let avatar = computed({
  get: () =>
    userProfile.value.profile_pic ? userProfile.value.profile_pic : false,
});

function fileUploaded(payload) {
  saveAvatar.value = false;
  $store.dispatch("user/actionUser");
  // userData();
}

function userData() {
  $q.loading.show();
  if (currentMembership.value.user_id) {
    api
      .get("api/user/show/" + currentMembership.value.user_id, {
        headers: {
          Authorization: "Bearer " + userToken.value,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          userProfile.value = response.data;
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
watchEffect(() => userData(currentMembership.value));

function updateUser() {
  $q.loading.show();
  const data = userProfile.value;
  api
    .put("api/user/update/" + currentMembership.value.user_id, data, {
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
        $store.commit("user/setUser", response.data.user);
        userData();
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

function toggleEdit(payload) {
  if (!payload) {
    userData();
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
