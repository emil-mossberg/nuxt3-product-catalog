export type ProductData = {
  name: string;
  description?: string;
  organic?: 1 | 0;
  paragraphs: {};
  table: Record<string, string>;
  ean: [];
  imageUrl: string;
  sku: string;
  id: string;
  category: string;
  shortDescription?: string;
};
