<template>
  <ProductListing
    class="categoryPage"
    :filter-attributes="filterOptions"
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
      <h1 class="categoryPage__header">
        {{ categoryNameHeader }}
      </h1></template
    ><template #headerInformation>
      <span class="categoryPage__pageInfo">
        {{
          `Visar: 1 - ${listingData.products?.length}/${listingData.totalHits}`
        }}</span
      >
      <BaseSelect
        v-model="sortSelected"
        class="categoryPage__select"
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
  KlevuFilterResultOptions,
  KlevuSearchSorting,
  categoryMerchandising,
} from "@klevu/core";
import type { ListingData } from "@/types/ListingData";
import type { BreadCrumb } from "@/types/BreadCrumb";
const { toggleLoadingSpinner } = useAppInfoStore();
const { cleanDataKlevu } = useKlevu();
const route = useRoute();
const categoryName = route.params.name as string;
const categoryNameHeader = ref("");
const MAX_PRODUCT_SEARCH = 20;
const breadCrumbs: BreadCrumb[] = reactive([]);
const sortSelected = ref(KlevuSearchSorting.NameAsc);

const buildSearchPath = (breadcrumbs: BreadCrumb[]) =>
  breadcrumbs
    .slice(1)
    .map((breadcrum: BreadCrumb) => breadcrum.name)
    .join(";");

// Fetch initial with SSR
const { data } = await useAsyncData(async () => {
  // TO DO temp fix mapping name and breadcrumbs - dynamic import to avoid importing client side
  const categoryProductionMapping = await import(
    "@/data/categoryProductMapping.json"
  );
  // TO DO Type this
  const categoryData = categoryProductionMapping.default[route.params.name];
  // TO DO remove this when done, if this show data it should not be problem with client search at least
  // console.log(categoryData);
  const manager = new FilterManager();
  const searchPath = buildSearchPath(categoryData.breadcrumbs);
  const result = await KlevuFetch(
    categoryMerchandising(
      searchPath,
      {
        id: "categoryMerchandising",
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
    categoryData,
  };
});

// Working on client side after intial render
const manager = new FilterManager();
const listingData: ListingData = reactive({ showMore: false, products: [] });
const filterOptions: KlevuFilterResultOptions[] = reactive([]);
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
      // TO DO use data.value.categoryData.name
      categoryMerchandising(
        buildSearchPath(data.value.categoryData.breadcrumbs),
        {
          id: "categoryMerchandising",
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

  const result = hydradetResult.queriesById("categoryMerchandising");

  Object.assign(filterOptions, manager.options);
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
    ...listingData.products!,
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
    categoryMerchandising(
      buildSearchPath(data.value!.categoryData.breadcrumbs),
      {
        id: "categoryMerchandising",
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

  const reFetchResult = result.queriesById("categoryMerchandising");

  listingData.products = reFetchResult?.records.map(cleanDataKlevu);
  listingData.totalHits = reFetchResult?.meta.totalResultsFound;
  listingData.showMore = Boolean(reFetchResult?.next);

  toggleLoadingSpinner(false);
};
</script>

<style lang="less">
.categoryPage {
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
  .categoryPage {
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
