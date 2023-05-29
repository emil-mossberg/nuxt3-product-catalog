<template>
  <ul class="baseMenuList">
    <div class="baseMenuList__listHeader">
      <h3><slot name="header"></slot></h3>
      <NuxtLink
        :to="`/category/${categorySlug}`"
        class="baseMenuList__showAll"
        @click="emit('close')"
        >Visa allt</NuxtLink
      >
      <BaseSVGButton @click="emit('close')"><IconCross /></BaseSVGButton>
    </div>
    <slot name="list"></slot>
  </ul>
</template>

<script setup lang="ts">
defineProps<{
  categorySlug: string;
}>();

const emit = defineEmits<{
  (event: "close"): void;
}>();
</script>

<style lang="less">
.baseMenuList {
  width: 100%;
  top: 0;
  height: 100vh;
  position: absolute;
  background-color: @background_quaternary;
  transition: left ease-in 0.4s;

  &__listHeader {
    display: flex;
    align-items: center;
    padding: @indent__s;

    .svgButton {
      margin-left: auto;
    }
  }

  &__showAll {
    margin-left: @indent__s;
  }
}

@media only screen and (min-width: @breakpoint__mobile) {
  .baseMenuList {
    width: 250px;
    position: absolute;
    height: 774px;
    top: 35px;

    &__listHeader {
      display: none;
    }
  }
}
</style>
