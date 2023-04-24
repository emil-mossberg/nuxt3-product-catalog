<template>
  <div ref="componentRef" class="categoryNavigation">
    <a
      class="categoryNavigation__link categoryNavigation__link--lvl0"
      :class="{ 'categoryNavigation__link--lvl0--open': showCategory0 }"
      @click="clickedCategory0"
      >{{ props.catalogData["name"] }}</a
    >
    <ul class="categoryNavigation__list categoryNavigation__list--lvl1">
      <li
        v-for="(category, index) in catalogData['children']"
        :key="index"
        class="categoryNavigation__listItem categoryNavigation__listItem--lvl1"
      >
        <NuxtLink
          class="categoryNavigation__link categoryNavigation__link--lvl1"
          :class="{
            'categoryNavigation__link--lvl1--open': index + 1 == showIndexLvl2,
          }"
          :to="`/category/${category['slug_name']}`"
          @click="clickedCategory1(index)"
        >
          {{ category["name"] }}
        </NuxtLink>

        <ul class="categoryNavigation__list categoryNavigation__list--lvl2">
          <h3>{{ category["name"] }}</h3>
          <li
            v-for="(category1, index1) in category['children']"
            :key="index1"
            class="categoryNavigation__listItem categoryNavigation__listItem--lvl2"
          >
            <NuxtLink
              class="categoryNavigation__link categoryNavigation__link--lvl2"
              :to="`/category/${category1['slug_name']}`"
              @click="clickedCategory2"
            >
              {{ category1["name"] }}
            </NuxtLink>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside, useWindowSize } from "@vueuse/core";
import { useAppInfoStore } from "@/stores/AppInfoStore";
const { toggleDarkOverlay } = useAppInfoStore();

const MOBILE_BREAPOINT = 480; // TO DO MOVE TO CONFIG
const isMobile = computed(() => useWindowSize().width.value < MOBILE_BREAPOINT);
// TO DO MOVE, type

const props = defineProps<{
  catalogData: { name: string; children: [] };
}>();

const showCategory0 = ref<boolean>(false);

const clickedCategory0 = () => {
  showCategory0.value = !showCategory0.value;
  if (showCategory0.value) {
    toggleDarkOverlay(true);
  } else {
    toggleDarkOverlay(false);
  }
};

const componentRef = ref();

onClickOutside(componentRef, () => {
  if (showCategory0.value) {
    toggleDarkOverlay(false);
  }
  showCategory0.value = false;
});

// TO DO not dry fix this also naming is off, close on desktop but keep going on mobile

const showIndexLvl2 = ref<number>(0);

const clickedCategory1 = (index: number) => {
  if (isMobile) {
    showIndexLvl2.value = index + 1;
  } else {
    showCategory0.value = false;
    toggleDarkOverlay(false);
  }
};

const clickedCategory2 = () => {
  if (isMobile) {
    showIndexLvl2.value = 0;
    showCategory0.value = false;
  } else {
    toggleDarkOverlay(false);
  }

  showCategory0.value = false;
};
</script>

<style lang="less">
.categoryNavigation {
  &__link {
    display: flex;
    justify-content: space-between;
    padding: @indent__base;
    color: @color__text_primary;

    &--lvl0:after,
    &--lvl1:after {
      content: "\203A";
      font-size: 20px;
    }
  }

  &__list {
    width: 100%;
    top: 0;
    height: 100vh;
    position: absolute;
    background-color: @new-and-funky;
    transition: left ease-in 0.4s;

    &--lvl1 {
      left: -100%;
    }

    &--lvl2 {
      left: -100%;
    }
  }

  &__link--lvl0--open + &__list--lvl1,
  &__link--lvl1--open + &__list--lvl1 {
    left: 0;
  }

  &__link--lvl1--open + &__list--lvl2 {
    left: 0;
  }
}
@media only screen and (min-width: 480px) {
  .categoryNavigation {
    position: relative;

    &__link {
      &--lvl0 {
        padding: 0;

        &::after {
          transform: rotate(90deg);
          transition: all 0.1s linear;
          margin-left: 12px;
          content: "\203A";
          font-size: 20px;
        }
        &--open {
          color: @color_link;
          &::after {
            transform: rotate(-90deg);
          }
        }
      }
    }

    &__link--lvl0--open + &__list--lvl1 {
      display: block;
    }

    &__list {
      width: 250px;
      position: absolute;
      height: 774px;
      top: 30px;

      &--lvl1 {
        left: auto;
        display: none;
      }

      &--lvl2 {
        display: none;
        left: 250px;
        top: 0px; // TO DO WHY DO I NEED THIS?
      }
    }

    &__listItem:hover > &__list {
      display: list-item;
    }

    &__listItem--lvl1:hover > &__link--lvl1,
    &__listItem--lvl2:hover > &__link--lvl2 {
      background-color: @background__tertiary;
      color: @color-white;
    }
  }
}
</style>

<!-- <h3 class="categoryNavigation__dropdownHeader">
  {{ props.catalogData["name"] }}
</h3>
<BaseButton
  class="categoryNavigation__mobileBackButton"
  :button-type="'primary'"
  @click="showCategory0 = false"
>
  Tillbaka till Produkter</BaseButton
> -->
