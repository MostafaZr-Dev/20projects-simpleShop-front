import httpService from "./httpService";
import * as storageService from "./storageService";

export const create = async (data = {}) => {
  try {
    const cartToken = storageService.getItem("cartToken");

    const result = await httpService.post("/orders", {
      ...data,
      cartToken,
    });

    return {
      success: true,
      error: false,
      data: {},
    };
  } catch (error) {
    return {
      success: false,
      error,
      data: null,
    };
  }
};

export const getUserOrders = async (userID) => {
  try {
    const response = await httpService.get(`/orders/${userID}`);

    if (response.data.success) {
      return {
        success: true,
        orders: response.data.orders,
      };
    }
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};
