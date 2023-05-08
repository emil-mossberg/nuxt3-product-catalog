import type { ProductData } from "@/types/ProductData";

export const useKlevu = () => {
  const cleanImageUrl = (product: ProductData): ProductData => {
    if (product.imageUrl) {
      product.imageUrl = product.imageUrl.replace("needtochange/", "");
    } else {
      product.imageUrl =
        "https://retailer.lantmannenlantbruk.se/media/catalog/product/placeholder/websites/11/Placeholder_Swedish_700x700.jpg";
    }
    return product;
  };

  const cleanDataKlevu = (element: any): ProductData => {
    const newElement: ProductData = {
      name: element.name,
      id: element.id,
      sku: element.sku,
      imageUrl: element.imageUrl,
      category: element.category,
    };

    return cleanImageUrl(newElement);
  };

  return {
    cleanDataKlevu,
    cleanImageUrl,
  };
};
