<template>
  <div class="uiTextCard">
    <h1 class="uiTextCard__header">{{ props.header }}</h1>
    <span>{{ props.bodyText }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  header: string;
  bodyText: string;
}>();
</script>

<style lang="less">
.uiTextCard {
  background-color: @uiTextCard--backgroundColor;
  font-size: 20px;
  padding: @indent__xxl;
  line-height: 30px;
  &__header {
    color: @uiTextCard__header--color;
    line-height: 60px;
  }
}
</style>
