import { describe, expect, beforeEach, test } from "vitest";
import { mount, flushPromises, VueWrapper } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import TheSpinner from "../components/TheSpinner.vue";
import { useAppInfoStore } from "../stores/AppInfoStore";

describe("TheSpinner", () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(TheSpinner, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
  });

  test("TheSpinner is a Vue instance", () => {
    expect(wrapper.vm).toBeTruthy();
  });

  test("TheSpinner is not rendered", () => {
    expect(wrapper.find(".spinner").exists()).toBe(false);
  });

  test("TheSpinner is rendered", async () => {
    const appInfoStore = useAppInfoStore();
    appInfoStore.isLoading = true;
    await flushPromises();

    expect(wrapper.find(".spinner").exists()).toBe(true);
  });
});
