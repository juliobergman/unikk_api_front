<template>
  <q-dialog v-model="value" @hide="company.name = ''">
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Create New Company</div>
      </q-card-section>

      <q-card-section>
        <!-- Type -->
        <q-separator />
        <q-btn-toggle
          flat
          spread
          toggle-color="secondary"
          ref="typeRef"
          v-model="company.type"
          :options="[
            { label: 'Active', value: 'active' },
            { label: 'Target', value: 'target' },
          ]"
        />
        <q-separator class="q-mb-md" />
        <!-- Name -->
        <q-input
          label="Company Name"
          v-model="company.name"
          ref="nameRef"
          autofocus
          :rules="[required]"
          lazy-rules
          @focus="nameRef.resetValidation()"
        />
        <!-- Country -->
        <q-select
          label-color="accent"
          v-model="company.country"
          ref="countryRef"
          option-value="iso2"
          option-label="name"
          emit-value
          map-options
          label="Country"
          :options="$store.state.res.countries"
          :rules="[required]"
        />
        <!-- Currency -->
        <q-select
          label-color="accent"
          v-model="company.currency_id"
          ref="currencyRef"
          option-value="id"
          option-label="name"
          emit-value
          map-options
          label="Currency"
          :options="$store.state.res.currencies"
          :rules="[required]"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn flat label="Create" @click="addNewCompany" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed } from "vue";
import { api } from "boot/axios";
import { useQuasar, Dialog } from "quasar";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const $q = useQuasar();
const $store = useStore();
const $router = useRouter();

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([
  "update:modelValue",
  "company:stored",
  "membership:stored",
]);

let company = ref({
  name: "",
  country: "CH",
  currency_id: 2,
  type: "active",
});

const nameRef = ref(null);
const countryRef = ref(null);
const currencyRef = ref(null);
const typeRef = ref(null);

// Computed
let value = computed({
  get: () => props.modelValue,
  set(val) {
    emit("update:modelValue", val);
  },
});

function addNewCompany() {
  nameRef.value.validate();
  countryRef.value.validate();
  currencyRef.value.validate();
  if (
    nameRef.value.hasError ||
    countryRef.value.hasError ||
    currencyRef.value.hasError
  ) {
    // form has error
    return;
  } else {
    // Pass Validation
    $q.loading.show();
    const data = {
      company_id: $store.state.company.id,
      ...company.value,
    };

    api
      .post("api/company/store", data, {
        headers: {
          Authorization: "Bearer " + $store.state.user.token,
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          emit("company:stored", {
            company: response.data.company,
            membership: response.data.membership,
          });

          Dialog.create({
            dark: $q.dark.isActive,
            color: "positive",
            title: "Success",
            message: response.data.message,
            persistent: false,
          }).onDismiss(() => {
            value.value = false;
          });
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

// Rules
function required(val) {
  return !!val || "This field is required";
}
</script>
