export const useSlug = () => {
  const generateSlug = (productName: string): string => {
    const slug = productName
      .replace("/BB", "") // TO DO why does this appear?
      .replace(/\s+/g, "-")
      .replace("%", "-")
      .replace(/\//g, "-")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036F]/g, "");

    return slug;
  };

  return {
    generateSlug,
  };
};
