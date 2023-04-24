<template>
  <div class="defaultLayout">
    <TheHeader />
    <main class="defaultLayout__main">
      <TheSpinnerAndOverlay />
      <TheMessages />
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

  &__main {
    display: flex;
    margin-top: 190px;
    width: 100%;
    padding: 0 @indent__s;
    margin-inline: auto;
    flex-grow: 1;
    flex-direction: column;
  }
}

@media only screen and (min-width: 991px) {
  // TO DO or 480px?
  .defaultLayout {
    &__main {
      margin-top: 160px; // Match header
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
