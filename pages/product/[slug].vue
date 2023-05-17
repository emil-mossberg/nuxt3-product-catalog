<template>
  <div class="productPage">
    <div id="slug-fix">
      {{ generateSlug(product?.name ?? "") }}
    </div>
    <Head
      ><Title>{{ product?.name }}</Title></Head
    >
    <Meta name="description" :content="product?.shortDescription" />
    <Meta property="og:type" content="product" />
    <Meta property="og:image:width" content="200" />
    <Meta property="og:image:height" content="200" />
    <Meta property="og:title" :content="product?.name" />
    <Meta
      property="og:image"
      :content="product?.imageUrl.replace('needtochange', '')"
    />
    <Meta
      property="og:description"
      :content="'Some information about product here'"
    />
    <div class="productPage__topContainer">
      <h1 class="productPage__name">
        {{ product?.name }}
      </h1>
      <div class="productPage__sku">
        {{ `SKU: ${product?.sku}` }}
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
          v-show="product?.imageUrl"
          class="productPage__image"
          alt="content image"
          :src="product?.imageUrl.replace('needtochange', '')"
        />
        <div class="productPage__generalInfo">
          <div class="productPage__infoRow">
            <span>Ekologisk: </span
            ><span>{{ product?.organic ? "JA" : "Nej" }}</span>
          </div>
          <div v-if="!!product?.ean.length" class="productPage__infoRow">
            <span>EAN: </span><span>{{ product?.ean.join(",") }}</span>
          </div>
        </div>
        <ul class="productPage__quotes">
          <li
            v-for="(
              paragraphValue, paragraphPropery, index
            ) in product?.paragraphs ?? []"
            :key="index"
            class="productPage__quotesItem"
          >
            <h4 class="productPage__sectionHeader">{{ paragraphPropery }}</h4>
            <!-- Below v-html is not used for user input content so it is ok to disable -->
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span v-html="paragraphValue"></span>
          </li>
        </ul>
        <div class="productPage__description">
          <h4 v-if="product?.description" class="productPage__sectionHeader">
            Detaljer
          </h4>
          <!-- Below v-html is not used for user input content so it is ok to disable -->
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-html="product?.description"></div>
        </div>

        <div class="productPage__CTA">
          <a
            class="linkAsButton"
            href="https://www.lantmannenlantbrukmaskin.se/om-oss/kontoansokan/"
            >Köp produkter - Bli Lantmännenkund</a
          >
        </div>
      </div>
      <div
        class="productPage__rightColumn"
        :class="{ 'productPage__rightColumn--show': Object.keys(product!.table).length !== 0  }"
      >
        <div class="productPage__tableContainer">
          <table class="productPage__table">
            <tbody>
              <tr
                v-for="(tableValue, tableProperty, index) in product!.table"
                :key="index"
                :class="{
                  'tr-header': checkIsHeader(tableValue),
                  'tr-empty': tableValue == '',
                }"
              >
                <td>
                  {{ tableProperty }}
                </td>
                <td v-if="!checkIsHeader(tableValue)">
                  {{ tableValue }}
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
const { cleanDataKlevu, checkIsHeader } = useKlevu();
const { addProductCompare } = useCompareStore();
const { generateSlug } = useSlug();

const route = useRoute();
const regex = /[0-9]+/g;
// TO DO deal with typing here, how to check for if it is wrong input
const numberMatches = (route.params.slug as string).match(regex) as string[];

// Fetch product data server side
const { data: product } = await useAsyncData(async () => {
  const data = await KlevuFetch(products([numberMatches[0]]));

  return data.queriesById("products")?.records.map(cleanDataKlevu)[0];
});
</script>

<style lang="less">
@table-attributes__min-width--desktop: 320px;

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

  &__generalInfo {
    flex-basis: 100%;
  }

  &__addToCompare {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: auto;
  }

  &__sku {
    font-size: 16px;
    font-weight: 500;
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

    &--show {
      flex-basis: 100%;
    }
  }

  &__image {
    max-width: 300px;
    height: 100%;
    margin-bottom: @indent__xxl;
  }

  &__quotes {
    margin: @indent__m 0;
  }

  &__quotesItem {
    margin-bottom: @indent__base;
  }

  &__infoRow {
    margin-bottom: @indent__s;
  }

  &__sectionHeader {
    margin-bottom: @indent__s;
  }

  &__description {
    flex-basis: 100%;

    p {
      margin-bottom: @indent__base;
    }

    ul {
      margin-left: @indent__xl;
    }

    li {
      margin-bottom: @indent__xs;
    }
  }

  &__CTA {
    margin: @indent__m 0;

    a {
      display: block;
      padding: @indent__base @indent__m;
      font-size: 16px;
    }
  }

  &__tableContainer {
    width: 100%;

    td {
      padding: @indent__s @indent__base;
    }

    .tr-header td {
      font-weight: 500;
    }

    .tr-empty {
      display: none;
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

    &__leftColumn {
      flex-basis: 60%;
    }

    &__rightColumn {
      &--show {
        flex-basis: 40%;
      }
    }

    &__quotes {
      flex-basis: 100%;
    }

    &__description {
      margin-right: @indent__m;
    }

    &__table {
      width: auto;
      margin-left: auto;
      min-width: @table-attributes__min-width--desktop;
    }

    &__tableContainer {
      width: auto;
    }

    &__image {
      max-width: 400px;
    }
  }
}
</style>
