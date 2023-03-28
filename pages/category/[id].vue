<template>
  <ProductListing
    :filter-attributes="PLPResult.filterOptions"
    :show-more="PLPResult.showMore"
    :products="sortedData"
    :toggle-manager="() => {}"
    @show-more="fetchPLPResult"
    ><template #heading
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
        @update:modelValue="changeSortOption"
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
}

.productListing__filters {
  display: none;
}

.productListing__main {
  border-left: 1px solid @color__border_primary;
}
</style>
