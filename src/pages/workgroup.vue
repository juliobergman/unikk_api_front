<template>
  <q-page padding>
    <q-table
      flat
      :rows="workgroup"
      :columns="columns"
      row-key="membership_id"
      v-model:pagination="pagination"
      hide-pagination
      @row-click="rowClick"
      @request="onRequest"
    >
      <template v-slot:body-cell-avatar="avatar">
        <q-td auto-width :props="avatar">
          <q-avatar size="36px">
            <q-img :src="$store.state.app.baseurl + avatar.value" />
          </q-avatar>
        </q-td>
      </template>
    </q-table>
    <div class="row justify-center q-mt-md">
      <q-pagination
        v-show="showPagination"
        flat
        :color="darkmode ? 'white' : 'dark'"
        active-text-color="secondary"
        v-model="pagination.page"
        :max="pagesNumber"
        direction-links
        boundary-links
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
let workgroup = ref([]);

// Computed
const currentMembership = computed({
  get: () => $store.state.user.currentMembership,
});
const userToken = computed({
  get: () => $store.state.user.token,
});
const darkmode = computed(() => $store.state.app.darkmode);

// Pagination
let pagination = ref({
  sortBy: "name",
  descending: false,
  page: 1,
  rowsPerPage: null,
  rowsNumber: null,
});

let pagesNumber = ref(1);
let sortPagination = computed(() =>
  pagination.value.descending ? "desc" : "asc"
);
let showPagination = computed(() => (pagesNumber.value > 1 ? true : false));

function fetchWorkgroup() {
  if (userToken.value) {
    $q.loading.show();
    api
      .get(
        "api/user/workgroup?page=" +
          pagination.value.page +
          "&sort=" +
          pagination.value.sortBy +
          "-" +
          sortPagination.value,
        {
          headers: {
            Authorization: "Bearer " + userToken.value,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          workgroup.value = response.data.data;
          pagination.value.page = response.data.current_page;
          pagination.value.rowsPerPage = response.data.per_page;
          pagination.value.rowsNumber = response.data.total;
          pagesNumber.value = response.data.last_page;
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
watchEffect(() => fetchWorkgroup(currentMembership.value));

function onRequest(props) {
  pagination.value.sortBy = props.pagination.sortBy;
  pagination.value.descending = props.pagination.descending;
  // fetchWorkgroup();
}

function rowClick(e, row, item) {
  console.log(row);
  return;

  // row.id;
  $router.push({
    name: "company.profile",
    params: { type: "target", id: row.id },
  });
}

const columns = [
  {
    name: "avatar",
    required: true,
    label: "",
    align: "left",
    field: (workgroup) => workgroup.profile_pic,
    sortable: false,
  },
  {
    name: "name",
    required: true,
    label: "Name",
    align: "left",
    field: (workgroup) => workgroup.name,
    sortable: true,
  },
  {
    name: "job_title",
    required: true,
    label: "Position",
    align: "left",
    field: (workgroup) => workgroup.job_title,
    sortable: true,
  },
  {
    name: "country",
    required: true,
    label: "Country",
    align: "left",
    field: (workgroup) => workgroup.country_name,
    sortable: true,
  },
  {
    name: "region",
    required: true,
    label: "Region",
    align: "left",
    field: (workgroup) => workgroup.country_region,
    sortable: true,
  },
];
</script>
