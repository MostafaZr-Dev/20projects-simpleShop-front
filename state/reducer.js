import * as storageService from "services/storageService";

export const initState = {
  cart: {
    products: [],
    totalQuantity: 0,
    subTotal: 0,
  },
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
    case "UPDATE_CART":
      state = {
        ...state,
        cart: action.payload.cart,
      };

      storageService.setItem("cart", JSON.stringify(action.payload.cart));

      break;

    default:
      throw new Error("Invalid Action Type!");
  }

  return state;
};

export default reducer;
