<template>
  <header class="header">
    <div class="header__navigationWrapper">
      <div class="header__navigation">
        <div class="header__navigationTop">
          <NuxtLink class="header__navigationLogo" to="/"
            ><IconLmLogo /><span class="header__navigationLogoText">
              / Produktkatalogen</span
            ></NuxtLink
          >
          <TheSearch />
          <BaseButton
            v-show="compareCount > 0"
            :button-type="'primary'"
            class="header__compareDesktop"
          >
            <NuxtLink
              class="header__compareLink header__compareLink--desktop"
              to="/compare"
              ><IconCompare />{{
                `Jämför produkter (${compareCount})`
              }}</NuxtLink
            >
          </BaseButton>
        </div>
        <div class="header__navigationBottom">
          <IconMobileMenu
            class="header__mobileNavigation"
            @click="toggleCategoryMenu(true)"
          />
          <NuxtLink
            v-show="compareCount > 0"
            class="header__compareLink header__mobileCompare"
            to="/compare"
            ><IconCompare
          /></NuxtLink>
          <ul
            class="header__navigationCategories"
            :class="{ 'header__navigationCategories--open': showCategoryMenu }"
          >
            <div class="header__categoryNavMobile">
              <h3>Produkter</h3>
              <IconCross @click="toggleCategoryMenu(false)" />
            </div>

            <TheHeaderCategoryNavigation
              v-for="(category, index) in categoryTree.children"
              :key="index"
              :catalog-data="category"
              @close-menu="toggleCategoryMenu(false)"
            />
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCompareStore } from "@/stores/CompareStore";
import { useAppInfoStore } from "@/stores/AppInfoStore";
import categoryTree from "@/data/categoryTree.json";

const compareStore = useCompareStore();
const { compareCount } = storeToRefs(compareStore);
const appInfoStore = useAppInfoStore();
const { isMobile } = storeToRefs(appInfoStore);

const showCategoryMenu = ref<boolean>(false);

const toggleCategoryMenu = (toggleValue: boolean) => {
  showCategoryMenu.value = toggleValue;
  if (isMobile.value && toggleValue) {
    document.body.style.position = "fixed";
  } else if (isMobile.value && !toggleValue) {
    document.body.style.position = "";
  }
};
</script>

<style lang="less">
.header {
  border-bottom: 1px solid @color__border_primary;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: @indent__base 0 @indent__s 0;
  background-color: @background__secondary;

  &__navigationWrapper {
    margin: 0 @indent__s;
    flex-basis: 100%;
  }

  &__navigation {
    width: 100%;
    margin: 0 auto;
  }

  &__navigationTop {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  &__navigationCategories {
    position: absolute;
    top: 0;
    height: 100vh;
    background-color: @background_quaternary;
    width: 100%;
    margin-left: -8px;
    z-index: 2;
    left: -100%;
    transition: left ease-in 0.4s;

    &--open {
      left: 8px;
    }
  }

  &__categoryNavMobile {
    display: flex;
    justify-content: space-between;
    padding: @indent__xs;
  }

  &__navigationLogo {
    display: flex;
    align-items: center;
    text-decoration: none;
    margin-bottom: @indent__sm;
  }

  &__navigationLogoText {
    font-size: 1.6rem;
    font-weight: 400;
    margin-left: @indent__base;
  }

  &__navigationBottom {
    padding: @indent__base 0 @indent__xs 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__compareLink {
    display: flex;
    align-items: center;
    gap: @indent__s;
    color: white;

    svg {
      height: 24px;
      width: 24px;
    }
  }

  &__compareDesktop {
    display: none;
  }
}

@media only screen and (min-width: @breakpoint__mobile) {
  .header {
    &__navigationWrapper {
      margin: 0 @indent__m;
    }

    &__navigation {
      width: min(90%, @max-width-view);
    }

    &__navigationCategories {
      position: static;
      display: flex;
      height: auto;
      top: auto;
      background-color: @background__secondary;
      left: auto;
    }

    &__categoryNavMobile {
      display: none;
    }

    &__navigationLogo {
      margin-bottom: 0;
    }

    &__compareDesktop {
      display: block;
    }

    &__mobileCompare,
    &__mobileNavigation {
      display: none;
    }
  }
}
</style>
