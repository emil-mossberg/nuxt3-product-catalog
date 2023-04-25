<template>
  <ProductListing
    class="searchPage"
    :filter-attributes="SERPResult.filterOptions"
    :show-more="SERPResult.showMore"
    :products="SERPResult.products"
    :toggle-manager="useFilter"
    @show-more="doNextSERPResult"
  >
    <template #metaInformation>
      <Head
        ><Title>Sökord: {{ cleanSearchTerm }}</Title></Head
      >
      <Meta
        name="description"
        :content="'Some information about category here'"
      />
    </template>

    <template #heading>
      <h1 class="searchPage__header">
        Sökordet är: '{{ cleanSearchTerm }}'
      </h1></template
    ><template #headerInformation>
      <span class="searchPage__pageInfo">
        {{
          `Visar: 1 - ${SERPResult.products.length}/${SERPResult.totalHits}`
        }}</span
      >
      <BaseSelect
        v-model="sortSelected"
        class="searchPage__select"
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
          <BaseSelectOption @click="selectOption(option.value, option.name)">
            {{ option.name }}
          </BaseSelectOption>
        </template></BaseSelect
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
.searchPage {
  &__header {
    flex-basis: 100%;
    margin-bottom: @indent__base;
  }

  &__select {
    margin-top: @indent__base;
    width: 100%;
  }
}

@media only screen and (min-width: @breakpoint__mobile) {
  .searchPage {
    &__header {
      flex-basis: auto;
      margin-bottom: 0;
    }

    &__select {
      margin-top: 0;
      width: 260px;
    }

    &__pageInfo {
      margin-right: @indent__base;
    }
  }
}
</style>
