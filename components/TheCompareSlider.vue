<template>
  <div
    class="theCompareSlider"
    :class="{
      'theCompareSlider--show': showCompareSlider,
    }"
  >
    <div class="theCompareSlider__content">
      <ul class="theCompareSlider__products">
        <li
          v-for="(product, index) in compareProductsList"
          :key="index"
          class="theCompareSlider__product"
          :class="{
            'theCompareSlider__product--new': newAddedProducts.skus.find(
              (sku) => sku === product.sku
            ),
          }"
        >
          <span
            class="theCompareSlider__newBadge"
            :class="{
              'theCompareSlider__newBadge--show': newAddedProducts.skus.find(
                (sku) => sku === product.sku
              ),
            }"
            >Ny tillagd</span
          >
          <img class="theCompareSlider__image" :src="product.imageUrl" />
          <div>
            <h5>{{ product.name }}</h5>

            <div>{{ product.sku }}</div>
          </div>
          <IconCross
            class="theCompareSlider__cross"
            @click="removeProductCompare(index + 1)"
          />
        </li>
      </ul>
      <div class="theCompareSlider__linkContainer">
        <NuxtLink
          class="theCompareSlider__link linkAsButton"
          to="/compare"
          @click="closeCompareSlider"
          ><IconCompare />{{ `Gå till jämför produkter` }}</NuxtLink
        >
      </div>
      <span class="theCompareSlider__closeSlider" @click="closeCompareSlider"
        >Stäng</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
const {
  compareProductsList,
  removeProductCompare,
  closeCompareSlider,
  newAddedProducts,
} = useCompareStore();

const compareStore = useCompareStore();
const { showCompareSlider } = storeToRefs(compareStore);
</script>

<style lang="less">
.theCompareSlider {
  border-top: 1px solid @color__border_primary;
  padding: @indent__s 0;
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: @background__secondary;
  transition: 1s;
  transform: translate(0, 100%);

  &--show {
    transform: translate(0, 0);
  }

  &__content {
    width: min(90%, @max-width-view);
    margin: 0 auto;
    margin-top: @indent__m;
    display: flex;
    flex-wrap: wrap;
    position: relative;
  }

  &__products {
    display: flex;
    overflow: auto;
  }

  &__product {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: @indent__s @indent__s;
    padding: @indent__s;
    border: 1px solid @color__border_primary;
    width: 200px;
    min-width: 120px;

    &--new {
      border-color: @color__border_secondary;
    }
  }

  &__newBadge {
    position: absolute;
    left: -4px;
    top: -10px;
    background-color: @color__active_primary;
    padding: @indent__xs @indent__sm;
    color: @color-white;
    border-radius: 20px;
    display: none;

    &--show {
      display: block;
    }
  }

  &__cross {
    position: absolute;
    top: 8px;
    right: 8px;
  }

  &__image {
    width: 40px;
    margin-bottom: @indent__s;
  }

  &__linkContainer {
    margin: @indent__s 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }

  &__closeSlider {
    position: absolute;
    right: -16px;
    top: -28px;
    color: @color_link;
  }
}

@media only screen and (min-width: @breakpoint__mobile) {
  .theCompareSlider {
    &__content {
      flex-wrap: nowrap;
      margin-top: 0;
      height: 140px;
    }

    &__products {
      overflow: auto;
    }

    &__linkContainer {
      margin-left: auto;
      min-width: 300px;
      width: auto;
    }

    &__closeSlider {
      right: 0px;
      top: 0px;
    }
  }
}
</style>