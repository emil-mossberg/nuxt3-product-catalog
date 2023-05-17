import type { KlevuRecord } from "@klevu/core";
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

  const cleanDataKlevu = (element: KlevuRecord): ProductData => {
    const attributeData = JSON.parse(element.additionalDataToReturn);

    const newElement: ProductData = {
      description: attributeData.description,
      shortDescription: element.shortDesc,
      organic: attributeData.organic,
      paragraphs: attributeData.paragraphs,
      table: attributeData.table,
      ean: attributeData.ean,
      name: element.name,
      id: element.id,
      sku: element.sku,
      imageUrl: element.imageUrl,
      category: element.category,
    };

    return cleanImageUrl(newElement);
  };

  const checkIsHeader = (attributeValue: any) => {
    return typeof attributeValue === "string"
      ? attributeValue.toLowerCase() === "rubrik"
      : false;
  };

  return {
    cleanDataKlevu,
    cleanImageUrl,
    checkIsHeader,
  };
};
