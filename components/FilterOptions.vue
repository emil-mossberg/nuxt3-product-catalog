<template>
  <div class="filterOptions">
    <li
      v-for="(filterOption, index) in filterAttributes"
      :key="index"
      class="filterOptions__list"
    >
      <div>
        <h4 class="filterOptions__listHeader">{{ filterOption.label }}</h4>
        <li
          v-for="(option, innerIndex) in filterOption.options"
          :key="innerIndex"
          class="filterOptions__listItem"
        >
          <UICheckbox
            :checked="option.selected"
            :label="option.name"
            @click="props.toggleManager(filterOption.key, option.name)"
          />
        </li>
      </div>
    </li>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  toggleManager: any;
  filterAttributes: any[];
}>();
</script>

<style lang="less" scoped>
.filterOptions {
  &__list {
    background-color: @color__background_secondary;
  }

  &__listHeader {
    padding: @indent__s @indent__base;
  }
}
</style>
