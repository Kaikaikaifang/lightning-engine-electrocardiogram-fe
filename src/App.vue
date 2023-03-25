<template>
  <t-layout class="h-screen">
    <t-header>
      <t-head-menu theme="light" value="item1" height="120px">
        <div class="flex flex-row align-middle items-center">
          <img
            width="33"
            class="logo"
            src="/Electrocardiogram.svg"
            alt="logo"
          />
          <p class="ml-2 text-2xl italic">心连"新"</p>
        </div>
      </t-head-menu>
    </t-header>
    <t-content>
      <div class="flex flex-row h-full">
        <t-card title="Data" class="basis-1/4 m-3">
          <Cards :SBP="SBP" :DBP="DBP" :HR="HR" />
        </t-card>
        <t-card title="Gram" class="basis-3/4 m-3">
          <Electrocardiogram :PPG="PPG" :ECG="ECG" />
        </t-card>
      </div>
    </t-content>
  </t-layout>
</template>

<script setup>
import Cards from "./components/Cards.vue";
import Electrocardiogram from "./components/Electrocardiogram.vue";
import { ref, reactive } from "vue";

const SBP = ref(120);
const DBP = ref(70);
const HR = ref(66);
const PPG = reactive([
  [0, 44],
  [5, 99],
]);
const ECG = reactive([
  [0, 44],
  [5, 99],
]);
</script>

<style lang="scss" scoped></style>
