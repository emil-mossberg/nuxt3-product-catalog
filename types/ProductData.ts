export type ProductData = {
  name: string;
  description?: string;
  organic?: 1 | 0;
  paragraphs: {}; // TO DO COULD THIS ALSO BE AN ARRAY FOR LOOPING?
  table: [];
  imageUrl: string;
  sku: string;
  id: string;
  category: string;
};
