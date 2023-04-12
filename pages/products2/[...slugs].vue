<template>
  <div class="startPage">TO DO NEED TO VALIDATE NAME SOMEHOW</div>
</template>

<script setup lang="ts">
useHead({
  title: "Catalog Demo - A Page",
  meta: [
    { name: "description", content: "Lantmännen site for catalog products." },
  ],
});

const route = useRoute();

console.log(route.params);


</script>

<style lang="less">
.startPage {
  padding-top: @indent__m;

  &__imageBlock {
    margin-top: @indent__m;
    max-width: 1440px;
  }

  &__image {
    width: 100%;
  }
}
</style>
