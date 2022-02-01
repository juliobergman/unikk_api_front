<template>
  <q-expansion-item v-model="open" icon="corporate_fare" label="Companies">
    <q-list bordered="">
      <q-item
        v-for="membership in userMemberships"
        :key="membership.id"
        clickable
        v-ripple
        active-class="text-secondary"
        :active="
          membership.company_id == currentMembership.company_id ? true : false
        "
        @click="switchCompany(membership.id)"
      >
        <q-item-section avatar>
          <q-icon name="domain" />
        </q-item-section>

        <q-item-section> {{ membership.company_name }} </q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        active-class="text-secondary"
        @click="NewCompanyDialog = true"
      >
        <q-item-section avatar>
          <q-icon name="domain_add" />
        </q-item-section>

        <q-item-section> Create Company </q-item-section>
      </q-item>
    </q-list>
    <dialog-new-company
      v-model="NewCompanyDialog"
      @update:model-value="NewCompanyDialog = $event"
      @membership:stored="switchCompany"
    />
  </q-expansion-item>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { api } from "boot/axios";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Cookies, useQuasar } from "quasar";

const emit = defineEmits(["uploaded"]);

const $q = useQuasar();
const $store = useStore();
const $router = useRouter();

let open = ref(false);
let NewCompanyDialog = ref(false);

let userToken = computed({
  get: () => $store.state.user.token,
  set: (val) => {
    $store.commit("user/setToken", val);
  },
});

let currentMembership = computed({
  get: () => $store.state.user.currentMembership,
});

const userMemberships = computed({
  get: () => $store.state.user.userMemberships,
});

function switchCompany(id) {
  $q.loading.show();
  api
    .put(
      "api/membership/set",
      { id: id },
      {
        headers: {
          Authorization: "Bearer " + userToken.value,
        },
      }
    )
    .then((response) => {
      if (response.status === 200) {
        $store.dispatch("user/actionUser");
      }
    })
    .then(() => {
      $q.loading.hide();
    })
    .then(() => {
      emit("updated");
      open.value = false;
      $router.push({ name: "company" });
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
</script>
