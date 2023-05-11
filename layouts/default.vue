<template>
  <div class="defaultLayout">
    <div class="defaultLayout__fixedTop">
      <TheHeader />
      <TheMessages />
    </div>

    <main class="defaultLayout__main">
      <TheSpinner />

      <div class="defaultLayout__content">
        <slot></slot>
      </div>
    </main>

    <TheFooter />
  </div>
</template>

<style lang="less">
.defaultLayout {
  height: 100%;
  display: flex;
  flex-direction: column;

  &__fixedTop {
    width: 100%;
    position: fixed;
    z-index: 100;
    top: 0;
  }

  &__main {
    display: flex;
    margin-top: 240px;
    width: 100%;
    padding: 0 @indent__s;
    margin-inline: auto;
    flex-grow: 1;
    flex-direction: column;
  }
}

@media only screen and (min-width: @breakpoint__mobile) {
  .defaultLayout {
    &__main {
      margin-top: 180px; // Match header + message
      width: min(90%, 1440px);
      margin-bottom: @indent__xxl;
      padding: 0 @indent__base;

      .page {
        // Set this class on each pages
        width: 100%;
      }
    }
  }
}
</style>
