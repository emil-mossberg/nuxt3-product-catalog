<template>
  <div class="BaseTextCard">
    <h1 class="BaseTextCard__header">{{ props.header }}</h1>
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
.BaseTextCard {
  background-color: @BaseTextCard--backgroundColor;
  font-size: 20px;
  padding: @indent__xxl;
  line-height: 30px;
  &__header {
    color: @BaseTextCard__header--color;
    line-height: 60px;
  }
}
</style>
