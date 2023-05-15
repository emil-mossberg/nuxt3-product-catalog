<template>
  <svg
    class="iconChevron"
    :class="{
      'iconChevron--down': direction === 'down',
      'iconChevron--up': direction === 'up',
      'iconChevron--left': direction === 'left',
      'iconChevron--right': direction === 'right',
    }"
    width="10"
    height="16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M.84.253A.867.867 0 0 0 .837 1.48l6.501 6.527L.824 14.52a.867.867 0 1 0 1.226 1.226L9.176 8.62a.864.864 0 0 0 .001-1.225L2.065.255A.866.866 0 0 0 .84.253z"
      :fill="selected ? '#1E6E37' : '#575656'"
      fill-rule="evenodd"
    />
  </svg>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    direction: "up" | "down" | "left" | "right";
    selected?: boolean;
  }>(),
  {
    selected: false,
  }
);
</script>

<style lang="less">
.iconChevron {
  transition: all 0.1s linear;

  &--up {
    transform: rotate(-90deg);
  }

  &--down {
    transform: rotate(90deg);
  }

  &--left {
    transform: rotate(180deg);
  }

  &--right {
    // Default
  }
}
</style>
