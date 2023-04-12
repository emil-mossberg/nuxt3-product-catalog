<template>
  <div ref="appSearchRef" class="appSearch">
    <form
      class="appSearch__form"
      autocomplete="off"
      @submit.prevent="doSearchSubmit"
    >
      <input
        id="seachInput"
        v-model="searchTerm"
        class="appSearch__input"
        autocomplete="off"
        type="text"
        placeholder="Vad letar du efter?"
        @focus="doEmptySearch"
        @keyup="debouncedDoQuickSearch"
      />
    </form>
    <IconSearchGlass class="appSearch__searchIcon" />
    <IconCross
      v-show="searchTerm"
      class="appSearch__crossIcon"
      @click="searchTerm = ''"
    />
    <div v-show="showDropDown" class="appSearch__dropdown">
      <div
        v-show="quickSearchResult.searchSuggestions.length"
        class="appSearch__suggestions"
      >
        <h3 class="appSearch__suggestionsLabel">Menar du:</h3>
        <ul class="appSearch__suggestionsResult">
          <li
            v-for="(suggestion, index) in quickSearchResult.searchSuggestions"
            :key="index"
            class="appSearch__suggestion"
          >
            <NuxtLink
              class="appSearch__suggestionLink"
              :to="`/search/${suggestionParser(suggestion)}`"
              @click="cleanQuickSearch"
            >
              <!-- Below v-html is not used for user input content so it is ok to disable -->
              <!-- eslint-disable-next-line vue/no-v-html -->
              <span v-html="suggestion"></span
            ></NuxtLink>
          </li>
        </ul>
      </div>
      <div
        v-show="
          !quickSearchResult.searchSuggestions.length &&
          emptyResult.lastSearched.length
        "
        class="appSearch__suggestions"
      >
        <h3 class="appSearch__suggestionsLabel">Senaste sökningar:</h3>
        <ul class="appSearch__suggestionsResult">
          <li
            v-for="(suggestion, index) in emptyResult.lastSearched"
            :key="index"
            class="appSearch__suggestion"
          >
            <NuxtLink
              class="appSearch__suggestionLink"
              :to="`/search/${suggestion}`"
              @click="cleanQuickSearch"
            >
              <!-- Below v-html is not used for user input content so it is ok to disable -->
              <!-- eslint-disable-next-line vue/no-v-html -->
              <span v-html="suggestion"></span
            ></NuxtLink>
          </li>
        </ul>
      </div>
      <div class="appSearch__resultBody">
        <div v-show="emptyResult.products.length" class="appSearch__column">
          <div class="appSearch__headerRow">
            <h3 class="appSearch__header">Populärt just nu</h3>
          </div>

          <ul class="searchResult__result">
            <SearchProduct
              v-for="(product, index) in emptyResult.products"
              :key="index"
              :product-data="product"
              @click="cleanQuickSearch"
            />
          </ul>
        </div>
        <div
          v-show="quickSearchResult.products.length"
          class="appSearch__column"
        >
          <div class="appSearch__headerRow">
            <h3 class="appSearch__header">Sökresultat ...</h3>
            <NuxtLink :to="`/search/${searchTerm}`" @click="cleanQuickSearch"
              >Visa alla</NuxtLink
            >
          </div>
          <ul class="searchResult__result">
            <SearchProduct
              v-for="(product, index) in quickSearchResult.products"
              :key="index"
              :product-data="product"
              @click="cleanQuickSearch"
            />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onClickOutside, useDebounceFn } from "@vueuse/core";

import { useSearchStore } from "@/stores/SearchStore";
const {
  cleanQuickSearch,
  doQuickSearch,
  doEmptySearch,
  quickSearchResult,
  emptyResult,
} = useSearchStore();
const searchStore = useSearchStore();
const { searchTerm, showDropDown } = storeToRefs(searchStore);

// Logic close dropdown

const appSearchRef = ref(null);

onClickOutside(appSearchRef, () => {
  showDropDown.value = false;
  cleanQuickSearch();
});

// Logic search on searchTerm

const doSearchSubmit = () => {
  // TO DO this should be not here since for quickSearch it is on store also no magic numbers
  if (searchTerm.value.length < 3) {
    return;
  }

  // TO DO can this be fixed in a simpler way
  const element = document.getElementById("seachInput") as HTMLElement;
  element.blur();

  navigateTo(`/search/${searchTerm.value}`);
  cleanQuickSearch();
};

// Logic quickSearch when typing
// TO DO is this debouncing working?
const debouncedDoQuickSearch = useDebounceFn(doQuickSearch, 300);

// Logic suggestions
const suggestionParser = (htmlElementText: string) => {
  return htmlElementText.replace(/<\/?[^>]+(>|$)/g, "").replace(/\s/g, "-");
};
</script>

<style lang="less">
.appSearch {
  position: relative;
  display: flex;
  flex-grow: 1;

  &__form {
    width: 100%;
  }

  &__input {
    border: 1px solid @color__border_primary;
    width: 100%;
    border-radius: 20px;
    height: 48px;
    padding: 0 @indent__base 0 50px;
    font-size: 16px;
    outline: none;

    &::placeholder {
      color: @color__text_secondary;
    }

    &:focus {
      border: 2px solid @color__active_primary;
    }
  }

  &__searchIcon,
  &__crossIcon {
    transform: translate(16px, -50%);
    top: 50%;
    position: absolute;
    z-index: 1;
    cursor: pointer;
  }

  &__crossIcon {
    right: 28px;
  }

  &__dropdown {
    position: absolute;
    border-radius: 20px;
    width: 100%;
    top: 60px;
    background-color: @background__secondary;
    border: 1px solid @background__primary;
    position: absolute;
    z-index: 20;
    padding: @indent__m;
  }

  &__suggestions {
    display: flex;
  }

  &__suggestionsLabel {
    white-space: nowrap;
  }

  &__suggestionsResult {
    display: flex;
    flex-wrap: wrap;
  }

  &__suggestion {
    margin-left: @indent__base;
    padding: 4px 16px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    border: 1px solid @color__text_primary;
  }

  &__resultBody {
    margin-top: @indent__base;
    display: flex;
    gap: @indent__m;
  }

  &__column {
    flex-basis: 48%;
  }

  &__headerRow {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: @indent__base;
  }
}
</style>
