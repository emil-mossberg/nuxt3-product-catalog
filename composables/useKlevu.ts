export const useKlevu = () => {
  const cleanImageLink = (imageUrl: string | undefined): string => {
    if (imageUrl) {
      return imageUrl.replace("needtochange/", "");
    }
    return "https://retailer.lantmannenlantbruk.se/media/catalog/product/placeholder/websites/11/Placeholder_Swedish_700x700.jpg";
  };

  return {
    cleanImageLink,
  };
};
