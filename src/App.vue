<template>
  <t-layout class="h-screen">
    <t-header>
      <t-head-menu theme="light" expand-type="popup">
        <template #logo>
          <div class="flex flex-row align-middle items-center ml-3">
            <img
              width="33"
              class="logo"
              src="/Electrocardiogram.svg"
              alt="logo"
            />
            <p class="ml-2 text-2xl italic">心连"新"</p>
          </div>
        </template>
        <t-submenu value="history" title="历史记录">
          <t-menu-item
            :value="k"
            @click="() => update(k)"
            v-for="(v, k) in config"
            >{{ translateTime(k) }}</t-menu-item
          >
        </t-submenu>
        <template #operations>
          <a href="javascript:;" class="mr-3" @click="changeMode">
            <tips-icon size="large"></tips-icon>
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
          <Cards :SBP="SBP" :DBP="DBP" :HR="HR" :date="showTime" />
        </t-card>
        <t-card class="basis-3/4 m-2">
          <Electrocardiogram :PPG="PPG" :ECG="ECG" />
        </t-card>
      </div>
    </t-content>
  </t-layout>
</template>

<script setup>
import Cards from "./components/Cards.vue";
import Electrocardiogram from "./components/Electrocardiogram.vue";
import { ref, reactive, computed } from "vue";
import axios from "axios";
import { TipsIcon } from "tdesign-icons-vue-next";

const dark = ref(false);

const changeMode = () => {
  dark.value = !dark.value;
  if (dark.value) document.documentElement.setAttribute("theme-mode", "dark");
  else document.documentElement.removeAttribute("theme-mode");
};
let config = reactive({
  "20230325T084945Z": {
    SBP: 150,
    DBP: 70,
    HR: 66,
    PPG: [
      [0, 44],
      [5, 99],
      [10, 199],
    ],
    ECG: [
      [0, 44],
      [5, 99],
      [10, 49],
    ],
  },
});
const SBP = computed(() => config[date.value].SBP);
const DBP = computed(() => config[date.value].DBP);
const HR = computed(() => config[date.value].HR);
const date = ref("20230325T084945Z");
const PPG = computed(() => config[date.value].PPG);
const ECG = computed(() => config[date.value].ECG);

let showTime = computed(() => {
  return translateTime(date.value);
});

const update = (d) => {
  date.value = d;
};

let Axios = import.meta.env.PROD
  ? axios.create({
      baseURL: "http://192.168.0.173:8000",
      timeout: 1000,
    })
  : axios;

Axios.get("/login/data").then((response) => {
  config = response.data;
  update(Object.keys(config)[0]);
});
console.log(import.meta.env.PROD);

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

<style lang="scss" scoped></style>
