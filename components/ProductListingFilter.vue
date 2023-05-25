<template>
  <div class="filterOptions">
    <div class="filterOptions__top">
      <BaseButton
        class="filterOptions__closeButton"
        :button-type="'secondary'"
        @click="emit('closeFilter')"
        ><IconCross />Stäng filter</BaseButton
      >
    </div>

    <ul>
      <li
        v-for="(filterOption, index) in filterAttributes"
        :key="index"
        class="filterOptions__list"
      >
        <ul>
          <h4 class="filterOptions__listHeader">{{ filterOption.label }}</h4>
          <li
            v-for="(option, innerIndex) in filterOption.options"
            :key="innerIndex"
            class="filterOptions__listItem"
          >
            <BaseCheckbox
              :checked="option.selected"
              :label="option.name"
              @click="props.toggleManager(filterOption.key, option.name)"
            />
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  toggleManager: any;
  filterAttributes: any[];
}>();

const emit = defineEmits<{
  (event: "closeFilter"): void;
}>();
</script>

<style lang="less" scoped>
.filterOptions {
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 0;
  width: 100%;
  bottom: 0;
  background-color: @background_quaternary;
  z-index: 100;

  &__top {
    padding: @indent__base;
    border: 1px solid @color__border_primary;
  }

  &__closeButton {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0 auto;
  }

  &__listHeader {
    padding: @indent__base;
  }
}

@media only screen and (min-width: @breakpoint__mobile) {
  .filterOptions {
    top: 110px;
    width: auto;
  }
}
</style>
