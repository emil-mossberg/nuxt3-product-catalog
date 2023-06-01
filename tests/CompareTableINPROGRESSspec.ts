import { describe, test, expect, beforeEach } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import { mount, VueWrapper } from "@vue/test-utils";
import { useCompareStore } from "../stores/CompareStore";

import CompareTable from "../components/CompareTable.vue";

describe("CompareTable", () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    // TO DO fix typing here

    wrapper = mount(CompareTable, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
  });

  test("CompareTable is a Vue instance", () => {
    expect(wrapper.vm).toBeFalsy();
  });
});
