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
        ><Title>{{ categoryName }}</Title></Head
      >
      <Meta
        name="description"
        :content="'Some information about category here'"
      />
    </template>
    <template #breadcrumbs><BreadCrumbs :breadcrumbs="breadCrumbs" /></template>

    <template #heading>
      <h1 class="listingPage__header">
        {{ categoryNameHeader }}
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
    >
    <template #no-result
      >Kategorin existerar inte, leta efter den i menyn ...</template
    >
  </ProductListing>
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
  categoryMerchandising,
} from "@klevu/core";
import type { ListingData } from "@/types/ListingData";
import type { BreadCrumb } from "@/types/BreadCrumb";
const { toggleLoadingSpinner } = useAppInfoStore();
const { cleanDataKlevu } = useKlevu();
const route = useRoute();
const categoryName = route.params.slug as string;
const categoryNameHeader = ref("");
const MAX_PRODUCT_SEARCH = 20;
const breadCrumbs: BreadCrumb[] = reactive([]);
const sortSelected = ref(KlevuSearchSorting.NameAsc);

// Helper functions build category search path for Kleu with breadcrumbs

const buildSearchPath = (breadcrumbs: BreadCrumb[]) =>
  breadcrumbs
    .slice(1)
    .map((breadcrumb: BreadCrumb) => breadcrumb.name)
    .join(";");

// Wrapper function to build categoryMerchandising call to Klevu

const fetchCategoryWrapper = async (
  manager: FilterManager,
  breadCrumbs: BreadCrumb[],
  sortOption: any
) => {
  return await KlevuFetch(
    categoryMerchandising(
      buildSearchPath(breadCrumbs),
      {
        id: "categoryMerchandising",
        sort: sortOption,
        limit: MAX_PRODUCT_SEARCH,
      },
      listFilters({
        include: ["category", "packagingType"],
        filterManager: manager,
      }),
      applyFilterWithManager(manager)
    )
  );
};

// Fetch initial with SSR
const { data } = await useAsyncData(async () => {
  // Temp fix mapping name and breadcrumbs - dynamic import to avoid importing client side
  const categoryProductionMapping = await import(
    "@/data/categoryProductMapping.json"
  );
  // TO DO
  // Type this
  // remove this when done, if this show data it should not be problem with client search at least
  const categoryData = categoryProductionMapping.default[route.params.slug];

  const manager = new FilterManager();
  const result = await fetchCategoryWrapper(
    manager,
    categoryData.breadcrumbs,
    KlevuSearchSorting.NameAsc
  );
  return {
    klevuData: KlevuPackFetchResult(result),
    categoryData,
  };
});

// Working on client side after intial render
const manager = new FilterManager();
const listingData: ListingData = reactive({ showMore: false, products: [] });
let prevResult: any;

// Change sort option
const changeSortOption = () => {
  reFetch(sortSelected.value);
};

// Using onMounted to hydrade the data send from backend
// Which ithe data for the initial search
onMounted(async () => {
  if (data.value == null) {
    return;
  }

  toggleLoadingSpinner(true);

  // Hydrade Klevu data fetched on server to use client side
  const hydradetResult = await KlevuHydratePackedFetchResult(
    data.value.klevuData,
    [
      categoryMerchandising(
        buildSearchPath(data.value.categoryData.breadcrumbs),
        {
          id: "categoryMerchandising",
          limit: MAX_PRODUCT_SEARCH,
        },
        listFilters({
          include: ["category", "packagingType"],
          filterManager: manager,
        }),
        applyFilterWithManager(manager)
      ),
    ]
  );

  const result = hydradetResult.queriesById("categoryMerchandising");

  listingData.totalHits = result?.meta.totalResultsFound;
  listingData.products = result?.records.map(cleanDataKlevu);
  listingData.showMore = Boolean(result?.next);

  prevResult = result;

  // Hydrate Category Data fetched from JSON saved on server
  // use it category name and breadcrumbs
  categoryNameHeader.value = data.value.categoryData.name;
  Object.assign(breadCrumbs, data.value.categoryData.breadcrumbs);
  toggleLoadingSpinner(false);
});

// On client -  Fetch More products if user clicks load more
const fetchMore = async () => {
  toggleLoadingSpinner(true);
  const nextRes = await prevResult.next({
    FilterManager: manager,
  });

  prevResult = nextRes.queriesById("categoryMerchandising");
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
  const result = await fetchCategoryWrapper(
    manager,
    data.value?.categoryData.breadcrumbs,
    sortOption
  );

  const reFetchResult = result.queriesById("categoryMerchandising");

  listingData.products = reFetchResult?.records.map(cleanDataKlevu);
  listingData.totalHits = reFetchResult?.meta.totalResultsFound;
  listingData.showMore = Boolean(reFetchResult?.next);

  toggleLoadingSpinner(false);
};
</script>
