<template>
  <button class="svgButton" :disabled="props.disabled" @click="emit('click')">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  }
);

const emit = defineEmits<{
  (event: "click"): void;
}>();
</script>

<style lang="less">
.svgButton {
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  font-weight: 400;
  gap: 4px;
  cursor: pointer;
}
</style>
