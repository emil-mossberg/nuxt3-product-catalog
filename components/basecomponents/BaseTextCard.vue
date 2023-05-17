<template>
  <div class="baseTextCard">
    <h1 class="baseTextCard__header">
      <slot name="header"></slot>
    </h1>

    <div>
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style lang="less">
@baseTextCard__header--color: @color__active_primary;
@baseTextCard--backgroundColor: @background_quaternary;

.baseTextCard {
  background-color: @baseTextCard--backgroundColor;
  padding: @indent__xl;

  p {
    font-size: 20px;
    line-height: 30px;
    margin-bottom: @indent__m;
  }

  &__header {
    color: @baseTextCard__header--color;
    line-height: 60px;
  }
}
</style>
