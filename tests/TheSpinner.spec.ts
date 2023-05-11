import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { createTestingPinia, defineStore } from "@pinia/testing";
import TheSpinner from "../components/TheSpinner.vue";
import { useAppInfoStore } from "../stores/AppInfoStore";

describe("TheSpinner", () => {
  const wrapper = mount(TheSpinner, {
    global: {
      plugins: [createTestingPinia()],
    },
  });

  const store = useAppInfoStore();

  store.isLoading = true;

  it("is a Vue instance", () => {
    expect(wrapper.vm).toBeTruthy();
  });
});
