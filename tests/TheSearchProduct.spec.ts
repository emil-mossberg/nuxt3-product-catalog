import { describe, test, expect, beforeEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";

import TheSearchProduct from "../components/TheSearchProduct.vue";

describe("TheSearchProduct", () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    const productData = {
      name: "test",
      description: "test",
      organic: 0,
      paragraphs: {},
      table: {},
      ean: [],
      imageUrl: "test",
      sku: "test",
      id: "test",
      category: "test",
      shortDescription: "test",
    };

    wrapper = mount(TheSearchProduct, {
      props: { productData },
    });
  });

  // TO DO test to add

  test("TheSearchProduct is a Vue instance", () => {
    expect(wrapper.vm).toBeTruthy();
  });

  test("WIP", () => {
    expect(wrapper.vm).toBeTruthy();
  });
});
