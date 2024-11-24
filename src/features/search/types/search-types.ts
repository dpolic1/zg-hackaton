export type TPriceFilterItem = {
  label: string;
  value: string;
};

export type TCategoryFilterItem = {
  id: number;
  name: string;
};

export type TSearchState = {
  query: string;
  filters: {
    fromDate: string;
    toDate: string;
    price: string;
    category: string[];
  };
};

export type TFilterType = "fromDate" | "toDate" | "price" | "category";

export type TEvent = {
  id: string;
  image: string;
  title: string;
  location: string;
  date: string;
  time: string;
  eventCategories: string[];
};
