export type Product = {
  id: string;

  Brand: string;

  "Name of Product": string;

  "Main Image URL": string;

  "Primary Category": string;

  "Sub-Category": string;

  "Variant Group ID": string;

  "Variant Name": string;

  Price: number;

  "Weight / Size": string;

  "Short Description": string;

  "Seller Website": string;

  Tags: string;

  Status: string;

  isTrending?: boolean;

  isNewLaunch?: boolean;

  isUnderrated?: boolean;

  isBestForDailyUse?: boolean;
};
export type GroupedProduct = {
  groupId: string;

  displayProduct: Product;

  variants: Product[];
};