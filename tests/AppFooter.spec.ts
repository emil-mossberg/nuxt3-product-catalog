import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import Footer from "../components/TheFooter.vue";

// TO DO add tests here, more than instance check

describe("Footer", () => {
  it("is a Vue instance", () => {
    const wrapper = mount(Footer);
    expect(wrapper.vm).toBeTruthy();
  });
});
