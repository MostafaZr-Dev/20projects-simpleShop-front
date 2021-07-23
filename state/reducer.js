import * as storageService from "services/storageService";

export const initState = {
  cart: {
    products: [],
    totalQuantity: 0,
    subTotal: 0,
  },
  user: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "INIT_CART":
      state = {
        ...state,
        cart: action.payload.cart,
      };

      storageService.setItem("cart", JSON.stringify(action.payload.cart));

      break;
    case "EMPTY_CART":
      state = {
        ...state,
        cart: [],
      };

      storageService.setItem("cart", JSON.stringify([]));

      break;
    case "UPDATE_CART":
      state = {
        ...state,
        cart: action.payload.cart,
      };

      storageService.setItem("cart", JSON.stringify(action.payload.cart));

      break;
    case "SET_USER":
      state = {
        ...state,
        user: action.payload.user,
      };
      break;

    default:
      throw new Error("Invalid Action Type!");
  }

  return state;
};

export default reducer;
