<template>
  <button
    class="button"
    :disabled="props.disabled"
    :class="`button--${buttonType}`"
    @click="emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    buttonType: "primary" | "secondary";
  }>(),
  {
    disabled: false,
  }
);

const emit = defineEmits<{
  (event: "click"): void;
}>();
</script>

<style lang="less">
.button {
  border-radius: 10px;
  transition: all 0.1s linear;
  font-weight: 400;
  padding: @indent__s @indent__m;
  border: 2px solid @color__button_border;
  cursor: pointer;

  &:disabled {
    cursor: default;
    opacity: 0.6;
  }

  &--primary {
    background-color: @background__tertiary;
    color: @color-white;
    font-weight: 700;

    &:hover {
      background-color: @color_button_primary--hover;
    }
  }

  &--secondary {
    background-color: @background__secondary;
    color: @color_button_secondary;

    &:hover {
      background-color: @background__tertiary;
      color: @color-white;
    }
  }
}
</style>
