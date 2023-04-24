<template>
  <div class="errorPage">
    <h1 class="errorPage__header">OOOOPSSS</h1>
    <div class="errorPage__text">
      Sidan finns inte! {{ error.statusMessage }}
    </div>
    <BaseButton :button-type="'primary'" @click="handleClearError"
      >Gå hem ...</BaseButton
    >
  </div>
</template>
<script setup>
defineProps(["error"]);

const handleClearError = () => {
  clearError({ redirect: "/" });
};
</script>
<style lang="less">
.defaultLayout {
  height: 100%;
  display: flex;
  flex-direction: column;

  &__main {
    display: flex;
    width: min(90%, 1440px);
    padding: 0 @indent__base;
    margin-inline: auto;
    flex-grow: 1;
  }
}

.errorPage {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  flex-direction: column;

  &__header {
    margin-bottom: @indent__m;
  }

  &__text {
    margin-bottom: @indent__m;
  }
}
</style>
