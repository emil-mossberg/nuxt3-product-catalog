<template>
  <div class="baseUiSelect">
    <slot></slot>
  </div>
</template>

<style lang="less">
@baseSelect__backgroundColor--hover: @color__form-background--light;

.baseUiSelect {
  padding-left: @indent__base;
  padding: @indent__sm @indent__base;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: @baseSelect__backgroundColor--hover;
  }
}
</style>
