import httpService from "./httpService";

export const getAllProduct = async () => {
  const response = await httpService.get("/products");

  return response.data.products;
};

export const getProductByID = async (id) => {
  try {
    const response = await httpService.get(`/products/${id}`);

    return response.data.product;
  } catch (error) {
    
    return null;
  }
};
