import { describe, it, expect, beforeEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";

import BaseTextCard from "../components/basecomponents/BaseTextCard.vue";

describe("BaseTextCard", () => {
  let wrapper: VueWrapper;

  const header = "A funky header";
  const bodyText = "Some information text";

  beforeEach(() => {
    wrapper = mount(BaseTextCard, {
      props: {
        header,
        bodyText,
      },
    });
  });

  it("is a Vue instance", () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it("Renders props properly", () => {
    expect(wrapper.props().header).toEqual(header);
    expect(wrapper.props().bodyText).toEqual(bodyText);
  });
});
