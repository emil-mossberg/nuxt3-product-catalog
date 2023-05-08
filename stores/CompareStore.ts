import { reactive, computed } from "vue";
import type { ProductData } from "@/types/ProductData";
import type { CompareProducts } from "@/types/CompareProducts";

export const useCompareStore = defineStore("compareStore", () => {
  const { addMessage } = useAppInfoStore();

  const compareProducts: CompareProducts = reactive({});
  const numberProduct = ref(0);

  const compareAttributes = reactive<any>({});

  const compareCount = computed<number>(
    () => compareProducts.name?.length ?? 0
  );

  type Attributes = {
    label1: string;
    label2: string;
    label3: string;
    label4: string;
    label5: string;
    label6: string;
  };

  const dummyData = [
    {
      label1: "value",
      label2: "value",
      label3: "value",
    },
    {
      label2: "value",
      label4: "value",
      label5: "ASDSAD",
    },
    {
      label1: "value",
      label2: "value",
      label3: "value",
      label6: "value",
    },
  ];

  const addProductCompare = (data: ProductData) => {
    // If product is already in compare return
    if (compareProducts.id?.find((item: string) => item === data.id)) {
      addMessage("success", data.name);
      return;
    }

    // Adding product non-comparable attributes
    const keys = Object.keys(data);
    const values = Object.values(data);
    keys.forEach((key, index) => {
      compareProducts[key].push(values[index]);
    });

    // TEMP FOR TESTING
    const randomNum = Math.floor(Math.random() * 3);

    // TEMP DO A COPY OF DUMMY ATTRIBUTES USED
    const currentDummyAttributes = structuredClone(dummyData[randomNum]);

    // First step comparable attributes - check table data with new attribute
    Object.entries(compareAttributes).forEach((item) => {
      const label = item[0];

      if (currentDummyAttributes[label as keyof Attributes]) {
        compareAttributes[label].push(
          currentDummyAttributes[label as keyof Attributes]
        );
      } else {
        compareAttributes[label].push("-");
      }

      delete currentDummyAttributes[label as keyof Attributes];
    });

    // Second step comparable attributes - add not previously existing new
    // attributes to the table data
    Object.entries(currentDummyAttributes).forEach((item) => {
      const newAttributes = Array(numberProduct.value).fill("-");
      compareAttributes[item[0]] = [...newAttributes, item[1]];
    });

    localStorage.setItem("compare-products", JSON.stringify(compareProducts));
    numberProduct.value++;
    addMessage("success", data.name);
  };

  const addProductsCompare = (data: CompareProducts) => {
    Object.assign(compareProducts, data);
  };

  const removeProductCompare = (index: number) => {
    // Remove //roduct non-comparable attributes (has to exist in all products)
    for (const [key] of Object.entries(compareProducts)) {
      compareProducts[key].splice(index - 1, 1);
    }

    // Remove comparable and clean up out attributes if only set on deleted product
    for (const [key] of Object.entries(compareAttributes)) {
      compareAttributes[key].splice(index - 1, 1);
      if (compareAttributes[key].every((value: string) => value === "-")) {
        delete compareAttributes[key];
      }
    }

    // TO DO check attributes if it was the only one delete it now
    numberProduct.value--;
    localStorage.setItem("compare-products", JSON.stringify(compareProducts));
  };

  return {
    addProductCompare,
    addProductsCompare,
    removeProductCompare,
    compareProducts,
    compareAttributes,
    numberProduct,
    compareCount,
  };
});
