<template>
  <div>
    <li v-for="(data2, index) in data" :key="index">
      {{ data2.title }}
      {{ data2.description }}
    </li>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Catalog Demo - A Page",
  meta: [
    { name: "description", content: "Lantmännen site for catalog products." },
  ],
});

type testType = {
  title: string;
  description: string;
};

// const someData = ref<any[]>([]);

// Client side
// const data = await $fetch("https://api.nuxtjs.dev/mountains");

const { data } = await useAsyncData<testType[]>("test", () => {
  console.log("Is Server?", process.server);
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
</script>
