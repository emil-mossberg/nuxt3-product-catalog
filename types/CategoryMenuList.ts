export type CategoryMenuList2 = {
  id: string;
  name: string;
  slug_name: string;
};

export type CategoryMenuList1 = {
  id: string;
  name: string;
  slug_name: string;
  children: CategoryMenuList2[];
};

export type CategoryMenuList0 = {
  id: string;
  name: string;
  slug_name: string;
  test: boolean;
  children: CategoryMenuList1[];
};
