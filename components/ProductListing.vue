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
            <NuxtLink :to="`/product/${generateSlug(product.name)}`">
              <div class="productListing__product">
                <div class="productListing__imageContainer">
                  <img
                    class="productListing__image"
                    :src="cleanImageLink(product.imageUrl)"
                  />
                </div>
                <h3 class="productListing__productHeader">
                  {{ product.name }}
                </h3>
                <span class="productListing__skuInfo"
                  ><strong>Art. nr: </strong>{{ product.sku }}</span
                >
              </div>
            </NuxtLink>
          </li>
          <div v-if="props.showMore" class="productListing__toolbarBottom">
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
const { cleanImageLink } = useKlevu();
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
    border-bottom: 1px solid @color__border_primary;
    padding: @indent__base 0;
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
    border-right: 1px solid @color__border_primary;
    border-left: 1px solid @color__border_primary;
  }

  &__wrapper {
    border-right: 1px solid @color__border_primary;
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
    flex-basis: 25%;
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

  &__skuInfo {
    margin-top: @indent__s;
    align-self: start;
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
</style>
