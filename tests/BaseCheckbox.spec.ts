import { describe, test, expect, beforeEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";

import BaseCheckbox from "../components/basecomponents/BaseCheckbox.vue";

describe("BaseCheckbox", () => {
  let wrapper: VueWrapper;
  const labelText = "a label text ...";

  beforeEach(() => {
    wrapper = mount(BaseCheckbox, {
      props: { checked: false, label: labelText },
    });
  });

  test("BaseCheckbox is a Vue instance", () => {
    expect(wrapper.vm).toBeTruthy();
  });

  test("BaseCheckbox is not set if checked is false", () => {
    expect(wrapper.find('input[type="checkbox"]').element.checked).toBeFalsy();
  });

  test("BaseCheckbox is set if checked is true", async () => {
    await wrapper.setProps({ checked: true });

    expect(wrapper.find('input[type="checkbox"]').element.checked).toBeTruthy();
  });

  test("Clicked BaseCheckbox should emit clicked event", () => {
    wrapper.find('input[type="checkbox"]').trigger("click");

    expect(wrapper.emitted()).toHaveProperty("click");
  });

  test("BaseCheckbox should show props label as element label", () => {
    wrapper.find('input[type="checkbox"]').trigger("click");

    expect(wrapper.emitted()).toHaveProperty("click");
    expect(wrapper.find(".baseCheckbox__label").text()).toEqual(labelText);
  });
});
