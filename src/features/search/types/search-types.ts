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
  id: number;
  eventImageUrl: string | null; // Image URL
  shortName: string; // Event title
  location: string | null; // Event location
  startDate: string | null; // Event start date
  endDate: string | null; // Event end date
  eventCategories: string[]; // Event tags
};
