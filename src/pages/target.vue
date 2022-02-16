<template>
  <q-page padding>
    <q-table
      flat
      :rows="targets"
      :columns="columns"
      row-key="id"
      @row-click="rowClick"
      v-model:pagination="pagination"
      hide-pagination
    />
    <div class="row justify-center q-mt-md">
      <q-pagination
        v-show="showPagination"
        flat
        :color="$store.state.app.darkmode ? 'white' : 'dark'"
        active-text-color="secondary"
        v-model="pagination.page"
        :max="pagesNumber"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, watchEffect } from "vue";
import { api } from "boot/axios";
import { useQuasar, Dialog } from "quasar";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const $q = useQuasar();
const $store = useStore();
const $router = useRouter();

// Data
let targets = ref([]);

// Computed
let currentMembership = computed({
  get: () => $store.state.user.currentMembership,
});
let userToken = computed({
  get: () => $store.state.user.token,
});
let pagesNumber = computed(() =>
  Math.ceil(targets.value.length / pagination.value.rowsPerPage)
);
let showPagination = computed(() => (pagesNumber.value > 1 ? true : false));

function fetchTargets() {
  // api/company/1/target
  let companyId = currentMembership.value.company_id;
  if (companyId) {
    $q.loading.show();
    api
      .get("api/company/" + companyId + "/target", {
        headers: {
          Authorization: "Bearer " + userToken.value,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          targets.value = response.data;
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
watchEffect(() => fetchTargets(currentMembership.value));

function rowClick(e, row, item) {
  console.log(row.id);
}

// Const Data
const pagination = ref({
  sortBy: "region",
  descending: false,
  page: 1,
  rowsPerPage: 12,
  // rowsNumber: xx if getting data from a server
});

const columns = [
  {
    name: "name",
    required: true,
    label: "Company",
    align: "left",
    field: (targets) => targets.name,
    sortable: true,
  },
  {
    name: "country",
    required: true,
    label: "Country",
    align: "left",
    field: (targets) => targets.country_name,
    sortable: true,
  },
  {
    name: "region",
    required: true,
    label: "Region",
    align: "left",
    field: (targets) => targets.country_region,
    sortable: true,
  },
  {
    name: "sector",
    required: true,
    label: "Sector",
    align: "left",
    field: (targets) => targets.sector,
    sortable: true,
  },
];
</script>
