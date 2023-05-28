// TO DO Fix this rename and make it work
export type CategoryMenuLevel2 = {
  id: string;
  name: string;
  slug_name: string;
};

export type CategoryMenuLevel1 = {
  id: string;
  name: string;
  slug_name: string;
  children: CategoryMenuLevel2;
};

export type CategoryMenuLevel0 = {
  id: string;
  name: string;
  slug_name: string;
  children: CategoryMenuLevel1;
};
