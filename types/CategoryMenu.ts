export type CategoryMenu = {
  id?: string;
  name?: string;
  slug_name?: string;
  children?: {
    id: string;
    name: string;
    slug_name: string;
    children: {
      id: string;
      name: string;
      slug_name: string;
      children: {
        id: string;
        name: string;
        slug_name: string;
      };
    };
  };
};
