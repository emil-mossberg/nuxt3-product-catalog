<template>
  <div class="productPage">
    <div id="slug-fix">
      {{ generateSlug(product!.name) }}
    </div>
    <Head
      ><Title>{{ product!.name }}</Title></Head
    >
    <Meta name="description" :content="'Some information about product here'" />
    <div class="productPage__topContainer">
      <h1 class="productPage__name">
        {{ product!.name }}
      </h1>
      <div class="productPage__sku">
        {{ `SKU: ${product!.sku}` }}
      </div>
      <BaseButton
        class="productPage__addToCompare"
        :button-type="'primary'"
        @click="addProductCompare(product!)"
        ><IconCompare />Lägg till i jämför</BaseButton
      >
    </div>
    <div class="productPage__container">
      <div class="productPage__leftColumn">
        <img
          v-show="product!.imageUrl"
          class="productPage__image"
          alt="content image"
          :src="product!.imageUrl.replace('needtochange', '')"
        />
        <ul class="productPage__quotes">
          <li
            v-for="(paragraph, index) in dummyDataPDP.paragraphs"
            :key="index"
            class="productPage__quotesItem"
          >
            <h4 class="productPage__quotesHeader">{{ paragraph.title }}</h4>
            <!-- Below v-html is not used for user input content so it is ok to disable -->
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span v-html="paragraph.body"></span>
          </li>
        </ul>
        <div class="productPage__CTA">
          <a
            class="linkAsButton"
            href="https://www.lantmannenlantbrukmaskin.se/om-oss/kontoansokan/"
            >Köp produkter - Bli Lantmännenkund</a
          >
        </div>
      </div>
      <div class="productPage__rightColumn">
        <div class="productPage__tableContainer">
          <table class="productPage__table">
            <tbody>
              <tr
                v-for="(attribute, index) in dummyDataPDP.table"
                :key="index"
                :class="{ 'tr-header': index === 0 }"
              >
                <td>
                  {{ attribute.name }}
                </td>
                <td>
                  {{ attribute.value }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { KlevuFetch, products } from "@klevu/core";
import type { ProductData } from "@/types/ProductData";
// TO DO remove - temp solution to develop this design elements
import dummyDataPDP from "@/data/dummyDataPDP.json";
const { cleanDataKlevu } = useKlevu();
const { addProductCompare } = useCompareStore();
const { generateSlug } = useSlug();

const route = useRoute();
const regex = /[0-9]+/g;
const numberMatches = (route.params.slugs as string).match(regex);

// Fetch product data server side
const { data: product } = await useAsyncData(async () => {
  const data = await KlevuFetch(products([numberMatches![0]]));

  return data
    .queriesById("products")!
    .records.map(cleanDataKlevu)[0] as ProductData;
});
</script>

<style lang="less">
@table-attributes__min-width--desktop: 500px;

.productPage {
  // Temp fix to get SSR data to transfer to FE
  #slug-fix {
    position: absolute;
    left: -1000px;
  }

  &__topContainer {
    margin-top: @indent__m;
    padding: @indent__xxl @indent__base;
    background-color: @background_quaternary;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  &__name {
    color: @fun-green;
    padding-bottom: @indent__m;
    flex-basis: 100%;
  }

  &__addToCompare {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: auto;
  }

  &__container {
    margin-top: @indent__xxl;
    align-items: flex-start;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  &__leftColumn {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  &__rightColumn {
    width: 100%;
  }

  &__image {
    max-width: 400px;
    height: 100%;
    margin-bottom: @indent__xxl;
  }

  &__quotes {
    margin: @indent__m 0;
  }

  &__quotesItem {
    margin-bottom: @indent__base;
  }

  &__quotesHeader {
    margin-bottom: @indent__s;
  }

  &__CTA {
    margin-bottom: @indent__m;

    a {
      display: block;
      padding: @indent__base @indent__m;
      font-size: 16px;
    }
  }

  &__tableContainer {
    width: 100%;

    td {
      padding: @indent__base;
    }

    .tr-header td {
      font-weight: 500;
    }
  }

  &__table {
    width: 100%;
    background-color: @background_quaternary;
  }
}

@media only screen and (min-width: @breakpoint__mobile) {
  .productPage {
    &__topContainer {
      padding: @indent__xxl @indent__m;
    }

    &__container {
      flex-wrap: nowrap;
    }

    &__rightColumn {
      width: auto;
    }

    &__quotes {
      flex-basis: 100%;
    }

    &__CTA {
      margin-top: @indent__m;
    }

    &__table {
      width: auto;
      margin-left: auto;
      min-width: @table-attributes__min-width--desktop;
    }

    &__tableContainer {
      width: auto;
    }
  }
}
</style>
