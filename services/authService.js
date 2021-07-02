import * as storageService from "./storageService";
import httpService from "./httpService";

export const check = async () => {
  const token = storageService.getItem("token");

  if (!token) {
    return { status: false };
  }

  try {
    const response = await httpService.post(
      "/users/auth/check",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      return {
        status: true,
        user: response.data.user,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: false,
    };
  }
};

export const register = async (data) => {
  try {
    const response = await httpService.post("/users/auth/register", data);

    if (response.data.success) {
      return {
        success: true,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error,
    };
  }
};

export const login = async (data) => {
  try {
    const response = await httpService.post("/users/auth", data);

    if (response.data.success) {
      return {
        success: true,
        token: response.data.token,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error,
    };
  }
};

export const logout = () => {
  storageService.removeItem("token");
};
