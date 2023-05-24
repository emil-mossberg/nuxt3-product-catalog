import { describe, it, expect, beforeEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";

import BaseTextCard from "../components/basecomponents/BaseTextCard.vue";

describe("BaseTextCard", () => {
  let wrapper: VueWrapper;

  const header = "A funky header";
  const content = "Some information text";

  beforeEach(() => {
    wrapper = mount(BaseTextCard, {
      slots: {
        header,
        content,
      },
    });
  });

  it("is a Vue instance", () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it("Renders props properly", () => {
    expect(wrapper.find(".baseTextCard__header").text()).toEqual(header);
    expect(wrapper.find(".baseTextCard__content").text()).toEqual(content);
  });
});
