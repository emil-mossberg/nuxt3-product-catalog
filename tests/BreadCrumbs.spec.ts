import { describe, it, expect, beforeEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";

import BreadCrumbs from "../components/BreadCrumbs.vue";

// TO DO
// Fix better version of check last crumb (should not be nuxtLink)
// Test for getting correct
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

  // TO DO fix so checking that last li contains no a but a span
  it("Check last crumb", () => {
    // Only one Crumb
    expect(wrapper.findAll('[data-test="last-crumb"]').length).toBe(1);
  });
});
