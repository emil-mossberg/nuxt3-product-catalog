<template>
  <div class="productPage">
    <div id="slug-fix">
      {{ generateSlug(data!.name) }}
    </div>
    <Head
      ><Title>{{ data!.name }}</Title></Head
    >
    <Meta name="description" :content="'Some information about product here'" />
    <div class="productPage__topContainer">
      <div class="productPage__backdrop"></div>
      <h1 class="productPage__name">
        {{ data!.name }}
      </h1>
      <div class="productPage__sku">
        {{ `SKU: ${data!.sku}` }}
      </div>
    </div>
    <div class="productPage__container">
      <img
        v-show="data!.imageUrl"
        class="productPage__image"
        alt="content image"
        :src="data!.imageUrl.replace('needtochange', '')"
      />
      <div class="productPage__categoriesWrapper">
        <h2 v-if="product.category" class="productPage__categoriesHeader">
          Kategorier
        </h2>
        <div class="productPage__categories">
          <ul class="productPage__categoriesList">
            <li
              v-for="(category, index) in data?.category?.split(';;').slice(1)"
              :key="index"
              class="productPage__categoriesListItem"
            >
              {{ category }}
            </li>
          </ul>
        </div>
      </div>
      <BaseSVGButton @click="addProductCompare(data!)"
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
import { useFetchStore } from "@/stores/FetchStore";
import type { ProductData } from "@/types/ProductData";
const { cleanDataKlevu } = useKlevu();
const { addProductCompare } = useCompareStore();
const { generateSlug } = useSlug();

const route = useRoute();
const { product } = useFetchStore();

// Fetch product data server side
const { data } = await useAsyncData(async () => {
  const data = await KlevuFetch(products([route.params.slugs[0]]));

  return data
    .queriesById("products")!
    .records.map(cleanDataKlevu)[0] as ProductData;
});

// Mounted hook used to make sure that slug is correct after app mounted in browser
onMounted(() => {
  const route = useRoute();
  const correctRoute = route.path.replace(
    route.path.split("/").pop() as string,
    document.getElementById("slug-fix")?.innerText as string
  );
  // @ts-ignore
  history.pushState({}, null, correctRoute);
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
