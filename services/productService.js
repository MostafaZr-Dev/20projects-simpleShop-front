import httpService from "./httpService";

export const getAllProduct = async (params) => {
  const response = await httpService.get("/products", {
    params,
  });

  return {
    data: response.data.products,
    maxPrice: response.data.maxPrice,
  };
};

export const getProductByID = async (id) => {
  try {
    const response = await httpService.get(`/products/${id}`);

    return response.data.product;
  } catch (error) {
    return null;
  }
};

export const getFilteredProducts = async (query) => {
  return httpService.get(`/products?${query}`);
};
