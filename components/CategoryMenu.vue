<template>
  <div ref="componentRef" class="categoryMenu">
    <UIButton
      class="categoryMenu__menuButton"
      :button-type="'primary'"
      @click="clickGlobalMenu(categoryTree['children'])"
      >{{ categoryTree["name"] }}</UIButton
    >

    <div v-if="showGlobalMenu" class="categoryMenu__dropdown">
      <ul
        class="categoryMenu__dropdownColumn categoryMenu__dropdownLvl0"
        :style="{
          height: elementHeight * 51 + 40 + 'px',
        }"
      >
        <li
          v-for="(category, index) in categoryTree['children']"
          :key="index"
          class="categoryMenu__listItem"
          @mouseenter="setHeight(category['children'], 1)"
          @mouseleave="resetHeight(1)"
        >
          <NuxtLink
            class="categoryMenu__link"
            :to="`/category/${category['slug_name']}`"
            :class="{
              'categoryMenu__link--activeParent':
                category['id'] == activeParent1[0],
              'categoryMenu__link--hasChildren': category['children'],
            }"
            @click="closeMenu"
            >{{ category["name"] }}</NuxtLink
          >
          <ul
            class="categoryMenu__dropdownColumn categoryMenu__dropdownLvl1"
            :style="{
              height: elementHeight * 51 + 40 + 'px',
            }"
            @mouseenter="enterColumn(category['id'], 0)"
            @mouseleave="leaveColumn(0)"
          >
            <h4 class="categoryMenu__lvlHeader">{{ category["name"] }}</h4>
            <li
              v-for="(category1, index1) in category['children']"
              :key="index1"
              class="categoryMenu__listItem"
              @mouseenter="setHeight(category1['children'], 2)"
              @mouseleave="resetHeight(2)"
            >
              <NuxtLink
                class="categoryMenu__link categoryMenu__link--hasChildren"
                :class="{
                  'categoryMenu__link--activeParent':
                    category1['id'] == activeParent1[1],
                  'categoryMenu__link--hasChildren': category1['children'],
                }"
                :to="`/category/${category1['slug_name']}`"
                @click="closeMenu"
                >{{ category1["name"] }}</NuxtLink
              >
              <ul
                class="categoryMenu__dropdownColumn categoryMenu__dropdownLvl2"
                :style="{
                  height: elementHeight * 51 + 40 + 'px',
                }"
                @mouseenter="enterColumn(category1['id'], 1)"
                @mouseleave="leaveColumn(1)"
              >
                <h4 class="categoryMenu__lvlHeader">{{ category1["name"] }}</h4>
                <li
                  v-for="(category2, index2) in category1['children']"
                  :key="index2"
                >
                  <NuxtLink
                    class="categoryMenu__link"
                    :to="`/category/${category2['slug_name']}`"
                    @click="closeMenu"
                    >{{ category2["name"] }}</NuxtLink
                  >
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import categoryTree from "@/data/categoryTree.json";
import { useAppInfoStore } from "@/stores/AppInfoStore";
const { toggleDarkOverlay } = useAppInfoStore();

const closeMenu = () => {
  showGlobalMenu.value = false;
  toggleDarkOverlay(false);
};

const elementCountColumn = ref<number[]>([]);

const clickGlobalMenu = (obj: {}) => {
  elementCountColumn.value[0] = Object.keys(obj).length;
  showGlobalMenu.value = !showGlobalMenu.value;
  toggleDarkOverlay(true);
};

const setHeight = (obj: {}, index: number) => {
  elementCountColumn.value[index] = Object.keys(obj).length + 1;
};

const resetHeight = (index: number) => {
  elementCountColumn.value[index] = 0;
};

const elementHeight = computed(() => {
  return Math.max(Math.max(...elementCountColumn.value), 0);
});

const showGlobalMenu = ref<boolean>(false);

const activeParent1 = ref(["", ""]); // TO DO type this

const componentRef = ref();

const enterColumn = (productId: string, index: number) => {
  activeParent1.value[index] = productId;
};

const leaveColumn = (index: number) => {
  activeParent1.value[index] = "";
};

onClickOutside(componentRef, () => {
  if (showGlobalMenu.value) {
    toggleDarkOverlay(false);
  }
  showGlobalMenu.value = false;
});
</script>

<style lang="less">
.categoryMenu {
  position: relative;

  &__menuButton {
    border-radius: 10px;
    width: 100%;
    margin: @indent__base 0;
  }

  &__dropdown {
    border-bottom: none;
    position: absolute;
    background-color: @background__secondary;
    z-index: 1;
    top: 48px;
  }

  &__link {
    display: flex;
    justify-content: space-between;
    padding: @indent__base;
    color: @color__text_primary;
    text-decoration: none;

    &--hasChildren:after {
      content: "\203A";
      font-size: 20px;
    }

    &:hover,
    &--activeParent {
      background-color: @background__tertiary;
      color: @color-white;
    }
  }

  &__listItem {
    border-bottom: 1px solid @color__border_primary;
  }

  &__dropdownColumn {
    width: 250px;
    background-color: @background__secondary;
    border: 1px solid @color__border_primary;
    border-bottom: none;
  }

  &__lvlHeader {
    height: 51px;
    padding: @indent__base;
    border-bottom: 1px solid @color__border_primary;
    color: @fun-green;
  }

  // TO DO generalize this

  &__dropdownLvl1 {
    display: none;
    right: -249px;
    top: 0;
    position: absolute;
  }

  &__dropdownLvl2 {
    display: none;
    right: -250px;
    top: -1px;
    position: absolute;
  }
}

// TO DO logic for display menu, can this be solved easier still with BEM?
.categoryMenu__listItem:hover > .categoryMenu__dropdownLvl1 {
  display: block;
}

.categoryMenu__listItem:hover > .categoryMenu__dropdownLvl2 {
  display: block;
}

@media only screen and (min-width: 991px) {
  .categoryMenu {
    position: relative;

    &__menuButton {
      border-radius: 10px;
    }
  }
}
</style>
