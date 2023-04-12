<template>
  <ProductListing
    :filter-attributes="SERPResult.filterOptions"
    :show-more="SERPResult.showMore"
    :products="SERPResult.products"
    :toggle-manager="useFilter"
    @show-more="doNextSERPResult"
    ><template #heading
      ><h1>Sökordet är: '{{ cleanSearchTerm }}'</h1></template
    ><template #headerInformation>
      <span class="SERPView__pageInfo">
        {{
          `Visar: 1 - ${SERPResult.products.length}/${SERPResult.totalHits}`
        }}</span
      >
      <UISelect
        v-model="sortSelected"
        class="SERPView__select"
        :options="[
          { name: 'Relevans', value: KlevuSearchSorting.Relevance },
          {
            name: 'Bokstavsordning (A - Ö)',
            value: KlevuSearchSorting.NameAsc,
          },
        ]"
        @update:model-value="changeSortOption"
      >
        <template #options="{ option, selectOption }">
          <UISelectOption @click="selectOption(option.value, option.name)">
            {{ option.name }}
          </UISelectOption>
        </template></UISelect
      ></template
    ></ProductListing
  >
</template>

<script setup lang="ts">
import { KlevuSearchSorting } from "@klevu/core";
import { useSearchStore } from "@/stores/SearchStore";
const { doSERPSearch, doNextSERPResult, toggleManager, SERPResult } =
  useSearchStore();
const route = useRoute();

const sortSelected = ref(KlevuSearchSorting.NameAsc);
const searchTerm = ref(route.params.id as string);

const cleanSearchTerm = computed(() => {
  return searchTerm.value.replace(/-/g, " ");
});

doSERPSearch(searchTerm.value, sortSelected);

const changeSortOption = () => {
  doSERPSearch(searchTerm.value, sortSelected);
};

const useFilter = (filterKey: string, option: string) => {
  toggleManager(filterKey, option);
  doSERPSearch(searchTerm.value, sortSelected);
};
</script>

<style lang="less">
.SERPView {
  &__pageInfo {
    margin-right: @indent__base;
    margin-left: auto;
  }

  &__select {
    width: 260px;
  }
}
</style>
