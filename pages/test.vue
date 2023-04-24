<template>
  <div>
    <li v-for="(data2, index) in data" :key="index">
      {{ data2.title }}
      {{ data2.description }}
    </li>
    <button @click="testSearchCategory">TEST</button>
    <div class="component"></div>

    <div class="component__container component__container--open">
      <button class="component__button" @click="clickMe">Click ME</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSearchStore } from "@/stores/SearchStore";
const { testSearchCategory } = useSearchStore();

type testType = {
  title: string;
  description: string;
};

// const someData = ref<any[]>([]);

// Client side
// const data = await $fetch("https://api.nuxtjs.dev/mountains");

const { data } = await useAsyncData<testType[]>("test", () => {
  return $fetch("https://api.nuxtjs.dev/mountains");
});

// console.log(data);

// const { data, pending, error, refresh } = await useAsyncData(
//   "mountains",
//   () => {
//     console.log("asdasd", process.server);
//     return $fetch("https://api.nuxtjs.dev/mountains");
//   }
// );

const clickMe = () => {
  console.log("clicked");
};
</script>

<style lang="less">
.component {
  &__container {
    background-color: antiquewhite;
  }

  &__button {
    background-color: blue;
  }

  &__container--open &__button {
    background-color: hotpink;
  }
}

// background-color: red;

// &--open &__button {

// }
</style>
