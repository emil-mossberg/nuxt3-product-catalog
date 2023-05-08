<template>
  <div class="categoryPage">
    <ProductListing
      :filter-attributes="[]"
      :show-more="showMore"
      :products="sortedProducts"
      :toggle-manager="() => {}"
      @show-more="fetchMoreProducts"
    >
      <template #metaInformation>
        <Head
          ><Title>{{ CategoryNameCleaned }}</Title></Head
        >
        <Meta
          name="description"
          :content="'Some information about category here'"
      /></template>
      <template #breadcrumbs
        ><BreadCrumbs :breadcrumbs="breadCrumbs"
      /></template>
      <template #heading
        ><h1 class="categoryPage__header">
          {{ CategoryNameCleaned }}
        </h1></template
      ><template #headerInformation>
        <span class="categoryPage__pageInfo">
          {{
            `Visar: 1 - ${fetchedProducts?.length}/${productIds.length}`
          }}</span
        >
        <BaseSelect
          v-model="sortSelected"
          class="categoryPage__select"
          :options="[
            { name: 'Bokstavsordning (A - Ö)', value: 'asc' },
            {
              name: 'Bokstavsordning (Ö - A)',
              value: 'desc',
            },
          ]"
        >
          <template #options="{ option, selectOption }">
            <BaseSelectOption @click="selectOption(option.value, option.name)">
              {{ option.name }}
            </BaseSelectOption>
          </template></BaseSelect
        >
      </template>
    </ProductListing>
  </div>
</template>

<script setup lang="ts">
import { KlevuFetch, products } from "@klevu/core";
import categoryProdMappingJSON from "@/data/categoryProductMapping.json";
import type { BreadCrumb } from "@/types/BreadCrumb";
import type { CategoryData } from "@/types/CategoryData";
import type { ProductData } from "@/types/ProductData";
const { cleanDataKlevu } = useKlevu();
const route = useRoute();

useHead({
  title: "Catalog Demo - A Page",
  meta: [
    { name: "description", content: "Lantmännen site for catalog products." },
  ],
});

// TO DO get rid of unknown - not sure it is necessary to spend time on since will import
const categoryProdMapping = categoryProdMappingJSON as unknown as CategoryData;
const categoryId = route.params.id as string;

if (!categoryProdMapping[categoryId]) {
  throw createError({
    statusCode: 404,
    statusMessage: "Kategorin existerar inte",
  });
}

const categoryName = ref(categoryProdMapping[categoryId].name);
const productIds = categoryProdMapping[categoryId].products;
const breadCrumbs = ref<BreadCrumb[]>(
  categoryProdMapping[categoryId].breadcrumbs
);

// Uppercase first letter in name
const CategoryNameCleaned = computed(
  () => categoryName.value.charAt(0).toUpperCase() + categoryName.value.slice(1)
);

const PAGE_SIZE = 6;
const startIndex = ref(6);
const endIndex = ref(6);
const showMore = ref(productIds.length > endIndex.value);

// Fetch initial load of products server side
const { data: fetchedProducts } = await useAsyncData(async () => {
  const { categoryProductMap } = useAppInfoStore();
  // TO DO how to get this to work? Would solve issues with PLP fetching
  console.log("Server:", categoryProductMap);

  // TO DO here I need to fetch data for category over API not using hardcoded JSON
  const data = await KlevuFetch(
    products(productIds.slice(0, PAGE_SIZE).map(String))
  );

  return data.queriesById("products")?.records.map(cleanDataKlevu) ?? [];
});

// Fetch additional products client side
const fetchMoreProducts = async () => {
  endIndex.value = endIndex.value + PAGE_SIZE;

  const productResultKlevu = await KlevuFetch(
    products(productIds.slice(startIndex.value, endIndex.value).map(String))
  );

  fetchedProducts.value = [
    ...fetchedProducts.value!,
    ...(productResultKlevu
      .queriesById("products")
      ?.records.map(cleanDataKlevu) ?? []),
  ];

  startIndex.value = endIndex.value;
  showMore.value = productIds.length > endIndex.value;
};

// Logic sorting products
const sortSelected = ref("asc");

const sortedProducts = computed(() => {
  const direction = sortSelected.value === "asc" ? 1 : -1;
  return fetchedProducts
    .value!.slice()
    .sort((product1: ProductData, product2: ProductData) =>
      product1.name > product2.name ? direction : -direction
    );
});
</script>

<style lang="less">
.categoryPage {
  &__header {
    flex-basis: 100%;
    margin-bottom: @indent__base;
  }

  &__pageInfo {
    margin-right: @indent__base;
    margin-left: auto;
  }

  &__select {
    margin-top: @indent__base;
    width: 100%;
  }
}

.categoryPage .productListing__filterButton {
  display: none !important;
}

@media only screen and (min-width: @breakpoint__mobile) {
  .categoryPage {
    &__header {
      flex-basis: auto;
      margin-bottom: 0;
    }

    &__select {
      margin-top: 0;
      width: 260px;
    }
  }
}
</style>
