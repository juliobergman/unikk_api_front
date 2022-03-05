<template>
  <q-toolbar dense class="q-px-md">
    <q-space />

    <q-input
      dense
      standout
      hide-bottom-space
      input-class="text-right"
      class="q-mr-md"
      :model-value="modelValue"
      :debounce="1000"
      @update:model-value="updateSearch"
    >
      <template v-slot:append>
        <q-icon v-if="modelValue === ''" name="search" />
        <q-icon
          v-else
          name="clear"
          class="cursor-pointer"
          @click="updateSearch('')"
        />
      </template>
    </q-input>

    <q-btn
      flat
      round
      dense
      class="q-mr-sm"
      :icon="!grid ? 'apps' : 'list'"
      @click="updateGrid"
    />
    <q-btn flat round dense icon="more_vert" />
  </q-toolbar>
</template>

<script setup>
import { ref, computed } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

const mobile = computed(() => $q.platform.is.mobile || false);

const $emit = defineEmits(["update:grid", "update:modelValue"]);
const props = defineProps({
  grid: Boolean,
  modelValue: String,
});

function updateGrid() {
  $emit("update:grid", !props.grid);
}
function updateSearch(e) {
  $emit("update:modelValue", e);
}

// const gr = computed(() => props.grid);
</script>
