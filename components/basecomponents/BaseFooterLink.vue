<template>
  <a :target="newWindow ? '_blank' : ''" class="baseFooterLink" :href="href"
    ><slot></slot
  ></a>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    href: string;
    newWindow?: boolean;
  }>(),
  {
    newWindow: false,
  }
);
</script>

<style lang="less">
.baseFooterLink {
  color: @fun-green;
  font-weight: 700;
}

@media only screen and (min-width: @breakpoint__mobile) {
}
</style>
