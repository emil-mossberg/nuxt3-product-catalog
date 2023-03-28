<template>
  <header class="header">
    <div class="header__navigationWrapper">
      <div class="header__navigation">
        <NuxtLink class="header__navigationLogo" to="/"
          ><IconLmLogo /><span class="header__navigationLogoText">
            / Productkatalog</span
          ></NuxtLink
        >
        <CategoryMenu class="header__menu" />
        <AppSearch />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts"></script>

<style lang="less">
.header {
  border-bottom: 2px solid @color__border_primary;
  position: sticky;
  top: 0;
  z-index: 20;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: @indent__base 0 @indent__s 0;
  background-color: @background__secondary;

  &__navigationWrapper {
    flex-basis: 100%;
    margin: 0 @indent__m;
  }

  &__navigation {
    max-width: @max-width-view;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  &__navigationLogo {
    display: flex;
    align-items: center;
    text-decoration: none;
  }

  &__navigationLogoText {
    color: @color__text_secondary;
    font-size: 1.6rem;
    font-weight: 400;
    margin-left: @indent__base;
  }

  &__menu {
    margin: 0 @indent__base;
  }
}
</style>
