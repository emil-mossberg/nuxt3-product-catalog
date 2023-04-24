<template>
  <ul v-if="appMessages.length" class="appMessages">
    <li
      v-for="(message, index) in appMessages"
      :key="index"
      class="appMessages__message"
    >
      <IconInfo class="appMessages__info" />
      <p class="appMessages__text">
        <span>{{ `Du har lagt ${message.message} i ` }}</span>
        <NuxtLink to="/compare">Jämför produkter</NuxtLink>
      </p>
      <BaseSVGButton class="appMessages__cross" @click="removeMessage(index)"
        ><IconCrossCharcoal
      /></BaseSVGButton>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useAppInfoStore } from "@/stores/AppInfoStore";
const { appMessages, removeMessage } = useAppInfoStore();
</script>

<style lang="less">
.appMessages {
  max-width: @max-width-view;
  margin: 0 auto;
  width: 100%;

  &__message {
    border: 2px solid @color__border_message;
    border-radius: 4px;
    margin: @indent__xs 0;
    display: flex;
    align-items: center;
    padding: @indent__base;
    gap: 16px;
  }

  &__info {
    width: 32px;
    height: 32px;
  }

  &__cross {
    margin-left: auto;
  }
}

@media only screen and (min-width: 991px) {
  .appMessages {
  }
}
</style>
