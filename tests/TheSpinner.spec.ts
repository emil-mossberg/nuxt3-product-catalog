import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import TheSpinner from "../components/TheSpinner.vue";
import { useAppInfoStore } from "../stores/AppInfoStore";

describe("TheSpinner", () => {
  const wrapper = mount(TheSpinner, {
    global: {
      plugins: [createTestingPinia()],
    },
  });

  const appInfoStore = useAppInfoStore();

  it("AppInfoStore to exist", () => {
    expect(appInfoStore).toBeDefined();
  });

  it("The Spinner too not show by default", () => {
    expect(wrapper.find(".spinner").isVisible()).toBe(false);
  });

  it("The Spinner too not show by default", () => {
    // TO DO fix this should only need one
    appInfoStore.isLoading = true;
    appInfoStore.$patch({ isLoading: true });

    expect(wrapper.find(".spinner").isVisible()).toBe(true);
  });

  it("is a Vue instance", () => {
    expect(wrapper.vm).toBeTruthy();
  });
});
