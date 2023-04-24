import type { BreadCrumb } from "@/types/BreadCrumb";

export type CategoryData = {
  [key: string]: {
    name: string;
    id: string;
    products: number[];
    breadcrumbs: BreadCrumb[];
  };
};
