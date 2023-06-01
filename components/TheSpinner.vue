<template>
  <div v-if="isLoading" class="spinner">
    <div class="spinner__spinner">
      <div class="spinner__circle"></div>
      <div class="spinner__circle--delayed"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAppInfoStore } from "../stores/AppInfoStore";
const appInfoStore = useAppInfoStore();

const { isLoading } = storeToRefs(appInfoStore);
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
.spinner {
  position: fixed;
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
