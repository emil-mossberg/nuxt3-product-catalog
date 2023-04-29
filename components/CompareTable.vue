<template>
  <div class="compareTable">
    <table v-if="showTable" class="compareTable__table">
      <tbody>
        <tr>
          <td></td>
          <td
            v-for="number in compareProducts.name.length"
            :key="number"
            class="compareTable__centerCell"
          >
            <BaseButton
              :button-type="'secondary'"
              class="compareTable__deleteButton"
              @click="removeProductCompare(number)"
              >Ta bort</BaseButton
            >
          </td>
        </tr>
        <tr>
          <td></td>
          <td
            v-for="(imageUrl, imageIndex) in compareProducts.imageUrl"
            :key="imageIndex"
            class="compareTable__centerCell"
          >
            <NuxtLink
              :to="`/product/${compareProducts.id[imageIndex]}-${generateSlug(
                compareProducts.name[imageIndex]
              )}`"
            >
              <img
                class="compareTable__image"
                :src="imageUrl.replace('needtochange', '')"
              />
            </NuxtLink>
          </td>
        </tr>
        <tr>
          <td>Namn</td>
          <td
            v-for="(name, nameIndex) in compareProducts.name"
            :key="nameIndex"
          >
            {{ name }}
          </td>
        </tr>
        <tr>
          <td>Artikelnummer</td>
          <td v-for="(sku, nameIndex) in compareProducts.sku" :key="nameIndex">
            {{ sku }}
          </td>
        </tr>
        <td>Produktbeskrivning</td>
        <td v-for="number in compareProducts.name.length" :key="number">
          Produktbeskrivning ska vara här
        </td>

        <tr
          v-for="(attribute, key, attributeIndex) in compareAttributes"
          :key="attributeIndex"
        >
          <td>{{ key }}</td>
          <td v-for="(productAttribute, pIndex) in attribute" :key="pIndex">
            {{ productAttribute }}
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>
      Sök eller gå till produkter och klicka på jämför för att lägga till
      produkter till jämförelse.
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { useCompareStore } from "@/stores/CompareStore";
const { compareProducts, compareAttributes, removeProductCompare } =
  useCompareStore();

const { generateSlug } = useSlug();

const showTable = computed(() => compareProducts.name.length > 0);
</script>

<style lang="less">
.compareTable {
  overflow: auto;

  &__table {
    border: 1px solid @background__primary;
    border-collapse: collapse;
  }

  &__centerCell {
    text-align: center;
  }

  &__image {
    max-width: 260px;
  }

  &__deleteButton {
    padding: @indent__xs @indent__s;
  }

  tr {
    &:nth-child(n + 5):nth-child(odd) {
      background-color: @color__form-background--light;
    }

    &:nth-child(n + 5):nth-child(even) {
      background-color: @background__primary;
    }
  }

  td {
    padding: @indent__sm @indent__base;
  }
}
</style>
