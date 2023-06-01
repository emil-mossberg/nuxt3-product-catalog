<template>
  <div class="compareTable">
    <table v-if="compareCount" class="compareTable__table">
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
              :to="`/product/${compareProducts.sku[imageIndex]}-${generateSlug(
                compareProducts.name[imageIndex]
              )}`"
            >
              <img class="compareTable__image" :src="imageUrl" />
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
        <tr
          v-for="(attribute, attributeIndex) in compareProducts.tableData"
          :key="attributeIndex"
          :class="{
            'tr-header': isHeader(attribute.values),
          }"
        >
          <td>{{ attribute.label }}</td>
          <td v-for="(value, pIndex) in attribute.values" :key="pIndex">
            <span>{{ value }}</span>
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
import { storeToRefs } from "pinia";
import { useCompareStore } from "../stores/CompareStore";
const { compareProducts, removeProductCompare } = useCompareStore();
const compareStore = useCompareStore();
const { compareCount } = storeToRefs(compareStore);

const isHeader = (names: string[]) =>
  names.some((name) => name.toLowerCase() === "rubrik");

const { generateSlug } = useSlug();
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
    max-width: 200px;
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

    &.tr-header {
      font-weight: 500;

      td:not(:first-child) span {
        display: none;
      }
    }
  }

  td {
    padding: @indent__sm @indent__base;
  }
}
</style>
