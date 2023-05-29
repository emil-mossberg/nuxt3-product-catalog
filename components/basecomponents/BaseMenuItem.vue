<template>
  <NuxtLink class="baseMenuItem" @click="emit('click')">
    <slot></slot><DynamicIconChevron v-if="hasChildren" :direction="'right'"
  /></NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  hasChildren: boolean;
}>();

const emit = defineEmits<{
  (event: "click"): void;
}>();
</script>

<style lang="less">
.baseMenuItem {
  display: flex;
  justify-content: space-between;
  padding: @indent__base;
  color: @color__text_primary;
}

@media only screen and (min-width: @breakpoint__mobile) {
}
</style>
