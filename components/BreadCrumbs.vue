<template>
  <ul class="breadCrumbs">
    <li v-for="(crumb, index) in breadcrumbs" :key="index">
      <span v-if="index < breadcrumbs.length - 1"
        ><NuxtLink :to="crumb.url">{{ crumb.name }} </NuxtLink
        ><span class="breadCrumbs__delimitator">/</span></span
      >

      <span v-if="index === breadcrumbs.length - 1">{{ crumb.name }}</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { BreadCrumb } from "@/types/BreadCrumb";

defineProps<{
  breadcrumbs: BreadCrumb[];
}>();
</script>

<style lang="less">
.breadCrumbs {
  display: flex;
  flex-wrap: wrap;

  &__delimitator {
    margin: 0 8px;
  }
}
</style>
