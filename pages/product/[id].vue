<template>
  <div class="productPage">
    <div class="productPage__container">
      <h1 class="productPage__name">{{ product.name }}</h1>
      <div class="productPage__sku">{{ `SKU: ${product.sku}` }}</div>
      <img :src="cleanImageLink(product.imageUrl)" />
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
  </div>
</template>

<script setup lang="ts">
import { useFetchStore } from "@/stores/FetchStore";
import slugProductMapping from "@/data/slugProductMapping.json";

const route = useRoute();

const { cleanImageLink } = useKlevu();
const { fetchProduct, clearProduct, product } = useFetchStore();

// @ts-ignore
fetchProduct(slugProductMapping[route.params.id].id);

onBeforeUnmount(clearProduct);

const categoriesFormatted = computed(() =>
  product.category?.split(";;").slice(1)
);
</script>

<style lang="less">
.productPage {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;

  &__name {
    padding-bottom: @indent__m;
  }

  &__sku {
    padding-bottom: @indent__base;
  }

  &__categories {
    padding-top: @indent__base;
  }

  &__categoriesList {
    padding: @indent__s;
    margin-top: @indent__s;
    max-width: 300px;
    display: flex;
    flex-wrap: wrap;
    border: 1px solid;
  }

  &__categoriesListItem {
    padding: 0 @indent__xs;
  }
}
</style>
