<template>
  <div class="productListing">
    <slot name="metaInformation"></slot>
    <div class="productListing__breadcrumbs">
      <slot name="breadcrumbs"></slot>
    </div>
    <div class="productListing__top">
      <slot name="heading"></slot>
      <BaseButton
        :button-type="'secondary'"
        class="productListing__filterButton"
        @click="toggleFilter(true)"
        ><IconFilter />Visa filter</BaseButton
      >
      <slot name="headerInformation"></slot>
    </div>
    <div ref="el" class="productListing__main">
      <ProductListingFilter
        :toggle-manager="props.toggleManager"
        :filter-attributes="filterAttributes"
        class="productListing__filters"
        :class="{ 'productListing__filters--open': showFilter }"
        @close-filter="toggleFilter(false)"
      />
      <div class="productListing__wrapper">
        <ul class="productListing__products">
          <li
            v-for="(product, index) in props.products"
            :key="index"
            class="productListing__productWrapper"
          >
            <div class="productListing__product">
              <div class="productListing__imageContainer">
                <NuxtLink
                  :to="`/product/${product.id}-${generateSlug(product.name)}`"
                >
                  <img
                    alt="product image"
                    class="productListing__image"
                    :src="product.imageUrl"
                  />
                </NuxtLink>
              </div>
              <NuxtLink
                :to="`/product/${product.id}/${generateSlug(product.name)}`"
              >
                <h3 class="productListing__productHeader">
                  {{ product.name }}
                </h3>
              </NuxtLink>
              <div class="productListing__bottomRow">
                <span><strong>Art. nr: </strong>{{ product.sku }}</span>
                <BaseSVGButton @click="addProductCompare(product)"
                  ><IconCompare /> <span>Jämför</span></BaseSVGButton
                >
              </div>
            </div>
          </li>
          <div
            v-if="props.showMore"
            id="page-bottom"
            class="productListing__toolbarBottom"
          >
            <BaseButton :button-type="'secondary'" @click="emit('showMore')"
              >Visa fler</BaseButton
            >
          </div>
        </ul>
        <p v-if="props.products.length === 0" class="productListing__noResult">
          Inget sökresultat, test igen, eller något annat ord ...
        </p>
      </div>
    </div>
    <Teleport to="body">
      <BaseOverlay v-show="showFilter" />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { ProductData } from "@/types/ProductData";
import { useCompareStore } from "@/stores/CompareStore";
import { useAppInfoStore } from "@/stores/AppInfoStore";
const { addProductCompare } = useCompareStore();
const { generateSlug } = useSlug();
const appInfoStore = useAppInfoStore();
const { isMobile } = storeToRefs(appInfoStore);
const props = defineProps<{
  products: ProductData[];
  showMore: boolean;
  filterAttributes: any[];
  toggleManager: any;
}>();

const emit = defineEmits<{
  (event: "showMore"): void;
}>();

const showFilter = ref(false);

const toggleFilter = (value: boolean) => {
  showFilter.value = value;

  if (isMobile.value && value) {
    document.body.style.position = "fixed";
  } else if (isMobile.value && !value) {
    document.body.style.position = "";
  }
};
</script>

<style lang="less" scoped>
.productListing {
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  &__top {
    background-color: @color__background_secondary;
    padding: @indent__base 0;
    padding-top: @indent__m;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
  }

  &__filterButton {
    display: flex;
    align-items: center;
    margin-right: @indent__base;
    padding: @indent__xs @indent__sm;
    gap: @indent__s;
  }

  &__main {
    flex-basis: 100%;
    display: flex;
  }

  &__filters {
    min-width: 250px;
    transition: left ease-in 0.6s;
    left: -100%;

    &--open {
      left: 0;
    }
  }

  &__wrapper {
    width: 100%;
  }

  &__products {
    flex-grow: 1;
    align-items: stretch;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  &__productWrapper {
    flex-basis: 50%;
    height: 250px;
    margin-bottom: @indent__xs;
  }

  &__product {
    padding: @indent__base;
    border: 1px solid @color__border_primary;
    background-color: @color__background_secondary;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 250px;
    margin: 2px;
  }

  &__imageContainer {
    height: 100px;
  }

  &__image {
    max-height: 100%;
    max-width: 100%;
  }

  &__productHeader {
    margin-top: @indent__base;
    align-self: start;
  }

  &__bottomRow {
    margin-top: @indent__s;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  &__toolbarBottom {
    margin-top: @indent__m;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  &__noResult {
    text-align: center;
    margin: @indent__xxl;
  }
}

@media only screen and (min-width: @breakpoint__tablet) {
  .productListing {
    &__top {
      padding-top: @indent__xxl;
    }

    &__filterButton {
      margin-left: auto;
    }

    &__productWrapper {
      flex-basis: 33.33%;
    }
  }
}

@media only screen and (min-width: @breakpoint__tablet-landscape) {
  .productListing {
    &__productWrapper {
      flex-basis: 25%;
    }
  }
}
</style>
