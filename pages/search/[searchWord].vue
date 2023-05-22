<template>
  <ProductListing
    class="listingPage"
    :filter-attributes="manager.options"
    :show-more="listingData.showMore"
    :products="listingData.products"
    :toggle-manager="useFilter"
    @show-more="fetchMore"
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
      <h1 class="listingPage__header">
        Sökordet är: '{{ cleanSearchTerm }}'
      </h1></template
    ><template #headerInformation>
      <span class="listingPage__pageInfo">
        {{
          `Visar: 1 - ${listingData.products?.length}/${listingData.totalHits}`
        }}</span
      >
      <BaseSelect
        v-model="sortSelected"
        class="listingPage__select"
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
import {
  KlevuFetch,
  FilterManager,
  listFilters,
  applyFilterWithManager,
  KlevuPackFetchResult,
  KlevuHydratePackedFetchResult,
  KlevuSearchSorting,
  search,
} from "@klevu/core";
import type { ListingData } from "@/types/ListingData";
const { toggleLoadingSpinner } = useAppInfoStore();
const { cleanDataKlevu } = useKlevu();
const route = useRoute();
const searchTerm = ref(route.params.searchWord as string);
const cleanSearchTerm = computed(() => {
  return searchTerm.value.replace(/-/g, " ");
});
const MAX_PRODUCT_SEARCH = 20;
const sortSelected = ref(KlevuSearchSorting.NameAsc);

// Fetch initial with SSR
const { data } = await useAsyncData(async () => {
  const manager = new FilterManager();

  const result = await KlevuFetch(
    search(
      searchTerm.value,
      {
        id: "search",
        sort: sortSelected.value,
        limit: MAX_PRODUCT_SEARCH,
      },
      listFilters({
        include: ["category"],
        filterManager: manager,
      }),
      applyFilterWithManager(manager)
    )
  );
  return {
    klevuData: KlevuPackFetchResult(result),
  };
});

// Working on client side after initial render
const manager = new FilterManager();
const listingData: ListingData = reactive({ showMore: false, products: [] });
let prevResult: any;

// Change sort option
const changeSortOption = () => {
  reFetch(sortSelected);
};

// Using onMounted to hydrade the data send from backend
// Which ithe data for the initial search
onMounted(async () => {
  toggleLoadingSpinner(true);
  if (data.value == null) {
    return;
  }

  // Hydrade Klevu data fetched on server to use client side
  const hydradetResult = await KlevuHydratePackedFetchResult(
    data.value.klevuData,
    [
      search(
        searchTerm.value,
        {
          id: "search",
          limit: MAX_PRODUCT_SEARCH,
        },
        listFilters({
          include: ["category"],
          filterManager: manager,
        }),
        applyFilterWithManager(manager)
      ),
    ]
  );

  const result = hydradetResult.queriesById("search");

  listingData.totalHits = result?.meta.totalResultsFound;
  listingData.products = result?.records.map(cleanDataKlevu);
  listingData.showMore = Boolean(result?.next);

  prevResult = result;
  toggleLoadingSpinner(false);
});

// On client -  Fetch More products if user clicks load more
const fetchMore = async () => {
  toggleLoadingSpinner(true);
  const nextRes = await prevResult.next({
    FilterManager: manager,
  });

  prevResult = nextRes.queriesById("search");
  listingData.products = [
    ...(listingData.products ?? []),
    ...(prevResult?.records.map(cleanDataKlevu) ?? []),
  ];

  listingData.showMore = Boolean(prevResult?.next);
  toggleLoadingSpinner(false);
};

// Change filter option
const useFilter = (filterKey: string, option: string) => {
  manager.toggleOption(filterKey, option);
  reFetch(sortSelected);
};

// On client - Refetch result if user uses Filters
const reFetch = async (sortOption: any) => {
  toggleLoadingSpinner(true);
  const result = await KlevuFetch(
    search(
      searchTerm.value,
      {
        id: "search",
        sort: sortOption.value,
        limit: MAX_PRODUCT_SEARCH,
      },
      listFilters({
        include: ["category"],
        filterManager: manager,
      }),
      applyFilterWithManager(manager)
    )
  );

  const reFetchResult = result.queriesById("search");

  listingData.products = reFetchResult?.records.map(cleanDataKlevu);
  listingData.totalHits = reFetchResult?.meta.totalResultsFound;
  listingData.showMore = Boolean(reFetchResult?.next);

  toggleLoadingSpinner(false);
};
</script>
