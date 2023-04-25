export const useKlevu = () => {
  // TO DO fix typing here
  const cleanImageUrl = (product: any) => {
    if (product.imageUrl) {
      product.imageUrl = product.imageUrl.replace("needtochange/", "");
    } else {
      product.imageUrl =
        "https://retailer.lantmannenlantbruk.se/media/catalog/product/placeholder/websites/11/Placeholder_Swedish_700x700.jpg";
    }
    return product;
  };

  const cleanDataKlevu = (element: any) => {
    const newElement = {
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
