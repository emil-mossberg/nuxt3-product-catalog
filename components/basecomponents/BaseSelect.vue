<template>
  <div class="uiSelect" tabindex="1" @blur="selectOpen = false">
    <div
      class="uiSelect__selected"
      :class="{ 'uiSelect__selected--open': selectOpen }"
      @click="selectOpen = !selectOpen"
    >
      {{ selected }}
    </div>
    <div
      class="uiSelect__items"
      :class="{ 'uiSelect__items--hide': !selectOpen }"
    >
      <slot
        v-for="option in options"
        class="test"
        name="options"
        :option="option"
        :select-option="selectOption"
      ></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
  options: any[];
}>();

const selectOption = (value: string, label: string) => {
  emit("update:modelValue", value);
  selected.value = label;
  selectOpen.value = false;
};

const emit = defineEmits<{
  (event: "update:modelValue", payload: string): void;
}>();

const selectOpen = ref(false);
const selected = ref(
  props.options.filter((option) => option.value === props.modelValue)[0].name
);
</script>

<style lang="less">
.uiSelect {
  position: relative;
  text-align: left;

  &__selected {
    background-color: @uiSelect__backgroundColor;
    border: 1px solid @uiSelect__borderColor;
    padding: @indent__sm @indent__xl @indent__sm @indent__base;
    cursor: pointer;
    user-select: none;

    &--open {
      border: 1px solid @uiSelect__borderColor--active;
    }

    &:after {
      position: absolute;
      content: "";
      top: 50%;
      right: @indent__base;
      transform: translate(0, -20%);
      width: 0;
      height: 0;
      border: 5px solid transparent;
      border-color: @uiSelect__chevronColor transparent transparent transparent;
    }
  }

  &__items {
    border-right: 1px solid @uiSelect__borderColor--active;
    border-left: 1px solid @uiSelect__borderColor--active;
    border-bottom: 1px solid @uiSelect__borderColor--active;
    position: absolute;
    background-color: @uiSelect__backgroundColor;
    left: 0;
    right: 0;

    &--hide {
      display: none;
    }
  }
}
</style>
