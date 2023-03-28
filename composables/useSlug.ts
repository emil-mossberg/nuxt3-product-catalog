export const useSlug = () => {
  const generateSlug = (productName: string): string => {
    return productName
      .replace(/\s+/g, "-")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036F]/g, "");
  };

  return {
    generateSlug,
  };
};
