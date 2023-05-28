import { describe, test, expect, beforeEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";

import BaseButton from "../components/basecomponents/BaseButton.vue";

describe("BaseButton", () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    // TO DO fix typing here

    wrapper = mount(BaseButton, {
      props: { buttonType: "secondary", disabled: false },
    });
  });

  test("BaseButton is a Vue instance", () => {
    expect(wrapper.vm).toBeTruthy();
  });

  test("BaseButton is clickable", () => {
    wrapper.find(".button").trigger("click");

    expect(wrapper.emitted()).toHaveProperty("click");
  });

  test("BaseButton is not clickable if disabled props is passed with false", () => {
    wrapper.setProps({ disabled: true });
    wrapper.find(".button").trigger("click");

    expect(wrapper.emitted()).toHaveProperty("click");
  });

  test("BaseButton has correct class setting the button type", async () => {
    await wrapper.setProps({ buttonType: "primary" });

    expect(wrapper.classes()).toContain("button--primary");
  });
});
