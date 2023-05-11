import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import TestTodo from "../components/TestTodo.vue";

describe("creates a todo", () => {
  it("is a Vue instance", () => {
    const wrapper = mount(TestTodo);

    const todo = wrapper.get('[data-test="todo"]');

    expect(todo.text()).toBe("Learn Vue.js 3");
  });

  it("creates A TODO", async () => {
    const wrapper = mount(TestTodo);
    expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(1);

    await wrapper.get('[data-test="new-todo"]').setValue("New todo");
    await wrapper.get('[data-test="form"]').trigger("submit");

    expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(2);
  });

  it("Complete a TODO", async () => {
    const wrapper = mount(TestTodo);

    await wrapper.get('[data-test="todo-checkbox"]').setValue(true);

    expect(wrapper.get('[data-test="todo"]').classes()).toContain("completed");
  });
});
