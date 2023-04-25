<template>
  <div class="categoryPage">
    <ProductListing
      :filter-attributes="PLPResult.filterOptions"
      :show-more="PLPResult.showMore"
      :products="sortedData"
      :toggle-manager="() => {}"
      @show-more="fetchPLPResult"
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
            `Visar: 1 - ${PLPResult.products.length}/${PLPResult.productIds.length}`
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
          @update:model-value="changeSortOption"
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
import { storeToRefs } from "pinia";
import { useDebounceFn } from "@vueuse/core";
import { useFetchStore } from "@/stores/FetchStore";
import categoryProdMappingJSON from "@/data/categoryProductMapping.json";
import type { BreadCrumb } from "@/types/BreadCrumb";
import type { CategoryData } from "@/types/CategoryData";

const { fetchPLPResult, clearFetchedPLPResult, PLPResult } = useFetchStore();
const fetchStore = useFetchStore();
const { sortedData } = storeToRefs(fetchStore);
const route = useRoute();

useHead({
  title: "Catalog Demo - A Page",
  meta: [
    { name: "description", content: "Lantmännen site for catalog products." },
  ],
});

// TO DO get rid of unknown
const categoryProdMapping = categoryProdMappingJSON as unknown as CategoryData;

const categoryId = route.params.id as string;

// Set 404 page if category does not exist
if (!categoryProdMapping[categoryId]) {
  throw createError({
    statusCode: 404,
    statusMessage: "Kategorin existerar inte",
  });
}

const sortSelected = ref("asc");

const changeSortOption = () => {
  PLPResult.sortDirection = sortSelected.value;
};

const categoryName = ref(categoryProdMapping[categoryId].name);
const breadCrumbs = ref<BreadCrumb[]>(
  categoryProdMapping[categoryId].breadcrumbs
);

// Uppercase first letter in name
const CategoryNameCleaned = computed(
  () => categoryName.value.charAt(0).toUpperCase() + categoryName.value.slice(1)
);

PLPResult.productIds = categoryProdMapping[categoryId].products;

// const debouncedFetchPLPResult = useDebounceFn(fetchPLPResult, 500);

fetchPLPResult();
onBeforeUnmount(clearFetchedPLPResult);
// onMounted(() => {
//   window.onscroll = () => {
//     console.log("SCROOLLINNG");

//     const bottomOfWindow =
//       Math.max(
//         window.pageYOffset,
//         document.documentElement.scrollTop,
//         document.body.scrollTop
//       ) + window.innerHeight;

//     const bottomOfWindow2 = document.documentElement.offsetHeight + 100;

//     const bottom = bottomOfWindow > document.documentElement.offsetHeight + 100;

//     console.log(bottom);
//     if (bottom) {
//       debouncedFetchPLPResult();
//     }

//     console.log(bottomOfWindow);
//     console.log(bottomOfWindow2);
//   };
// });
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

<!-- import { useDebounceFn } from '@vueuse/core'

const debouncedFn = useDebounceFn(() => {
  // do something
}, 1000)

window.addEventListener('resize', debouncedFn) -->

<!-- scrollToBottom() {
  window.onscroll = () => {
    let bottomOfWindow =
      Math.max(
        window.pageYOffset,
        document.documentElement.scrollTop,
        document.body.scrollTop
      ) +
        window.innerHeight ===
      document.documentElement.offsetHeight;

    // Hacky fix here, remove this instead when loaded all
    // Instead of checking against undefined
    if (bottomOfWindow && this.lastLoadedStory != undefined) {
      this.$store.dispatch("fetchAdditionalStories");
    }
  };
}
},
mounted() {
this.$store.dispatch("fetchStories");
this.$store.dispatch("fetchGuessedDate");
this.scrollToBottom();
} -->
