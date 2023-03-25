<template>
  <t-space direction="vertical" class="w-full">
    <t-card title="高压" hoverShadow
      ><p class="text-center text-4xl mb-6" :class="[S_status]">
        {{ props.SBP }}
      </p></t-card
    >
    <t-card title="低压" hoverShadow
      ><p class="text-center text-4xl mb-6" :class="[D_status]">
        {{ props.DBP }}
      </p></t-card
    >
    <t-card title="心率" hoverShadow
      ><p class="text-center text-4xl mb-6" :class="[H_status]">
        {{ props.HR }}
      </p></t-card
    >
    <t-card title="检测时间" hoverShadow
      ><p class="text-center text-4xl mb-6">
        {{ props.date }}
      </p></t-card
    >
  </t-space>
</template>

<script setup>
import { computed, watch } from "vue";
import { NotifyPlugin } from "tdesign-vue-next";

const props = defineProps(["SBP", "DBP", "HR", "date"]);
const S_status = computed(() => {
  if (props.SBP > 120 && props.SBP <= 140) return "text-yellow-400";
  else if (props.SBP > 140) return "text-red-500";
  else return "text-green-400";
});
const D_status = computed(() => {
  if (props.DBP > 90 && props.DBP <= 90) return "text-yellow-400";
  else if (props.DBP > 90) return "text-red-500";
  else return "text-green-400";
});
const H_status = computed(() => {
  if (props.HR > 60 && props.HR <= 80) return "text-green-400";
  else if (props.HR > 80 && props.HR <= 100) return "text-yellow-400";
  else return "text-red-500";
});
watch(
  props,
  () => {
    if (props.SBP > 140 || props.DBP > 90)
      NotifyPlugin.error({
        title: "😫",
        content: "您为高血压！要注意改善生活方式，控制体重，戒烟限酒。",
      });
    else if (props.SBP > 120 || props.DBP > 80)
      NotifyPlugin.warning({
        title: "😣",
        content: "您的血压偏高，要注意改善生活方式，控制体重。",
      });
    else
      NotifyPlugin.success({
        title: "😆",
        content: "您的血压正常。",
      });
  },
  { deep: true, immediate: false }
);
</script>

<style lang="scss" scoped></style>
