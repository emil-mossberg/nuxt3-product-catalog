<template>
  <li ref="componentRef" class="categoryNavigation">
    <button
      class="categoryNavigation__link categoryNavigation__link--lvl0"
      :class="{ 'categoryNavigation__link--lvl0--open': showCategory1 }"
      @click="clickedLink0"
    >
      {{ props.catalogData["name"] }}
      <DynamicIconChevron
        class="categoryNavigation__chevron categoryNavigation__chevron--desktop"
        :direction="showCategory1 ? 'up' : 'down'"
        :selected="showCategory1"
      />
      <DynamicIconChevron
        class="categoryNavigation__chevron categoryNavigation__chevron--mobile"
        :direction="'right'"
        :selected="showCategory1"
      />
    </button>
    <ul class="categoryNavigation__list categoryNavigation__list--lvl1">
      <div class="categoryNavigation__listHeader">
        <h3>{{ props.catalogData["name"] }}</h3>
        <NuxtLink
          class="categoryNavigation__showAll"
          :to="`/category/${props.catalogData['slug_name']}`"
          @click="clickedClosed"
          >Visa allt</NuxtLink
        >
        <BaseSVGButton @click="clickedClosed"><IconCross /></BaseSVGButton>
      </div>

      <li
        v-for="(category, key, index) in catalogData['children']"
        :key="index"
        class="categoryNavigation__listItem categoryNavigation__listItem--lvl1"
      >
        <NuxtLink
          class="categoryNavigation__link categoryNavigation__link--lvl1"
          :class="{
            'categoryNavigation__link--lvl1--open':
              index + 1 == showCategory2Index,
          }"
          @click="
            clickedLink1(index, (category as CategoryMenuLevel1)['slug_name'])
          "
        >
          {{ (category as CategoryMenuLevel2)["name"] }}
          <DynamicIconChevron :direction="'right'" />
        </NuxtLink>

        <ul class="categoryNavigation__list categoryNavigation__list--lvl2">
          <div class="categoryNavigation__listHeader">
            <h3>{{ (category as CategoryMenuLevel1)["name"] }}</h3>
            <NuxtLink
              :to="`/category/${(category as CategoryMenuLevel1)['slug_name']}`"
              class="categoryNavigation__showAll"
              @click="clickedClosed"
              >Visa allt</NuxtLink
            >

            <BaseSVGButton @click="clickedClosed"><IconCross /></BaseSVGButton>
          </div>

          <li
            v-for="(category1, index1) in category['children']"
            :key="index1"
            class="categoryNavigation__listItem categoryNavigation__listItem--lvl2"
          >
            <NuxtLink
              class="categoryNavigation__link categoryNavigation__link--lvl2"
              @click="clickedLink2(category1['slug_name'])"
            >
              {{ category1["name"] }}
              <!-- TO DO - Add none hardcoded condition here when have 3th lvl categories with child categories (lvl 4) -->
              <DynamicIconChevron v-if="true" :direction="'right'" />
            </NuxtLink>
            <ul class="categoryNavigation__list categoryNavigation__list--lvl3">
              <div class="categoryNavigation__listHeader">
                <h3>{{ category1["name"] }}</h3>
                <NuxtLink
                  :to="`/category/${category1['slug_name']}`"
                  class="categoryNavigation__showAll"
                  @click="clickedClosed"
                  >Visa allt</NuxtLink
                >

                <BaseSVGButton @click="clickedClosed"
                  ><IconCross
                /></BaseSVGButton>
              </div>
              <span>ADD lvl 3 links here</span>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </li>
  <Teleport to="body">
    <BaseOverlay v-show="showCategory1" />
  </Teleport>
</template>

<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import type {
  CategoryMenuLevel0,
  CategoryMenuLevel1,
  CategoryMenuLevel2,
} from "@/types/CategoryMenuLevels";
const { push } = useRouter();

const emit = defineEmits<{
  (event: "closeMenu"): void;
}>();

const appInfoStore = useAppInfoStore();
const { isMobile } = storeToRefs(appInfoStore);

