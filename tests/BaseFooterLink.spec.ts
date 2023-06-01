import { describe, test, expect, beforeEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";

import BaseFooterLink from "../components/basecomponents/BaseFooterLink.vue";

describe("BaseFooterLink", () => {
  let wrapper: VueWrapper;

  const href = "https://wwww.lantmannen.com";
  const target = "_";
  const defaultSlotText = "Lantmannen";

  beforeEach(() => {
    wrapper = mount(BaseFooterLink, {
      props: { href, target },
      slots: {
        default: defaultSlotText,
      },
    });
  });

  test("Test is a Vue instance", () => {
    expect(wrapper.vm).toBeTruthy();
  });

  test("Test link is clickable", () => {
    wrapper.find("a").trigger("click");
    expect(wrapper.emitted()).toHaveProperty("click");
  });

  test("Test props is set as href attribute", () => {
    expect(wrapper.find("a").attributes().href).toBe(href);
  });

  test("Test props is set as target attribute", () => {
    expect(wrapper.find("a").attributes().target).toBe(target);
  });

  test("Test components default slot is rendered", () => {
    expect(wrapper.find("a").text()).toBe(defaultSlotText);
  });
});
