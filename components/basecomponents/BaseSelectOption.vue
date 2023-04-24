<template>
  <div class="uiSelectOption">
    <slot></slot>
  </div>
</template>

<style lang="less">
.uiSelectOption {
  padding-left: @indent__base;
  padding: @indent__sm @indent__base;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: @uiSelect__backgroundColor--hover;
  }
}
</style>
