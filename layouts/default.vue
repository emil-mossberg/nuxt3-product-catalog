<template>
  <div class="defaultLayout">
    <AppHeader />
    <main class="defaultLayout__main">
      <SpinnerAndOverlay />
      <slot></slot>
    </main>

    <AppFooter />
  </div>
</template>

<style lang="less">
.defaultLayout {
  height: 100%;
  display: flex;
  flex-direction: column;

  &__main {
    display: flex;
    width: min(90%, 1440px);
    padding: @indent__m @indent__base 0 @indent__base;
    margin-inline: auto;
    flex-grow: 1;
    padding-top: @indent__m;
  }
}
</style>
