import { describe, it, expect, beforeEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";

import BreadCrumbs from "../components/BreadCrumbs.vue";

// TO DO
// Fix better version of check last crumb (should not be nuxtLink)
// Test for getting correct
// Test for checking that last is a span
describe("BreadCrumbs", () => {
  let wrapper: VueWrapper;

  const breadcrumbs = [
    { name: "test1", url: "url1" },
    { name: "test2", url: "url2" },
    { name: "test3", url: "url3" },
  ];

  beforeEach(() => {
    wrapper = mount(BreadCrumbs, { props: { breadcrumbs } });
  });

  it("is a Vue instance", () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it("Is breadcrumbs correct length", () => {
    expect(wrapper.findAll("li")).toHaveLength(breadcrumbs.length);
  });
});
