<template>
  <NuxtLink class="compareLink" to="/compare"
    ><IconCompare />{{ `Jämför produkter (${compareCount})` }}</NuxtLink
  >
</template>

<script setup lang="ts">
const compareStore = useCompareStore();
const { compareCount } = storeToRefs(compareStore);
</script>

<style lang="less">
.compareLink {
  display: flex;
  align-items: center;
  gap: @indent__s;
}
</style>
