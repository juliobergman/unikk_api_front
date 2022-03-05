<template>
  <div class="q-pa-md col-xs-12 col-sm-6 col-md-3">
    <q-card flat bordered>
      <q-img :src="$store.state.app.baseurl + user.profile_pic">
        <div class="bg-transparent flex full-width justify-end">
          <q-avatar size="26px" square v-if="user.country">
            <q-img
              class="rounded-borders"
              :ratio="4 / 3"
              :src="
                $store.state.app.baseurl +
                '/storage/factory/flags/4x3/' +
                user.country +
                '.svg'
              "
            >
              <q-tooltip> {{ user.country_name }} </q-tooltip>
            </q-img>
          </q-avatar>
        </div>
      </q-img>
      <q-list>
        <q-item class="q-my-md">
          <q-item-section>
            <q-item-label class="text-subtitle2">{{ user.name }}</q-item-label>
            <q-item-label caption lines="1">
              {{ user.job_title }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <q-separator />
      <q-btn-group spread>
        <q-btn flat @click="$emit('click:message')">
          <q-icon
            :color="darkmode ? 'secondary' : 'grey-9'"
            name="mail"
          ></q-icon>
        </q-btn>
        <q-btn flat @click="$emit('click:info')">
          <q-icon
            :color="darkmode ? 'secondary' : 'grey-9'"
            name="info"
          ></q-icon>
        </q-btn>
      </q-btn-group>
    </q-card>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

const $q = useQuasar();
const $store = useStore();
const darkmode = computed(() => $q.dark.isActive);

const props = defineProps(["user"]);
const $emit = defineEmits(["click:message", "click:info"]);
</script>