const props = defineProps<{
  catalogData: CategoryMenuLevel0;
}>();

const showCategory1 = ref<boolean>(false);

const clickedLink0 = () => {
  showCategory1.value = !showCategory1.value;
};

const showCategory2Index = ref(0);

// TO DO can below 2 be DRY

// TO DO use this
// const showCategory3Index = ref(0);

const clickedLink1 = (index: number, slugName: string) => {
  if (isMobile.value) {
    showCategory2Index.value = index + 1;
  } else {
    push({ path: `/category/${slugName}` });
    showCategory1.value = false;
  }
};

const clickedLink2 = (slugName: string) => {
  // TO DO for mobile
  // - Pass children and index to this function (index: number, children: SomeArray, ) remember to flip children in first if so passes over
  // - If no children do as now
  // - Else show child categories on click

  if (isMobile.value) {
    emit("closeMenu");
    showCategory2Index.value = 0;
  }

  // if (isMobile.value && children.length) {
  //   // showCategory3Index.value = index;
  //   // This will be used to show it on mobile
  // }
  // TO DO this should be in if since it is for desktop
  push({ path: `/category/${slugName}` });
  showCategory1.value = false;
};

const clickedClosed = () => {
  emit("closeMenu");
  showCategory2Index.value = 0;
  showCategory1.value = false;
};

// Click outside logic
const componentRef = ref();

onClickOutside(componentRef, () => {
  showCategory1.value = false;
});
</script>

<style lang="less">
.categoryNavigation {
  &__link {
    display: flex;
    justify-content: space-between;
    padding: @indent__base;
    color: @color__text_primary;

    &--lvl0 {
      width: 100%;
      border: none;
      background-color: transparent;
      font-weight: 400;
    }
  }

  &__chevron--desktop {
    display: none;
  }

  &__list {
    width: 100%;
    top: 0;
    height: 100vh;
    position: absolute;
    background-color: @background_quaternary;
    transition: left ease-in 0.4s;

    &--lvl1 {
      left: -100%;
    }

    &--lvl2 {
      left: -100%;
    }

    &--lvl3 {
      left: -100%;
    }
  }

  &__listHeader {
    display: flex;
    align-items: center;
    padding: @indent__s;

    .svgButton {
      margin-left: auto;
    }
  }

  &__showAll {
    margin-left: @indent__s;
  }

  &__link--lvl0--open + &__list--lvl1,
  &__link--lvl1--open + &__list--lvl1 {
    left: 0;
  }

  &__link--lvl1--open + &__list--lvl2 {
    left: 0;
  }
}
@media only screen and (min-width: @breakpoint__mobile) {
  .categoryNavigation {
    position: relative;

    &__link {
      &--lvl0 {
        width: auto;
        padding: 0;
        margin-right: @indent__l;

        &--open {
          color: @color_link;
        }
      }
    }

    &__chevron {
      margin-left: @indent__sm;
      margin-top: @indent__xxs;

      &--desktop {
        display: block;
      }

      &--mobile {
        display: none;
      }
    }

    &__link--lvl0--open + &__list--lvl1 {
      display: block;
    }

    &__list {
      width: 250px;
      position: absolute;
      height: 774px;
      top: 35px;

      &--lvl1 {
        left: auto;
        display: none;
      }

      &--lvl2 {
        display: none;
        left: 250px;
        top: 0px; // TO DO WHY DO I NEED THIS?
      }

      &--lvl3 {
        display: none !important; // TO DO fix this
        left: 250px;
        top: 0px; // TO DO WHY DO I NEED THIS?
      }
    }

    &__listHeader {
      display: none;
    }

    &__listItem:hover > &__list {
      display: list-item;
    }

    &__listItem--lvl1:hover > &__link--lvl1,
    &__listItem--lvl2:hover > &__link--lvl2 {
      background-color: @background__tertiary;
      color: @color-white;
    }

    &__listItem--lvl3:hover > &__link--lvl3 {
      background-color: @background__tertiary;
      color: @color-white;
    }
  }
}
</style>
