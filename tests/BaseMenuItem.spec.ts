import { describe, test, expect, beforeEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";

import BaseMenuItem from "../components/basecomponents/BaseMenuItem.vue";
import DynamicIconChevron from "../components/icons/DynamicIconChevron.vue";

describe("BaseMenuItem", () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(BaseMenuItem, {
      props: { hasChildren: false },
      global: {
        components: {
          DynamicIconChevron,
        },
      },
    });
  });

  test("Test is a Vue instance", () => {
    expect(wrapper.vm).toBeTruthy();
  });

  test("Test hide chevron", () => {
    expect(wrapper.findComponent(DynamicIconChevron).exists()).toBe(false);
  });

  test("Test show chevron", async () => {
    await wrapper.setProps({ hasChildren: true });
    expect(wrapper.findComponent(DynamicIconChevron).exists()).toBe(true);
  });

  test("Test clicking component link works", () => {
    wrapper.find("nuxtlink").trigger("click");

    expect(wrapper.emitted()).toHaveProperty("click");
  });
});
