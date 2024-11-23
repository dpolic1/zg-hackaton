export type TPriceFilterItem = {
  label: string;
  value: string;
};

export type TCategoryFilterItem = {
  label: string;
  value: string;
};

export type TSearchState = {
  query: string;
  filters: {
    date: string;
    price: string;
    category: string;
  };
};

export type TFilterType = "date" | "price" | "category";
