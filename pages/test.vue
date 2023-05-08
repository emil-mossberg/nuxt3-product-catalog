<template>
  <div>
    <form>
      <input type="text" placeholder="enter" />
    </form>
    <li v-for="(data2, index) in data" :key="index">
      {{ data2.title }}
      {{ data2.description }}
    </li>
    <div class="component"></div>

    <div class="component__container component__container--open">
      <button class="component__button" @click="clickMe">Click ME</button>
    </div>
    <div><button @click="testKlevu">TestKlevy</button></div>
  </div>
</template>

<script setup lang="ts">
import { KlevuFetch, products } from "@klevu/core";

type testType = {
  title: string;
  description: string;
};

// const someData = ref<any[]>([]);
const testKlevu = async () => {
  const dataTest = await KlevuFetch(products(["300858"]));
  console.log(dataTest);
};
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

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

// fetch("https://jsonplaceholder.typicode.com/todos")
//   .then((response) => response.json())
//   .then((toDoListArray) => console.log(toDoListArray));

// function fetchToDo<T>(resourceUrl: string): Promise<T> {
//   return fetch(resourceUrl).then((response) => {
//     // fetching the reponse body data
//     return response.json<T>();
//   });
// }

async function fetchToDo2<T>(resourceUrl: string): Promise<T> {
  const response = await fetch(resourceUrl);
  return response.json();
}

const data2 = await fetchToDo2<Todo>(
  "https://jsonplaceholder.typicode.com/todos/2"
);

console.log(data2);

fetchToDo2<Todo>("https://jsonplaceholder.typicode.com/todos/2").then(
  (toDoItem) => {
    // assigning the response data `toDoItem` directly to `myNewToDo` variable which is
    // of Todo type
    const myNewToDo: Todo = toDoItem;
    // It is possible to access Todo object attributes easily
    console.log(
      "\n id: " +
        myNewToDo.id +
        "\n title: " +
        myNewToDo.title +
        "\n completed: " +
        myNewToDo.completed +
        "\n User Id: " +
        myNewToDo.userId
    );
  }
);

fetch("https://random-data-api.com/api/stripe/random_stripe?size=5")
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    console.log(res);
  });
</script>

<style lang="less">
input::placeholder {
  color: steelblue;
}
</style>
