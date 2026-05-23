import { API_URL } from "../constants/api";

export const getProducts = async () => {

  const response = await fetch(
    `${API_URL}/mobile/products?page=1&limit=5000`
  );

  const data = await response.json();

  return data || [];
};

export const getGroupedProducts = async () => {

  const response = await fetch(
    `${API_URL}/mobile/grouped-products?page=1&limit=5000`
  );

  const data = await response.json();

  return data || [];
};