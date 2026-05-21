export const getProducts = async () => {

  const response = await fetch(
    "http://192.168.0.154:5000/mobile/products?page=1&limit=5000"
  );

  const data = await response.json();

  return data || [];
};

export const getGroupedProducts = async () => {

  const response = await fetch(
    "http://192.168.0.154:5000/mobile/grouped-products?page=1&limit=20"
  );

  const data = await response.json();

  return data || [];
};