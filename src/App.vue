<template>
  <t-layout class="h-screen">
    <t-header>
      <t-head-menu theme="light" expand-type="popup" class="px-3">
        <template #logo>
          <div class="flex flex-row align-middle items-center ml-3">
            <img
              width="33"
              class="logo"
              src="@/assets/Electrocardiogram.png"
              alt="logo"
            />
            <p class="ml-2 text-2xl italic">心连"新"</p>
          </div>
        </template>
        <t-dropdown :options="options" :max-column-width="200" :max-height="200" @click="select" :class="{'notify-active': hasNewData}">
          <t-button variant="text">
            历史记录
            <template #suffix><chevron-down-icon size="16" /></template>
          </t-button>
        </t-dropdown>
        <template #operations>
          <a href="javascript:;" class="mr-3" @click="changeMode">
            <brightness-icon v-if="dark" size="large"></brightness-icon>
            <Brightness1Icon v-else size="large"></Brightness1Icon>
          </a>
        </template>
      </t-head-menu>
    </t-header>
    <t-content>
      <div
        class="flex flex-row h-full"
        :class="{ 'bg-slate-100': !dark, 'bg-gray-800': dark }"
      >
        <t-card class="basis-1/4 m-2">
          <Cards :SBP="selected.SBP" :DBP="selected.DBP" :HR="selected.HR" :date="date" />
        </t-card>
        <t-card class="basis-3/4 m-2">
          <Electrocardiogram :PPG="selected.PPG" :ECG="selected.ECG" />
        </t-card>
      </div>
    </t-content>
  </t-layout>
</template>

<script setup>
import Cards from "@/components/Cards.vue";
import Electrocardiogram from "@/components/Electrocardiogram.vue";
import { ref, computed, onUnmounted } from "vue";
import axios from "axios";
import { BrightnessIcon, Brightness1Icon, ChevronDownIcon } from "tdesign-icons-vue-next";
import { socket } from "@/socket"


const dark = ref(false);
const hasNewData = ref(false)

const changeMode = () => {
  dark.value = !dark.value;
  if (dark.value) document.documentElement.setAttribute("theme-mode", "dark");
  else document.documentElement.removeAttribute("theme-mode");
};

let config = ref()

let selected = ref([{
    SBP: 0,
    DBP: 0,
    HR: 0,
    PPG: [],
    ECG: [],
    datetime: ""
}])
function select(v) {
  console.log('selected: ', v);
  selected.value = v.value
  hasNewData.value = false
}

const date = computed(() => selected.value.datetime ? translateTime(selected.value.datetime) : "")

const options = computed(() => config.value?.map(e => ({
  content: translateTime(e.datetime),
  value: e
})))

let Axios = import.meta.env.PROD
  ? axios.create({
      baseURL: "http://123.249.45.13:8000/api",
      timeout: 60000,
    })
  : axios;

Axios.get("/api/data").then((response) => {
  config.value = response.data.data;
  selected.value = config.value[0]
  socket.connect()
});

socket.on('new_data', (data) => {
  console.log('new_data', data);
  config.value = data
  hasNewData.value = true
})
console.log(import.meta.env.PROD);

onUnmounted(() => {
  socket.disconnect()
})

const translateTime = (dd) => {
  let d =
    dd.slice(0, 4) +
    "-" +
    dd.slice(4, 6) +
    "-" +
    dd.slice(6, 11) +
    ":" +
    dd.slice(11, 13) +
    ":" +
    dd.slice(13, 15);
  d = new Date(d);
  let timestamp = d.getTime() / 1000;

  timestamp = timestamp + 8 * 60 * 60;

  // 时间戳转为时间
  let date_ = new Date(parseInt(timestamp) * 1000);
  let YY = date_.getFullYear() + "-";
  let MM =
    (date_.getMonth() + 1 < 10
      ? "0" + (date_.getMonth() + 1)
      : date_.getMonth() + 1) + "-";
  let DD = date_.getDate() < 10 ? "0" + date_.getDate() : date_.getDate();
  let hh =
    (date_.getHours() < 10 ? "0" + date_.getHours() : date_.getHours()) + ":";
  let mm =
    (date_.getMinutes() < 10 ? "0" + date_.getMinutes() : date_.getMinutes()) +
    ":";
  let ss =
    date_.getSeconds() < 10 ? "0" + date_.getSeconds() : date_.getSeconds();
  return YY + MM + DD + " " + hh + mm + ss;
};
</script>

<style lang="scss" scoped>
.notify-active {
  &::before {
    content: '';
    position: absolute;
    // z-index: 999;
    top: 4px;
    right: 6px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: red;
  }
}
</style>
