<template>
  <div class="baseFooterColumn">
    <div class="baseFooterColumn__columnHeader">
      <slot name="header"></slot>
    </div>
    <div class="baseFooterColumn__row"></div>
    <slot name="content"></slot>
  </div>
</template>

<style lang="less">
.baseFooterColumn {
  flex-basis: 100%;
  margin-bottom: @indent__m;
  &__header {
    margin: @indent__xs 0;
  }
}

@media only screen and (min-width: @breakpoint__mobile) {
  .baseFooterColumn {
    flex-basis: 33.33%;
    margin-bottom: 0;
  }
}
</style>
