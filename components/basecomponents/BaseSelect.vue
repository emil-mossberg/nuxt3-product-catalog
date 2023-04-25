<template>
  <div class="baseSelect" tabindex="1" @blur="selectOpen = false">
    <div
      class="baseSelect__selected"
      :class="{ 'baseSelect__selected--open': selectOpen }"
      @click="selectOpen = !selectOpen"
    >
      {{ selected }}
    </div>
    <div
      class="baseSelect__items"
      :class="{ 'baseSelect__items--hide': !selectOpen }"
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
@baseSelect__backgroundColor: @background__secondary;
@baseSelect__backgroundColor--hover: @color__form-background--light;
@baseSelect__borderColor: @color__border_primary;
@baseSelect__borderColor--active: @dustygray;
@baseSelect__chevronColor: @scorpion;

.baseSelect {
  position: relative;
  text-align: left;

  &__selected {
    background-color: @baseSelect__backgroundColor;
    border: 1px solid @baseSelect__borderColor;
    padding: @indent__sm @indent__xl @indent__sm @indent__base;
    cursor: pointer;
    user-select: none;

    &--open {
      border: 1px solid @baseSelect__borderColor--active;
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
      border-color: @baseSelect__chevronColor transparent transparent
        transparent;
    }
  }

  &__items {
    border-right: 1px solid @baseSelect__borderColor--active;
    border-left: 1px solid @baseSelect__borderColor--active;
    border-bottom: 1px solid @baseSelect__borderColor--active;
    position: absolute;
    background-color: @baseSelect__backgroundColor;
    left: 0;
    right: 0;

    &--hide {
      display: none;
    }
  }
}
</style>
