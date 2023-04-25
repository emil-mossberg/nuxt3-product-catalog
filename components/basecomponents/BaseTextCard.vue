<template>
  <div class="baseTextCard">
    <h1 class="baseTextCard__header">{{ props.header }}</h1>
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
@baseTextCard__header--color: @color__active_primary;
@baseTextCard--backgroundColor: @background_quaternary;

.baseTextCard {
  background-color: @baseTextCard--backgroundColor;
  font-size: 20px;
  padding: @indent__xxl;
  line-height: 30px;
  &__header {
    color: @baseTextCard__header--color;
    line-height: 60px;
  }
}
</style>
