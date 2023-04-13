<template>
  <div class="productPage">
    <Head
      ><Title>{{ product.name }}</Title></Head
    >
    <Meta name="description" :content="'Some information about product here'" />
    <div class="productPage__topContainer">
      <div class="productPage__backdrop"></div>
      <h1 class="productPage__name">{{ product.name }}</h1>
      <div class="productPage__sku">{{ `SKU: ${product.sku}` }}</div>
    </div>
    <div class="productPage__container">
      <img
        v-show="product.imageUrl"
        class="productPage__image"
        alt="content image"
        :src="product.imageUrl"
      />
      <div class="productPage__categoriesWrapper">
        <h2 v-if="product.category" class="productPage__categoriesHeader">
          Kategorier
        </h2>
        <div class="productPage__categories">
          <ul class="productPage__categoriesList">
            <li
              v-for="(category, index) in categoriesFormatted"
              :key="index"
              class="productPage__categoriesListItem"
            >
              {{ category }}
            </li>
          </ul>
        </div>
      </div>
      <UISVGButton @click="addProductToCompare(product)"
        ><IconCompare /> <span>Jämför</span></UISVGButton
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCompareStore } from "@/stores/CompareStore";
import { useFetchStore } from "@/stores/FetchStore";
const { addProductToCompare } = useCompareStore();

const route = useRoute();
const { fetchProduct, clearProduct, product } = useFetchStore();

definePageMeta({
  // TO DO fix this start with adding route in parameter for access
  validate: () => {
    return true;
  },
});

// @ts-ignore
fetchProduct(route.params.slugs[0]);

onBeforeUnmount(clearProduct);

const categoriesFormatted = computed(() =>
  product.category?.split(";;").slice(1)
);
</script>

<style lang="less">
.productPage {
  width: 100%;
  // margin: 0 auto;
  // display: flex;
  // justify-content: center;
  // align-items: center;

  // padding: 48px 0;
  //   text-align: center;
  //   background: red;
  //   background-color: #f4eee6;
  //   color: #1e6e37;

  &__topContainer {
    margin-top: @indent__m;
    padding: @indent__xxl @indent__m;
    background-color: @new-and-funky;
  }

  &__container {
    margin-top: @indent__xxl;
    display: flex;
    justify-content: center;
  }

  &__image {
    max-width: 400px;
    height: 100%;
  }

  &__name {
    color: @fun-green;
    padding-bottom: @indent__m;
  }

  &__categoriesWrapper {
    margin-left: @indent__xxl;
  }

  &__categoriesHeader {
    padding: @indent__base;
    background-color: @new-and-funky;
  }

  &__categoriesList {
    padding: @indent__s;
    margin-top: @indent__s;
    max-width: 300px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    background-color: @new-and-funky;
  }

  &__categoriesListItem {
    padding: @indent__sm @indent__m;
  }
}
</style>
