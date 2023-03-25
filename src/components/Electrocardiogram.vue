<template>
  <t-space direction="vertical" class="w-full">
    <t-card title="脉搏波形图" hover-shadow header-bordered>
      <div ref="ppgDom" class="relative h-60"></div>
    </t-card>
    <t-card title="心电图" hover-shadow header-bordered>
      <div ref="ecgDom" class="relative h-60"></div>
    </t-card>
  </t-space>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount, computed } from "vue";
import * as echarts from "echarts/core";
import { GridComponent } from "echarts/components";
import { LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);

const props = defineProps(["PPG", "ECG"]);

const ppgDom = ref(null);
const ecgDom = ref(null);
let ppgChart = null;
let ecgChart = null;

let unwatch;

let ppgOption = computed(() => ({
  xAxis: {},
  yAxis: {},
  series: [
    {
      type: "line",
      data: props.PPG,
      smooth: true,
    },
  ],
}));

let ecgOption = computed(() => ({
  xAxis: {},
  yAxis: {},
  series: [
    {
      type: "line",
      data: props.ECG,
      smooth: true,
    },
  ],
}));
onMounted(() => {
  ppgChart = echarts.init(ppgDom.value);
  ecgChart = echarts.init(ecgDom.value);
  ppgChart.setOption(ppgOption.value);
  ecgChart.setOption(ecgOption.value);

  unwatch = watch(
    props,
    () => {
      ppgChart.clear();
      ppgChart.setOption(ppgOption.value);
      ecgChart.clear();
      ecgChart.setOption(ecgOption.value);
    },
    { deep: true, immediate: true }
  );
});
onBeforeUnmount(() => {
  unwatch();
});
</script>

<style lang="scss" scoped></style>
