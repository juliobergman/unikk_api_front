<template>
  <q-img
    class="rounded-borders"
    width="100%"
    :ratio="1"
    :src="image"
    spinner-color="white"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <fade-bottom-transition>
      <div v-show="hover || filePicked || $mobile" class="absolute-bottom">
        <div v-if="!filePicked">
          <q-btn
            outline
            class="full-width"
            icon="change_circle"
            color="white"
            label="Change Avatar"
            @click="pickFile"
          />
        </div>
        <div v-if="filePicked">
          <q-btn-group outline class="full-width" spread>
            <q-btn
              outline
              icon="upload"
              color="white"
              label="Upload"
              @click="uploadFile"
            />
            <q-btn
              outline
              icon="clear"
              color="white"
              label="Clear"
              @click="clearFile"
            />
          </q-btn-group>
        </div>
      </div>
    </fade-bottom-transition>
  </q-img>

  <div v-show="false">
    <q-uploader
      ref="uploader"
      dark
      flat
      class="full-width full-height"
      label="Upload Avatar"
      :url="$store.state.app.baseurl + url"
      :headers="[{ name: 'Authorization', value: 'Bearer ' + userToken }]"
      with-credentials
      field-name="image"
      accept=".jpg, image/*"
      @added="fileAdded"
      @uploading="$q.loading.show()"
      @uploaded="fileUploaded"
      @failed="failedUpload"
    />
    <!-- @added="fileAdded" -->
    <!-- @rejected="onRejected" -->
  </div>
</template>

<script setup>
import {
  ref,
  computed,
  watchEffect,
  watch,
  defineProps,
  defineEmits,
} from "vue";
import { api } from "boot/axios";
import { useQuasar, Dialog, Platform } from "quasar";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const $q = useQuasar();
const $store = useStore();
const $router = useRouter();
let hover = ref(false);

const props = defineProps({
  src: {
    type: String,
    default: "/storage/factory/avatar/misc/avatar-company.jpg",
  },
  url: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["uploaded"]);

// Computed
let $mobile = computed({
  get: () => (Platform.is.mobile ? true : false),
});

let userToken = computed({
  get: () => $store.state.user.token,
  set: (val) => {
    $store.commit("user/setToken", val);
  },
});
const image = computed({
  get: () =>
    filePicked.value
      ? filePickedData.value
      : $store.state.app.baseurl + props.src,
});

// Data
let filePicked = ref(false);
let filePickedData = ref("");
let uploader = ref("");

// FilePicker
function pickFile() {
  uploader.value.pickFiles();
}
function fileAdded(files) {
  filePicked.value = true;
  filePickedData.value = files[0].__img.src;
}
function clearFile() {
  filePicked.value = false;
  filePickedData.value = "";
  uploader.value.reset();
}
function uploadFile() {
  uploader.value.upload();
}
function fileUploaded(info) {
  const imgsrc = info.files[0].__img.src;
  filePickedData.value = imgsrc;
  filePicked.value = false;
  emit("uploaded", imgsrc);
  uploader.value.removeUploadedFiles();
  uploader.value.reset();
  $q.loading.hide();
}
function failedUpload(files) {
  console.error("From failedUpload", files);
}
</script>
