<template>
  <header class="header">
    <div class="header__navigationWrapper">
      <div class="header__navigation">
        <div class="header__navigationTop">
          <NuxtLink class="header__navigationLogo" to="/"
            ><IconLmLogo /><span class="header__navigationLogoText">
              / Produktkatalogen</span
            ></NuxtLink
          >
          <TheSearch />
          <ClientOnly
            ><CompareLink
              v-show="compareCount > 0"
              class="header__compareLink header__compareLink--desktop"
          /></ClientOnly>
        </div>
        <div class="header__navigationBottom">
          <div id="mobile-toggle"></div>

          <ClientOnly
            ><CompareLink
              v-show="compareCount > 0"
              class="header__compareLink header__compareLink--mobile"
          /></ClientOnly>

          <ClientOnly>
            <TheCategoryMenuTop />
          </ClientOnly>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const compareStore = useCompareStore();
const { compareCount } = storeToRefs(compareStore);
</script>

<style lang="less">
.header {
  border-bottom: 1px solid @color__border_primary;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: @indent__base 0 @indent__s 0;
  background-color: @background__secondary;

  &__navigationWrapper {
    margin: 0 @indent__s;
    flex-basis: 100%;
  }

  &__navigation {
    width: 100%;
    margin: 0 auto;
  }

  &__navigationTop {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  &__navigationLogo {
    display: flex;
    align-items: center;
    text-decoration: none;
    margin-bottom: @indent__sm;
    margin-right: @indent__base;
  }

  &__navigationLogoText {
    font-size: 1.6rem;
    font-weight: 400;
    margin-left: @indent__base;
  }

  &__navigationBottom {
    padding: @indent__base 0 @indent__xs 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__compareLink {
    &--mobile {
      display: flex;
    }

    &--desktop {
      display: none;
    }
  }
}

@media only screen and (min-width: @breakpoint__mobile) {
  .header {
    &__navigationWrapper {
      margin: 0 @indent__m;
    }

    &__navigation {
      width: min(90%, @max-width-view);
    }

    &__navigationLogo {
      margin-bottom: 0;
      margin-right: 0;
    }

    &__compareLink {
      &--mobile {
        display: none;
      }

      &--desktop {
        display: flex;
      }
    }
  }
}
</style>
