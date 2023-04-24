<template>
  <li class="searchProduct">
    <NuxtLink
      class="searchProduct__link dark"
      :to="`/product/${props.productData.id}/${generateSlug(
        props.productData.name
      )}`"
      ><div class="searchProduct__imageWrapper">
        <img
          class="searchProduct__image"
          alt="content image"
          :src="props.productData.imageUrl"
        />
      </div>
      <div class="searchProduct__information">
        <div class="searchProduct__name">
          {{ props.productData.name }}
        </div>
        <div class="searchProduct__sku">
          {{ props.productData.sku }}
        </div>
      </div>
    </NuxtLink>
  </li>
</template>

<script setup lang="ts">
import type { ProductData } from "@/types/ProductData";
const { generateSlug } = useSlug();

const props = defineProps<{
  productData: ProductData;
}>();
</script>

<style lang="less">
@image_size: 48px;

.searchProduct {
  margin-bottom: @indent__base;
  padding-top: @indent__base;
  border-top: 1px solid @color__border_primary;

  &:hover {
    cursor: pointer;
  }

  &__link {
    display: flex;
    text-decoration: none;
  }

  &__imageWrapper {
    height: @image_size;
    width: @image_size;
  }

  &__image {
    max-width: 100%;
    max-height: 100%;
  }

  &__information {
    margin-left: @indent__base;
  }

  &__name {
    text-transform: uppercase;
    font-weight: 700;
  }
}
</style>
