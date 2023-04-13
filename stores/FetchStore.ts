import { defineStore } from "pinia";
import {
  KlevuFetch,
  products,
  FilterManager,
  listFilters,
  applyFilterWithManager,
} from "@klevu/core";
import type { ProductData } from "@/types/ProductData";
const { cleanImageUrl } = useKlevu();

export const useFetchStore = defineStore("fetchStore", () => {
  // Logic PDP

  const product = reactive<ProductData>({
    name: "",
    imageUrl: "",
    sku: "",
    id: "",
    category: "",
  });

  // TO DO fix any type
  const fetchProduct = async (productId: any) => {
    const productResultKlevu = await KlevuFetch(products([productId]));
    // // TO DO can this be set cleaner
    // console.log(productResultKlevu.queriesById("products")?.records[0]);
    product.name = productResultKlevu
      .queriesById("products")
      ?.records.map(cleanImageUrl)[0].name;

    product.imageUrl =
      productResultKlevu.queriesById("products")?.records[0].imageUrl ?? "";

    product.id =
      productResultKlevu.queriesById("products")?.records[0].id ?? "";

    product.sku =
      productResultKlevu.queriesById("products")?.records[0].sku ?? "";
    product.category =
      productResultKlevu.queriesById("products")?.records[0].category ?? "";
  };

  const clearProduct = () => {
    product.name = "";
    product.imageUrl = "";
    product.sku = "";
    product.category = "";
  };

  // Logic PLP

  const PLPResult = reactive<any>({
    products: [],
    filterOptions: [],
    showMore: false,
    productIds: [],
    endIndex: 0,
    startIndex: 0,
    sortDirection: "asc",
    categoryFilter: [],
  });

  const manager = new FilterManager();

  const clearFetchedPLPResult = () => {
    PLPResult.products = [];
    PLPResult.filterOptions = [];
    PLPResult.showMore = false;
    PLPResult.productIds = [];
    PLPResult.endIndex = 0;
    PLPResult.startIndex = 0;
    PLPResult.sortDirection = "asc";
    PLPResult.categoryFilter = [];
  };

  // TO DO implement filters, not sure I need it filterManager if I do it myself
  const fetchPLPResult = async () => {
    //
    const PAGE_SIZE = 6;

    PLPResult.endIndex = PLPResult.endIndex + PAGE_SIZE;

    const productResultKlevu = await KlevuFetch(
      products(
        PLPResult.productIds.slice(PLPResult.startIndex, PLPResult.endIndex),
        listFilters({
          include: ["category"],
          rangeFilterSettings: [
            {
              key: "klevu_price",
              minMax: true,
            },
          ],
          filterManager: manager,
        }),
        applyFilterWithManager(manager)
      )
    );

    PLPResult.filterOptions = manager.options;
    PLPResult.products = [
      ...PLPResult.products,
      ...(productResultKlevu
        .queriesById("products")
        ?.records.map(cleanImageUrl) ?? []),
    ];
    PLPResult.showMore = PLPResult.productIds.length > PLPResult.endIndex;
    PLPResult.startIndex = PLPResult.endIndex;
  };

  const sortedData = computed( () => {
    const direction = PLPResult.sortDirection === "asc" ? 1 : -1;
    return PLPResult.products.slice().sort(function (a: any, b: any) {
      return a.name > b.name ? direction : -direction;
    });
  });

  return {
    product,
    PLPResult,
    sortedData,
    fetchProduct,
    clearProduct,
    fetchPLPResult,
    clearFetchedPLPResult,
  };
});
