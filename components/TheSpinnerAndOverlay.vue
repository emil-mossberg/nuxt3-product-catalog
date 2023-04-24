<template>
  <div
    v-show="showDarkOverlay || isLoading"
    class="spinnerAndOverlay"
    :style="{ height: overlayHeight + 'px' }"
  >
    <div v-show="isLoading" class="spinnerAndOverlay__spinner">
      <div class="spinnerAndOverlay__circle"></div>
      <div class="spinnerAndOverlay__circle--delayed"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useAppInfoStore } from "@/stores/AppInfoStore";
const appInfoStore = useAppInfoStore();
const { showDarkOverlay, isLoading } = storeToRefs(appInfoStore);

const overlayHeight = ref(0);

watch([showDarkOverlay, isLoading], ([first, second]) => {
  overlayHeight.value =
    first || second ? document.documentElement.scrollHeight : 0;
});
</script>

<style lang="less">
// Animation spinner

@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  4.9% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  5% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}

// Styling
@overlay-spinner_size: 80px;
.spinnerAndOverlay {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  inset: 0;
  z-index: 10;
  justify-content: center;
  align-items: center;

  &__spinner {
    position: relative;
    width: @overlay-spinner_size;
    height: @overlay-spinner_size;
  }

  &__circle {
    position: absolute;
    border: 4px solid rgba(30, 110, 55, 1); // fun green
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;

    &--delayed {
      animation-delay: -0.5s;
    }
  }
}
</style>
