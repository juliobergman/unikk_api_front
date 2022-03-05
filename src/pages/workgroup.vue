<template>
  <q-page padding>
    <workgroup-toolbar v-model="search" v-model:grid="gridView" />
    <q-table
      :class="gridView ? '' : 'q-mt-md'"
      :grid="gridView"
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
      <template v-slot:item="props">
        <workgroup-profile-card
          :user="props.row"
          @click:message="messageClick(props.row)"
          @click:info="rowClick(null, props.row, null)"
        />
        <!-- @click="rowClick($event, props.row, props.key)" -->
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
        icon-first="keyboard_double_arrow_left"
        icon-last="keyboard_double_arrow_right"
        icon-prev="arrow_left"
        icon-next="arrow_right"
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
let gridView = ref(true);
let search = ref("");

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
        "api/user/workgroup?search=" +
          search.value +
          "&sort=" +
          pagination.value.sortBy +
          "-" +
          sortPagination.value +
          "&page=" +
          pagination.value.page,
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

function messageClick(user) {
  console.log(user);
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
