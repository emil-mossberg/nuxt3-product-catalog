<template>
  <ul
    class="categoryMenuLvl0__navigationCategories"
    :class="{
      'categoryMenuLvl0__navigationCategories--open': showCategoryMenu,
    }"
  >
    <div class="categoryMenuLvl0__categoryNavMobile">
      <h3>Produkter</h3>
      <BaseSVGButton @click="toggleCategoryMenu(false)"
        ><IconCross class="categoryMenuLvl0__iconCross"
      /></BaseSVGButton>
    </div>
    <TheCategoryMenuSub
      v-for="(child, index) in categoryMenu.children"
      :key="index"
      :catalog-data="(child as CategoryMenuLevel1)"
      @close-menu="toggleCategoryMenu(false)"
    />
  </ul>

  <Teleport to="#mobile-toggle">
    <BaseSVGButton
      class="categoryMenuLvl0__mobileNavigation"
      @click="toggleCategoryMenu(true)"
      ><IconMobileMenu /></BaseSVGButton
  ></Teleport>
</template>

<script setup lang="ts">
import type { CategoryMenuLevel1 } from "@/types/CategoryMenuLevels";

const appInfoStore = useAppInfoStore();
const { categoryMenu } = useAppInfoStore();
const { isMobile } = storeToRefs(appInfoStore);

// categoryMenu.

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
.categoryMenuLvl0 {
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

  &__mobileNavigation {
    svg {
      height: 28px;
      width: 28px;
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
}

@media only screen and (min-width: @breakpoint__mobile) {
  .categoryMenuLvl0 {
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

    &__mobileNavigation {
      display: none;
    }
  }
}
</style>
