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
          <ClientOnly
            ><CompareLink
              v-show="compareCount > 0"
              class="header__compareLink header__compareLink--desktop"
          /></ClientOnly>
        </div>
        <div class="header__navigationBottom">
          <BaseSVGButton
            class="header__mobileNavigation"
            @click="toggleCategoryMenu(true)"
            ><IconMobileMenu
          /></BaseSVGButton>

          <NuxtLink
            v-show="compareCount > 0"
            class="header__compareLink header__compareLink--mobile"
            :to="{ name: 'compare' }"
            ><IconCompare
          /></NuxtLink>
          <ul
            class="header__navigationCategories"
            :class="{ 'header__navigationCategories--open': showCategoryMenu }"
          >
            <div class="header__categoryNavMobile">
              <h3>Produkter</h3>
              <BaseSVGButton @click="toggleCategoryMenu(false)"
                ><IconCross class="header__iconCross"
              /></BaseSVGButton>
            </div>
            <ClientOnly>
              <TheHeaderCategoryNavigation
                v-for="(child, index) in categoryMenu.children"
                :key="index"
                :catalog-data="(child as CategoryMenuLevel1)"
                @close-menu="toggleCategoryMenu(false)"
              />
            </ClientOnly>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { CategoryMenuLevel1 } from "@/types/CategoryMenuLevel1";

const compareStore = useCompareStore();
const { compareCount } = storeToRefs(compareStore);
const appInfoStore = useAppInfoStore();
const { categoryMenu } = useAppInfoStore();
const { isMobile } = storeToRefs(appInfoStore);

const showCategoryMenu = ref(false);

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

  &__iconCross {
    height: 28px;
    width: 28px;
  }

  &__navigationLogo {
    display: flex;
    align-items: center;
    text-decoration: none;
    margin-bottom: @indent__sm;
    margin-right: @indent__base;
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

  &__mobileNavigation {
    svg {
      height: 28px;
      width: 28px;
    }
  }

  &__compareLink {
    &--mobile {
      display: block;
    }

    &--desktop {
      display: none;
    }
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
      margin-right: 0;
    }

    &__mobileNavigation {
      display: none;
    }

    &__compareLink {
      &--mobile {
        display: none;
      }

      &--desktop {
        display: flex;
      }
    }
  }
}
</style>
