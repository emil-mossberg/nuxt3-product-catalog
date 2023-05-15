export type CategoryMenuLevel1 = {
  id?: string;
  name?: string;
  slug_name?: string;
  children?: {
    id?: string;
    name?: string;
    slug_name?: string;
    children?: {
      id?: string;
      name?: string;
      slug_name?: string;
    };
  };
};
