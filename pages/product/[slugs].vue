<template>
  <div class="productPage">
    <div id="slug-fix">
      {{ generateSlug(product!.name) }}
    </div>
    <Head
      ><Title>{{ product!.name }}</Title></Head
    >
    <Meta name="description" :content="'Some information about product here'" />
    <div class="productPage__topContainer">
      <div class="productPage__backdrop"></div>
      <h1 class="productPage__name">
        {{ product!.name }}
      </h1>
      <div class="productPage__sku">
        {{ `SKU: ${product!.sku}` }}
      </div>
    </div>
    <div class="productPage__container">
      <img
        v-show="product!.imageUrl"
        class="productPage__image"
        alt="content image"
        :src="product!.imageUrl.replace('needtochange', '')"
      />
      <div class="productPage__categoriesWrapper">
        <h2 v-show="product?.category" class="productPage__categoriesHeader">
          Kategorier
        </h2>
        <div class="productPage__categories">
          <ul class="productPage__categoriesList">
            <li
              v-for="(category, index) in product?.category
                ?.split(';;')
                .slice(1)"
              :key="index"
              class="productPage__categoriesListItem"
            >
              {{ category }}
            </li>
          </ul>
        </div>
      </div>
      <BaseSVGButton @click="addProductCompare(product!)"
        ><IconCompare /> <span>Jämför</span></BaseSVGButton
      >
    </div>
    <div class="productPage__ctaBlock">
      <p class="productPage__ctaText">
        Bli kund hos Lantmännen för att köpa produkten
      </p>
      <a
        class="linkAsButton"
        href="https://www.lantmannenlantbrukmaskin.se/om-oss/kontoansokan/"
        >Bli kund</a
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { KlevuFetch, products } from "@klevu/core";
import { useCompareStore } from "@/stores/CompareStore";
import type { ProductData } from "@/types/ProductData";
const { cleanDataKlevu } = useKlevu();
const { addProductCompare } = useCompareStore();
const { generateSlug } = useSlug();

const route = useRoute();
const regex = /[0-9]+/g;
const numberMatches = (route.params.slugs as string).match(regex);

// Fetch product data server side
const { data: product } = await useAsyncData(async () => {
  const data = await KlevuFetch(products([numberMatches![0]]));

  return data
    .queriesById("products")!
    .records.map(cleanDataKlevu)[0] as ProductData;
});
</script>

<style lang="less">
.productPage {
  // Temp fix to get SSR data to transfer to FE
  #slug-fix {
    position: absolute;
    left: -1000px;
  }

  &__topContainer {
    margin-top: @indent__m;
    padding: @indent__xxl @indent__m;
    background-color: @background_quaternary;
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
    background-color: @background_quaternary;
  }

  &__categoriesList {
    padding: @indent__s;
    margin-top: @indent__s;
    max-width: 300px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    background-color: @background_quaternary;
  }

  &__categoriesListItem {
    padding: @indent__sm @indent__m;
  }

  &__ctaBlock {
    text-align: center;
    margin-top: @indent__xxl;
  }

  &__ctaText {
    margin-bottom: @indent__m;
  }
}
</style>
