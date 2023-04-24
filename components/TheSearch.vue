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
        @focus="clickedSearchedField"
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
      <IconCross
        class="appSearch__dropdownClose"
        @click="clickedCloseDropdown"
      />
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
        <div
          v-show="emptyResult.products.length"
          class="appSearch__column appSearch__column--trending"
        >
          <div class="appSearch__headerRow">
            <h3 class="appSearch__header">Populärt just nu</h3>
          </div>

          <ul class="searchResult__result">
            <TheSearchProduct
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
            <TheSearchProduct
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

// Logic focus search input (this 2 functions is needed to fix body on mobile)

const clickedSearchedField = () => {
  // TO DO add constand somewhere, not magic number
  if (window.innerWidth < 480) {
    document.body.style.position = "fixed";
  }

  doEmptySearch();
};

const clickedCloseDropdown = () => {
  document.body.style.position = "";
  cleanQuickSearch();
};

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
    top: 94px;
    background-color: @background__secondary;
    border: 1px solid @background__primary;
    position: absolute;
    z-index: 20;
    margin: 0 -8px;
    padding: @indent__base @indent__s;
    height: ~"calc(100vh - 120px)"; // TO DO HEIGHT OF HEADER, save this somewhere
  }

  &__dropdownClose {
    position: absolute;
    right: 12px;
  }

  &__suggestions {
    display: flex;
    flex-wrap: wrap;
  }

  &__suggestionsLabel {
    white-space: nowrap;
    flex-grow: 1;
    margin-bottom: @indent__s;
  }

  &__suggestionsResult {
    display: flex;
    flex-wrap: wrap;
  }

  &__suggestion {
    margin-right: @indent__base;
    margin-bottom: @indent__xs;
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
    flex-basis: 100%;

    &--trending {
      display: none;
    }
  }

  &__headerRow {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: @indent__base;
  }
}

@media only screen and (min-width: 480px) {
  .appSearch {
    margin: 0 @indent__base;

    &__input {
      border-radius: 20px;
    }

    &__dropdown {
      border-radius: 20px;
      margin: 0;
      top: 60px;
      padding: @indent__m;
      height: auto;
      width: 100%;
    }

    &__dropdownClose {
      display: none;
    }

    &__suggestions {
      flex-wrap: nowrap;
    }

    &__suggestionsLabel {
      margin-right: @indent__base;
    }

    &__column {
      flex-basis: 48%;

      &--trending {
        display: block;
      }
    }
  }
}
</style>
