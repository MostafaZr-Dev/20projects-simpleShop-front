import httpService from "./httpService";

export const getCategories = async () => {
  const response = await httpService.get("/admin/category");

  return response.data.categories;
};
