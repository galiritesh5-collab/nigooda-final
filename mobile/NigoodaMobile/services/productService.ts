export const getProducts = async () => {

  const response = await fetch(
    "http://192.168.0.154:5000/admin/products"
  );

  const data = await response.json();

  return data;
};