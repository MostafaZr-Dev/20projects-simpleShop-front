import { useReducer, useContext, useEffect } from "react";

import AppContext from "./context";
import reducer, { initState } from "./reducer";
import * as storageService from "services/storageService";
import httpService from "services/httpService";

export const AppStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    const cartToken = storageService.getItem("cartToken");

    httpService
      .get("/cart", {
        headers: {
          Authorization: cartToken ? `Bearer ${cartToken}` : "",
        },
      })
      .then((res) => {
        dispatch({
          type: "INIT_CART",
          payload: {
            cart: res.data.cart,
          },
        });
      })
      .catch((err) => {
        if(!err.response.data.status === 401){
          storageService.removeItem("cartToken");
        }
        console.log(err);
      });
  }, []);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  return useContext(AppContext);
};
