<template>
  <div class="productListing">
    <div class="productListing__top">
      <slot name="heading"></slot><slot name="headerInformation"></slot>
    </div>
    <div class="productListing__main">
      <FilterOptions
        :toggle-manager="props.toggleManager"
        :filter-attributes="filterAttributes"
        class="productListing__filters"
      />
      <div class="productListing__wrapper">
        <ul class="productListing__products">
          <li
            v-for="(product, index) in props.products"
            :key="index"
            class="productListing__productWrapper"
          >
            {{ product.id }}
            <NuxtLink
              :to="`/product2/${product.id}/${generateSlug(product.name)}`"
            >
              <div class="productListing__product">
                <div class="productListing__imageContainer">
                  <img
                    alt="product image"
                    class="productListing__image"
                    :src="product.imageUrl"
                  />
                </div>
                <h3 class="productListing__productHeader">
                  {{ product.name }}
                </h3>
                <div class="productListing__bottomRow">
                  <span><strong>Art. nr: </strong>{{ product.sku }}</span>
                  <UISVGButton><IconCompare /> <span>Jämför</span></UISVGButton>
                </div>
              </div>
            </NuxtLink>
          </li>
          <div
            v-if="props.showMore"
            id="page-bottom"
            class="productListing__toolbarBottom"
          >
            <UIButton :button-type="'secondary'" @click="emit('showMore')"
              >Visa fler</UIButton
            >
          </div>
        </ul>
        <p v-if="props.products.length === 0" class="productListing__noResult">
          Inget sökresultat, test igen, eller något annat ord ...
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { useCompareStore } from "@/stores/CompareStore";
// const { addProductToCompare } = useCompareStore();
const { generateSlug } = useSlug();
const props = defineProps<{
  products: any[];
  showMore: boolean;
  filterAttributes: any[];
  toggleManager: any;
}>();

const emit = defineEmits<{
  (event: "showMore"): void;
}>();
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
    padding-top: @indent__xxl;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__main {
    flex-basis: 100%;
    display: flex;
  }

  &__filters {
    min-width: 250px;
    margin-right: 2px;
  }

  &__wrapper {
    width: 100%;
  }

  &__products {
    padding: 2px 2px @indent__xxl 2px;
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

    &:hover {
      border: 1px solid @color__border_primary;
      cursor: pointer;
    }
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

@media only screen and (min-width: 991px) {
  .productListing {
    &__productWrapper {
      flex-basis: 33.33%;
    }
  }
}

@media only screen and (min-width: 1200px) {
  .productListing {
    &__productWrapper {
      flex-basis: 25%;
    }
  }
}
</style>
