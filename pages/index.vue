<template>
  <div class="startPage">
    <UITextCard
      :header="'Demokatalog'"
      :body-text="'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'"
    />
    <div class="startPage__imageBlock">
      <img
        alt="content image"
        class="startPage__image"
        :src="'https://firebasestorage.googleapis.com/v0/b/product-list-demo-2248d.appspot.com/o/bg_1.jpg?alt=media&token=9b90a16f-6b3c-47a9-9d35-71b614a6c74b'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Catalog Demo - A Page",
  meta: [
    { name: "description", content: "Lantmännen site for catalog products." },
  ],
});
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
