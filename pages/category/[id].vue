<template>
  <ProductListing
    class="ProductsView"
    :filter-attributes="PLPResult.filterOptions"
    :show-more="PLPResult.showMore"
    :products="sortedData"
    :toggle-manager="() => {}"
    @show-more="fetchPLPResult"
  >
    <template #metaInformation>
      <Head
        ><Title>{{
          categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
        }}</Title></Head
      >
      <Meta
        name="description"
        :content="'Some information about category here'"
    /></template>

    <template #heading
      ><h1>
        {{ categoryName.charAt(0).toUpperCase() + categoryName.slice(1) }}
      </h1></template
    ><template #headerInformation>
      <span class="ProductsView__pageInfo">
        {{
          `Visar: 1 - ${PLPResult.products.length}/${PLPResult.productIds.length}`
        }}</span
      >
      <UISelect
        v-model="sortSelected"
        class="ProductsView__select"
        :options="[
          { name: 'Bokstavsordning (A - Ö)', value: 'asc' },
          {
            name: 'Bokstavsordning (Ö - A)',
            value: 'desc',
          },
        ]"
        @update:model-value="changeSortOption"
      >
        <template #options="{ option, selectOption }">
          <UISelectOption @click="selectOption(option.value, option.name)">
            {{ option.name }}
          </UISelectOption>
        </template></UISelect
      >
    </template>
  </ProductListing>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useFetchStore } from "@/stores/FetchStore";
import categoryProdMapping from "@/data/categoryProductMapping.json";

useHead({
  title: "Catalog Demo - A Page",
  meta: [
    { name: "description", content: "Lantmännen site for catalog products." },
  ],
});

const { fetchPLPResult, clearFetchedPLPResult, PLPResult } = useFetchStore();
const fetchStore = useFetchStore();
const { sortedData } = storeToRefs(fetchStore);
const route = useRoute();

const sortSelected = ref("asc");

const changeSortOption = () => {
  PLPResult.sortDirection = sortSelected.value;
};

// @ts-ignore
const categoryName = ref(categoryProdMapping[route.params.id].name);
// @ts-ignore
PLPResult.productIds = categoryProdMapping[route.params.id].products;

fetchPLPResult();
onBeforeUnmount(clearFetchedPLPResult);
</script>

<style lang="less">
.ProductsView {
  &__pageInfo {
    margin-right: @indent__base;
    margin-left: auto;
  }

  &__select {
    width: 260px;
  }

  .productListing__filters {
    display: none;
  }
}
</style>
